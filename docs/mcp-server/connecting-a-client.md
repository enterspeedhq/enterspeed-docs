---
sidebar_position: 3
title: Connecting a client
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connecting a client

The Enterspeed Query MCP Server speaks plain MCP Streamable HTTP, so any MCP-capable client can use it. This page covers the four most common integrations; the pattern (MCP URL + `x-api-key` header) is identical for every other MCP client — see [Other MCP clients](#other-mcp-clients) at the bottom.

Prerequisites are the same in every case:

- A scoped environment client key (`Query API` + `MCP Server` at minimum). See the [Overview](./overview.md#creating-a-scoped-key).
- The production endpoint `https://mcp.query.enterspeed.com`.

## Pick your client

<Tabs>
<TabItem value="vscode" label="VS Code (GitHub Copilot)" default>

VS Code's GitHub Copilot reads MCP servers from an `mcp.json` file. For a single workspace, put the config at `.vscode/mcp.json`; for every workspace, use the **MCP: Open User Configuration** command from the command palette.

```json
{
  "servers": {
    "enterspeed": {
      "type": "sse",
      "url": "https://mcp.query.enterspeed.com/",
      "headers": {
        "x-api-key": "environment-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      }
    }
  }
}
```

Reload the window (**Developer: Reload Window** from the command palette) and open the Copilot chat pane. The Enterspeed tools appear in the tool picker once Copilot connects.

:::tip
Never commit `.vscode/mcp.json` with a real key. Use `${input:enterspeed-key}` with a matching [`inputs` entry](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration) so VS Code prompts for the key on first use, or put the config in your user profile instead of the workspace.
:::

</TabItem>
<TabItem value="claude-code" label="Claude Code CLI">

```bash
claude mcp add enterspeed \
  --transport sse \
  https://mcp.query.enterspeed.com/ \
  -H "x-api-key: environment-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

Then start a session and ask Claude to list your indices:

```bash
claude
> List the Enterspeed indices I have access to.
```

The CLI stores the server configuration under `~/.claude/mcp.json`. Edit that file if you need to tweak the header or URL afterwards.

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

Open your Claude Desktop config file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add the `mcpServers` entry:

```json
{
  "mcpServers": {
    "enterspeed": {
      "type": "sse",
      "url": "https://mcp.query.enterspeed.com/",
      "headers": {
        "x-api-key": "environment-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      }
    }
  }
}
```

Fully quit and relaunch Claude Desktop. The Enterspeed tools now appear in the tool picker.

:::tip
If Claude Desktop shows *"no tools discovered"*, the key is almost certainly missing the `MCP Server` scope. Create a new key using the **AI Assistant** preset.
:::

</TabItem>
<TabItem value="anthropic-sdk" label="Anthropic Messages API (C#)">

This is the production path: a C# service opens an MCP session to the Enterspeed server, discovers the available tools, and runs a tool-use loop with Claude. The `x-api-key` header is set once on the MCP transport.

:::info
**Why not the inline `mcp_servers` feature?** Anthropic's inline remote-MCP connector forwards an `Authorization: Bearer <token>` header to the upstream MCP server and does not let you override the header name. The Enterspeed MCP server reads `x-api-key`. Driving the tool-use loop yourself (as below) works today and gives you full control over retries, logging, and cost.
:::

### Project setup

The loop uses two NuGet packages: [`Anthropic.SDK`](https://www.nuget.org/packages/Anthropic.SDK) for the Messages API and [`ModelContextProtocol`](https://www.nuget.org/packages/ModelContextProtocol) for the MCP session.

```bash
dotnet new console -n EnterspeedClaudeClient
cd EnterspeedClaudeClient
dotnet add package Anthropic.SDK
dotnet add package ModelContextProtocol
dotnet user-secrets init
dotnet user-secrets set "ANTHROPIC_API_KEY"   "sk-ant-..."
dotnet user-secrets set "ENTERSPEED_MCP_KEY"  "environment-xxxxxxxx-..."
```

### Program.cs

```csharp
using Anthropic.SDK;
using Anthropic.SDK.Messaging;
using Microsoft.Extensions.Configuration;
using ModelContextProtocol.Client;
using ModelContextProtocol.Protocol.Transport;
using System.Text.Json;

var config = new ConfigurationBuilder()
    .AddUserSecrets<Program>()
    .AddEnvironmentVariables()
    .Build();

var anthropicKey  = config["ANTHROPIC_API_KEY"]!;
var enterspeedKey = config["ENTERSPEED_MCP_KEY"]!;

// 1. Open an MCP session against the Enterspeed server
var transport = new SseClientTransport(new SseClientTransportOptions
{
    Endpoint = new Uri("https://mcp.query.enterspeed.com/"),
    AdditionalHeaders = new Dictionary<string, string>
    {
        ["x-api-key"] = enterspeedKey
    }
});

await using var mcp = await McpClientFactory.CreateAsync(transport);

// 2. Discover the tools this key is allowed to use
var mcpTools = await mcp.ListToolsAsync();

// 3. Hand the tool schemas to Claude as Messages API tools
var claude = new AnthropicClient(new APIAuthentication(anthropicKey));

var tools = mcpTools
    .Select(t => new Tool
    {
        Name        = t.Name,
        Description = t.Description ?? string.Empty,
        InputSchema = t.InputSchema
    })
    .ToList();

var messages = new List<Message>
{
    new(RoleType.User,
        "Find the three most recent published blog posts and summarise " +
        "them in one sentence each.")
};

// 4. Tool-use loop — repeat until Claude produces a final answer
while (true)
{
    var response = await claude.Messages.GetClaudeMessageAsync(new MessageParameters
    {
        Model     = AnthropicModels.Claude4Sonnet,
        MaxTokens = 4096,
        Messages  = messages,
        Tools     = tools
    });

    // Record Claude's turn
    messages.Add(new Message(response));

    if (response.StopReason != "tool_use")
    {
        Console.WriteLine(response.Message);
        break;
    }

    // Execute every tool_use block via the MCP client and feed results back
    foreach (var block in response.Content.OfType<ToolUseContent>())
    {
        var args = block.Input.Deserialize<Dictionary<string, object?>>()
                   ?? new();
        var mcpResult = await mcp.CallToolAsync(block.Name, args);

        messages.Add(new Message
        {
            Role    = RoleType.User,
            Content = new List<ContentBase>
            {
                new ToolResultContent
                {
                    ToolUseId = block.Id,
                    Content   = mcpResult.Content.FirstOrDefault()?.Text ?? string.Empty
                }
            }
        });
    }
}
```

Run it:

```bash
dotnet run
```

Expected output includes a short summary of three blog posts, and the loop's intermediate turns show Claude calling `query_blog` (or the equivalent per-index tool for whatever index the key is scoped to).

:::info
**SDK property names.** The exact property names on `ToolUseContent`, `ToolResultContent`, and the `Message` / `Tool` shapes evolve with the Anthropic.SDK package. If a symbol above does not resolve, check the current release notes for the corresponding type name — the orchestration pattern (list tools once, loop until `StopReason != "tool_use"`) stays the same.
:::

### Keeping costs under control

- **Cache the tool list.** Call `ListToolsAsync()` once per session, not per request. The MCP server also caches per API key for 5 minutes, so repeat calls are cheap even if you do list more often.
- **Narrow the tool set with an Index Scope.** Fewer indices means fewer `query_*` tools surfaced to Claude, which means fewer input tokens.
- **Use prompt caching on the tool list.** When you pass `tools` to the Messages API, mark the list with `cache_control: { type: "ephemeral" }` via `CacheControl`-style helpers in Anthropic.SDK — see the package README for the current property name.

</TabItem>
</Tabs>

## Other MCP clients

The four clients above are the ones we test against regularly, but the MCP server is client-agnostic. Any MCP-capable client follows the same pattern — point it at `https://mcp.query.enterspeed.com/` with SSE transport and set an `x-api-key` header. Some known-good examples:

- **Cursor** — `.cursor/mcp.json` with the same `servers` schema as VS Code.
- **Windsurf** — settings → Cascade → MCP Servers, using the SSE + header form.
- **Continue** — `~/.continue/config.json` under `experimental.modelContextProtocolServers`.
- **Zed** — settings under `"context_servers"` with `type: "sse"`.

If your client does not support custom headers, pass the key as an `?apiKey=` query-string parameter on the MCP URL instead. Avoid that in production — the key ends up in request logs.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Client responds *"I don't have any tools"* | MCP server entry missing, or the URL is wrong | Confirm the config was reloaded by the client; hit `/health` on the MCP endpoint. |
| Every tool call returns *"forbidden"* | `x-api-key` forwarded correctly but scope missing | Add `Query API` to the environment client. |
| `mcp add` / config reload fails with *"failed to establish connection"* | Local proxy, VPN, or corporate firewall stripping SSE headers | Bypass the proxy (`NO_PROXY=mcp.query.enterspeed.com`) or try a different network. |
| Tools list is empty after reload | Client caches tool lists per session | Fully quit and relaunch the client (on macOS, Cmd-Q in Claude Desktop; **Developer: Reload Window** in VS Code). |
| `401` on every request | Wrong key type — Management API token instead of environment-client key | Create an **environment client** key, not a Management API token. |

## Next steps

- [Overview](./overview.md) — sample prompts and scope reference.
- [Connecting an agent](./connecting-an-agent.md) — Azure AI Foundry and custom-agent wiring.
