---
sidebar_position: 1
title: Overview
---

# Query MCP Server

The Enterspeed Query MCP Server turns the Enterspeed Query API into a set of [Model Context Protocol](https://modelcontextprotocol.io/) tools that AI clients (Claude, Cursor, custom agents, Azure AI Foundry, etc.) can discover and call. You do not need to host anything yourself — Enterspeed runs the server for you.

This page tells you **where the server lives**, **how authentication works**, and **what scopes to request**. For step-by-step wiring guides, see [Connecting an agent](./connecting-an-agent.md) and [Connecting a client](./connecting-a-client.md).

## Hostname

| Environment | URL | Transport |
| --- | --- | --- |
| **Production** | `https://mcp.query.enterspeed.com` | MCP Streamable HTTP (SSE) |

A health check is available without authentication:

```bash
curl -i https://mcp.query.enterspeed.com/health
# HTTP/2 200
# ok
```

## How authentication works

The MCP server is a thin proxy. All authorisation decisions happen in the Enterspeed Query API. Your MCP client sends a scoped environment client key on every request; the MCP server forwards it as-is; the Query API validates the scope and any index restrictions before returning data.

```
AI client ──x-api-key──► mcp.query.enterspeed.com ──x-api-key──► query.enterspeed.com
                                                                         │
                                                           validates scopes + IndexScope
```

Clients authenticate with a single HTTP header on every MCP request:

```
x-api-key: environment-<uuid>-<random>
```

The key is a **scoped environment client key** issued from the Enterspeed Management App. It is *not* a Management API token and *not* a workspace-wide key.

:::info
The server also accepts an `?apiKey=` query-string fallback for tools that cannot set headers. Prefer the header whenever possible.
:::

## Required scopes

The platform supports component-scoped environment keys. For MCP use, your key **must** include:

| Scope | Why | Grants |
| --- | --- | --- |
| `MCP Server (AI Agent Access)` | Gates the MCP tool endpoints. Without it, the server sees zero dynamic or per-index tools. | Ability to list MCP tools. |
| `Query API` | Needed to query transformed Enterspeed views. | Access to `/v1/query` endpoints (used by the `query_*` tools). |
| `Source API` | Needed to query raw source data instead of transformed views. | Access to `/v1/source*` endpoints (used by the source tools). |

`MCP Server` alone is not useful — it must be combined with `Query API`, `Source API`, or both.

### Scope presets

When creating an environment client, the Management App exposes these presets so you do not have to toggle scopes manually:

| Preset | Scopes bundled | Typical use case |
| --- | --- | --- |
| **Standard** | Delivery + Query + Routes | Traditional delivery clients, no AI. |
| **AI Assistant (Transformed Data)** | Query + MCP Server | You want an AI client to query Enterspeed **views** only. |
| **AI Assistant (Source Data)** | Source + MCP Server | You want an AI client to query **raw source entities** (bypassing views). |
| **AI Assistant (Transformed + Source)** | Query + Source + MCP Server | You want an AI client to access both views and sources. |

For most MCP integrations, **"AI Assistant (Transformed Data)"** is the right default.

See [Using environment clients](../getting-started/environment-clients.md#scope-presets) for the full table and how to manage scopes in the Management App.

## Index scopes

On top of component scopes, each environment client can carry an optional **Index Scope** that restricts *which indices* the key can see. Patterns are matched against the fully-qualified index name.

| Pattern | Matches |
| --- | --- |
| `blog*` | every index whose name starts with `blog` |
| `cms:*` | every index under the `cms` source group |
| `*:entity` | every index ending in `entity` |
| *(unset)* | no restriction — all indices the scope allows |

Filtering is enforced by the Query API, so AI clients get a pre-trimmed tool list. This is ideal when you want to give a public-facing AI assistant access to, say, only a marketing-blog index, without exposing the rest of the environment.

## Creating a scoped key

1. Sign in to the **Enterspeed Management App**.
2. Select the tenant and environment you want the AI client to query.
3. Go to **Environment → API Keys**.
4. Click **Create API key**.
5. Pick a preset — e.g. **AI Assistant (Transformed Data)**.
6. *(Optional)* Set an **Index Scope** pattern like `blog*` to restrict access.
7. Give the key a descriptive name, e.g. `claude-prod-blog-assistant`.
8. Click **Create** — the key is shown **once**. Store it in your secret manager immediately.

The new key has the form `environment-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

See [Using environment clients](../getting-started/environment-clients.md) for the full environment-client flow, including regenerating a key.

## Sample prompts

Use these when demoing or smoke-testing a fresh MCP connection.

### Connectivity check

> List the Enterspeed indices you have access to, then tell me how many of them there are and what their naming convention looks like.

Expected behaviour: the agent calls the index-listing tool and returns a list filtered by the key's Index Scope.

### Schema discovery

> Describe the `blog` index. What fields does it have, which ones are searchable, and which are sortable?

Expected behaviour: the agent calls `describe_index` with `indexAlias: blog`. A good answer groups fields by type (keyword, text, date, integer, etc.).

### Single-index query

> Find the five most recent blog posts authored by `alice` and return their titles, publish dates, and URLs.

Expected behaviour: the agent calls `query_blog` with a filter on `author = alice`, sort descending by `publishedAt`, and `pagination.pageSize = 5`.

### Multi-index query

> Across the `products` and `productsv2` indices, find items with `category = beverages` and under 100 kcal per 100g. Return the top three sorted by energy ascending.

Expected behaviour: the agent calls the unified `enterspeed_query` tool with a `queries` array that targets both indices in a single round-trip.

### Source-data exploration

*(Requires `Source API` + `MCP Server` scopes.)*

> Show me five raw source entities of type `article` from the `cms` source group. Which fields are set on the first one?

Expected behaviour: the agent discovers types via `get_indices_raw_source_entities_by_source_group_alias`, then pulls five entities via `get_source_items`.

### Authorisation check

> Which operators can I use to filter queries in Enterspeed?

Expected behaviour: the agent calls the `get_operators` tool. The list typically includes `contains`, `equals`, `notEquals`, `in`, `lessThan`, `lessThanOrEquals`, `greaterThan`, and `greaterThanOrEquals` — the concrete set is data-driven, so trust the tool response over this page.

### Tool-listing sanity check

> What tools do you have available and which Enterspeed indices are they tied to?

Expected behaviour: the agent enumerates the full tool set. If the dynamic and per-index groups are empty, the key is most likely missing the `MCP Server` scope — that is the fastest way to spot a misconfigured key.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `401 Unauthorized` from the MCP server | `x-api-key` missing or malformed | Confirm the header is present on every MCP request. |
| Agent lists only a small static set of tools | Key is missing the `MCP Server` scope | Recreate the key with the *AI Assistant* preset. |
| Agent sees fewer indices than expected | `IndexScope` pattern is too narrow | Widen the Index Scope on the environment client, or remove it for all-index access. |
| Tools listed but `query_*` returns "forbidden" | Key has `MCP Server` but not `Query API` / `Source API` | Add the missing data scope. |
| `401` on every request | Wrong key type — Management API token instead of environment-client key | Create an **environment client** key, not a Management API token. |

## Next steps

- [Connecting an agent](./connecting-an-agent.md) — wire a custom C# agent or Azure AI Foundry to the MCP server.
- [Connecting a client](./connecting-a-client.md) — VS Code, Claude Code, Claude Desktop, or the Anthropic Messages API in C#.
