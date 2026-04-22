---
sidebar_position: 2
title: Connecting an agent
---

# Connecting an agent

This guide covers two common agent setups:

1. **Custom C# agent** — you own the LLM orchestration and want MCP tools to be part of a larger workflow. Recommended when you need latency, auth, or retry control.
2. **Azure AI Foundry** — you want the Foundry Responses API or Agent service to handle orchestration, with the MCP server plugged in as a tool provider.

Before you start, you need:

- A scoped environment client key (`Query API` + `MCP Server` at minimum). See the [Overview](./overview.md#creating-a-scoped-key).
- The production endpoint `https://mcp.query.enterspeed.com`.

## Part 1 — C# agent (MCP client SDK)

Agents talk to the Enterspeed MCP server over **MCP Streamable HTTP**. In C#, the most direct client is the official [`ModelContextProtocol`](https://www.nuget.org/packages/ModelContextProtocol) NuGet package — it opens an SSE connection, negotiates the protocol, lists tools, and lets you call them. Authentication is a single `x-api-key` header on the transport.

### Prerequisites

```bash
dotnet new console -n EnterspeedMcpAgent
cd EnterspeedMcpAgent
dotnet add package ModelContextProtocol
```

Store secrets with `dotnet user-secrets` (never commit them):

```bash
dotnet user-secrets init
dotnet user-secrets set "ENTERSPEED_MCP_KEY"  "environment-xxxxxxxx-..."
```

### Program.cs

```csharp
using ModelContextProtocol.Client;
using ModelContextProtocol.Protocol.Transport;

var enterspeedKey = Environment.GetEnvironmentVariable("ENTERSPEED_MCP_KEY")
    ?? throw new InvalidOperationException("ENTERSPEED_MCP_KEY not set");

var transport = new SseClientTransport(new SseClientTransportOptions
{
    Endpoint = new Uri("https://mcp.query.enterspeed.com/"),
    // The MCP server reads `x-api-key` on every request and forwards it to
    // the Enterspeed Query API, which validates scope and index restrictions.
    AdditionalHeaders = new Dictionary<string, string>
    {
        ["x-api-key"] = enterspeedKey
    }
});

await using var mcpClient = await McpClientFactory.CreateAsync(transport);

// Discover what this key can do
var tools = await mcpClient.ListToolsAsync();
foreach (var tool in tools)
{
    Console.WriteLine($"- {tool.Name}: {tool.Description}");
}

// Call a tool — here the static get_indices tool
var result = await mcpClient.CallToolAsync(
    "get_indices",
    new Dictionary<string, object?>());

Console.WriteLine(result.Content[0]);
```

Run it:

```bash
dotnet run
```

The output starts with the tools available to your key (static tools, the dynamic `enterspeed_query` tool, and one `query_<indexName>` tool per index you have access to) and then prints the result of the first tool call.

### Driving it from an LLM (tool-use loop)

To turn this into an LLM-driven agent, hand the `tools` list to the model of your choice. The pattern is identical for every major LLM provider:

1. Call `ListToolsAsync()` once per session and cache the result.
2. Send the tool schemas to the LLM alongside the user prompt.
3. When the LLM emits a tool call, invoke `mcpClient.CallToolAsync(name, args)` and feed the response back in the next turn.
4. Repeat until the LLM produces a final answer.

For Claude specifically, see [Connecting a client](./connecting-a-client.md) for a complete Messages-API example that wires this loop.

### Alternative — the Anthropic Remote MCP connector

If you prefer to let Claude open the MCP connection itself via the inline `mcp_servers` feature of the Messages API, you can — but note that Anthropic's spec currently only supports an `Authorization: Bearer <token>` header on the upstream MCP server; it does not let you set a custom header name. The Enterspeed MCP server reads `x-api-key`, so the inline connector does not work with a raw scoped key today.

Workarounds:

- Pass the key as an `?apiKey=` query-string parameter on the MCP URL (supported by the server, but the key ends up in request logs — acceptable for prototyping only).
- Use the explicit [`ModelContextProtocol`](https://www.nuget.org/packages/ModelContextProtocol) client above and drive the tool-use loop yourself.

### Alternative — Semantic Kernel plugin

If you use Microsoft.SemanticKernel, turn every MCP tool into a `KernelFunction`:

```csharp
using Microsoft.SemanticKernel;
using ModelContextProtocol.Client;
using ModelContextProtocol.Protocol.Transport;

var transport = new SseClientTransport(new SseClientTransportOptions
{
    Endpoint = new Uri("https://mcp.query.enterspeed.com/"),
    AdditionalHeaders = new Dictionary<string, string>
    {
        ["x-api-key"] = enterspeedKey
    }
});

await using var mcp = await McpClientFactory.CreateAsync(transport);

var kernel = Kernel.CreateBuilder()
    .AddOpenAIChatCompletion("gpt-4o", azureOpenAiKey)
    .Build();

var tools = await mcp.ListToolsAsync();
kernel.Plugins.AddFromFunctions(
    "enterspeed",
    tools.Select(t => t.AsKernelFunction()));

var answer = await kernel.InvokePromptAsync(
    "List the Enterspeed indices. Then describe the first one.");
Console.WriteLine(answer.GetValue<string>());
```

## Part 2 — Azure AI Foundry (step-by-step)

Azure AI Foundry's Responses API and Agent service can attach an MCP server as a tool provider. The flow is: **your code → Foundry (with `mcp_servers` in the request) → MCP server → Query API**.

:::warning
**Entra ID required for MCP on Foundry.** Foundry's MCP tool support routes through the Agent service orchestration layer, which requires **Microsoft Entra ID** authentication (service principal or user identity). A plain Foundry API key is not accepted for MCP-enabled requests. If you need a "simple API key" façade for end users, place a thin wrapper in front that holds the service principal.
:::

### Step 1 — Create an AI Foundry project

1. In the Azure portal, create an **AI Foundry** resource.
2. Inside it, create a project — e.g. `enterspeed-mcp-demo`.
3. Pick a region that supports the Responses API with MCP tool calling. `swedencentral` is EU-based and supported; `eastus` is the most feature-complete.
4. Deploy a model. `gpt-4o` is a good starting point; Claude models (`claude-sonnet-4`) are also available on `swedencentral`.

### Step 2 — Create a service principal

```bash
az ad sp create-for-rbac \
  --name "enterspeed-mcp-agent" \
  --role "Azure AI User" \
  --scopes "/subscriptions/<sub-id>/resourceGroups/<rg-name>/providers/Microsoft.CognitiveServices/accounts/<foundry-resource>"
```

Save the returned `appId`, `password`, and `tenant`.

If the subscription owner has not granted the service principal the **Azure AI User** role on the AI Services account, no MCP-enabled API call will succeed. This is the most common failure mode.

### Step 3 — Configure secrets

```bash
dotnet user-secrets set "AZURE_TENANT_ID"     "<tenant-id>"
dotnet user-secrets set "AZURE_CLIENT_ID"     "<appId>"
dotnet user-secrets set "AZURE_CLIENT_SECRET" "<password>"
dotnet user-secrets set "FOUNDRY_ENDPOINT"    "https://<foundry>.services.ai.azure.com/api/projects/<project>"
dotnet user-secrets set "FOUNDRY_MODEL"       "gpt-4o"
dotnet user-secrets set "ENTERSPEED_MCP_KEY"  "environment-xxxxxxxx-..."
```

### Step 4 — Call the Responses API with MCP attached

```csharp
using Azure.Identity;
using Azure.Core;
using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;

var config = new ConfigurationBuilder()
    .AddUserSecrets<Program>()
    .Build();

var credential = new ClientSecretCredential(
    config["AZURE_TENANT_ID"],
    config["AZURE_CLIENT_ID"],
    config["AZURE_CLIENT_SECRET"]);

var token = await credential.GetTokenAsync(
    new TokenRequestContext(new[] { "https://ai.azure.com/.default" }));

var http = new HttpClient
{
    BaseAddress = new Uri(config["FOUNDRY_ENDPOINT"]!)
};
http.DefaultRequestHeaders.Authorization =
    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token.Token);

var body = new
{
    model = config["FOUNDRY_MODEL"],
    input = "List the Enterspeed indices I have access to.",
    tools = new object[]
    {
        new
        {
            type         = "mcp",
            server_label = "enterspeed",
            server_url   = "https://mcp.query.enterspeed.com/",
            // Foundry forwards this header to the MCP server on every call
            headers = new Dictionary<string, string>
            {
                ["x-api-key"] = config["ENTERSPEED_MCP_KEY"]!
            },
            require_approval = "never"
        }
    }
};

var response = await http.PostAsJsonAsync(
    "/openai/responses?api-version=2025-03-01-preview", body);
response.EnsureSuccessStatusCode();

Console.WriteLine(await response.Content.ReadAsStringAsync());
```

### Step 5 — Validate end-to-end

Run this known-good smoke sequence:

- **"List my Enterspeed indices"** — expect an index-listing tool call, then a list in the response.
- **"Describe index `<name>`"** — expect a `describe_index` call with fields grouped by type.
- **A domain-specific question** — expect one or more `query_*` tool calls and a synthesised answer.

If the model returns "I don't have access to that tool" after step 1 succeeded, the key most likely lacks the `Query API` scope. The tool was listed (because `MCP Server` is present) but the call is rejected by the Query API.

### Foundry Agent service (alternative)

Foundry also has a persistent **Agent service**. The MCP wiring is identical (an `mcp` tool with `server_url` and `headers`) but the agent persists across calls. Use it when you want a long-running conversation with the same tool set attached. The same Entra ID requirement applies.

## Custom domain / enterprise note

If you are proxying the MCP server behind your own domain:

- The Query API still validates the scoped key — the proxy must forward `x-api-key` verbatim.
- The proxy must support HTTP streaming (chunked / SSE). Several AWS ALB and classic CDN configurations do not by default.
- The MCP transport is Streamable HTTP over HTTP/1.1. Check your hop-by-hop limits before forcing HTTP/2.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Foundry: `403 Identity (object id: ) does not have permissions for Microsoft.MachineLearningServices/workspaces/agents/action actions.` | Using a Foundry API key, or the service principal is missing the `Azure AI User` role | Switch to service principal auth and grant the role on the AI Services resource. |
| Foundry returns instantly with no tool calls | MCP server not reachable from Foundry, or TLS cert mismatch | Curl the MCP health endpoint from a network location similar to Foundry's egress. |
| Tool list arrives but every call returns empty | `x-api-key` lost along the proxy chain | Trace the header end-to-end; the MCP server requires it on every request, not just at session start. |
| Agent times out on a long query | Default HTTP client timeout of 2 minutes exceeded | Paginate the prompt, or raise the timeout on your side. |

## Next steps

- [Connecting a client](./connecting-a-client.md) — VS Code, Claude Code, Claude Desktop, and the Anthropic Messages API in C#.
- [Overview](./overview.md) — sample prompts and the full scope table.
