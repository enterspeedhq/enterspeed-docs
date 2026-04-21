---
sidebar_position: 3
title: Connecting Claude
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connecting Claude

This guide covers three ways to point Claude at the Enterspeed Query MCP Server:

1. **Claude Code CLI** — one command, developer workstation.
2. **Claude Desktop** — point-and-click, good for demos.
3. **Anthropic Messages API (C#)** — for production applications.

Prerequisites are the same in every case:

- A scoped environment client key (`Query API` + `MCP Server` at minimum). See the [Overview](./overview.md#creating-a-scoped-key).
- The production endpoint `https://mcp.query.enterspeed.com`.

---

## Pick your client

<Tabs groupId="claude-client">
<TabItem value="claude-code" label="Claude Code CLI" default>

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
If Claude Desktop shows *"no tools discovered"*, the key is almost certainly missing the `MCP Server` scope. Create a new key using the **AI Assistant (Transformed Data)** preset.
:::

</TabItem>
<TabItem value="anthropic-sdk" label="Anthropic SDK (C#)">

This is the production path: a C# service that calls the Anthropic Messages API and declares the MCP server as an `mcp_servers` entry on each request. Anthropic opens the MCP connection on your behalf and forwards the per-request header you supply.

### Project setup

```bash
dotnet new console -n EnterspeedClaudeClient
cd EnterspeedClaudeClient
dotnet add package Anthropic.SDK
dotnet user-secrets init
dotnet user-secrets set "ANTHROPIC_API_KEY"   "sk-ant-..."
dotnet user-secrets set "ENTERSPEED_MCP_KEY"  "environment-xxxxxxxx-..."
```

### Program.cs

```csharp
using Anthropic.SDK;
using Anthropic.SDK.Messaging;
using Microsoft.Extensions.Configuration;

var config = new ConfigurationBuilder()
    .AddUserSecrets<Program>()
    .AddEnvironmentVariables()
    .Build();

var anthropicKey  = config["ANTHROPIC_API_KEY"]!;
var enterspeedKey = config["ENTERSPEED_MCP_KEY"]!;

var client = new AnthropicClient(new APIAuthentication(anthropicKey));

var request = new MessageParameters
{
    Model     = AnthropicModels.Claude4Sonnet,
    MaxTokens = 4096,
    System    = "You are an assistant that answers questions using data from " +
                "Enterspeed. Prefer per-index tools (query_<indexName>) when " +
                "a single index is enough, and fall back to enterspeed_query " +
                "when you need to span indices.",
    Messages = new List<Message>
    {
        new(RoleType.User,
            "Find the three most recent published blog posts and summarise " +
            "them in one sentence each.")
    },
    McpServers =
    [
        new McpServer
        {
            Type               = "url",
            Url                = "https://mcp.query.enterspeed.com/",
            Name               = "enterspeed",
            // Maps to the `x-api-key` header on every MCP request Anthropic
            // makes on your behalf. The scoped key flows to the MCP server,
            // which forwards it as-is to the Query API.
            AuthorizationToken = enterspeedKey,
            TokenHeader        = "x-api-key"
        }
    ]
};

var response = await client.Messages.GetClaudeMessageAsync(request);
Console.WriteLine(response.Message);
```

Run it:

```bash
dotnet run
```

Expected output includes a short summary of three blog posts, and the underlying tool traces show Claude invoking `query_blog` (or the equivalent per-index tool for whatever index the key is scoped to).

### Streaming variant

Swap `GetClaudeMessageAsync` for `StreamClaudeMessageAsync` to receive the response as an `IAsyncEnumerable<MessageResponse>`. The MCP tool calls happen server-side at Anthropic and are visible as `content_block_start` / `content_block_stop` events of type `tool_use` interleaved with regular text deltas.

### Keeping costs under control

Two things to watch when sending MCP servers to the Messages API:

1. **Every request pays for the tool list.** Enable [prompt caching](https://docs.anthropic.com/claude/docs/prompt-caching) on the `mcp_servers` block so the tool list is reused across calls within a 5-minute window:

   ```csharp
   new McpServer
   {
       Type               = "url",
       Url                = "https://mcp.query.enterspeed.com/",
       Name               = "enterspeed",
       AuthorizationToken = enterspeedKey,
       TokenHeader        = "x-api-key",
       CacheControl       = new CacheControl { Type = "ephemeral" }
   }
   ```

2. **Tool-list size grows with the number of indices.** If you only need one or two indices, set an **Index Scope** on the environment client so the MCP server only surfaces those `query_*` tools. Fewer tools mean fewer input tokens.

</TabItem>
</Tabs>

---

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Claude responds *"I don't have any tools"* | `mcp_servers` block missing, or the MCP URL is wrong | Confirm the block made it to the request payload; hit `/health` on the MCP endpoint. |
| Every tool call returns *"forbidden"* | `x-api-key` forwarded correctly but scope missing | Add `Query API` and/or `Source API` to the environment client. |
| Claude Code `mcp add` fails with *"failed to establish connection"* | Local proxy, VPN, or corporate firewall stripping SSE headers | Bypass the proxy (`NO_PROXY=mcp.query.enterspeed.com`) or try a different network. |
| Tools list is empty in Claude Desktop but works in the CLI | Claude Desktop caches tool lists per session | Fully quit and relaunch. On macOS: Cmd-Q, not just close the window. |
| `401` on every request | Wrong key type — Management API token instead of environment-client key | Create an **environment client** key, not a Management API token. |

---

## Next Steps

- [Overview](./overview.md) — sample prompts and scope reference.
- [Connecting an agent](./connecting-an-agent.md) — Azure AI Foundry and custom-agent wiring.
