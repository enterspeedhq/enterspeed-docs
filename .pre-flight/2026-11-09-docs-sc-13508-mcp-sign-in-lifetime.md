# docs/sc-13508/mcp-sign-in-lifetime — 2026-11-09

## Changed files

enterspeed/mcp-server/overview.mdx

## Observations

Docs only. Claims checked against enterspeed-mcp master: Management requests are checked against tenant membership per request; a signed-in Query session resolves its environment client key at selection and holds it in memory per session; the shared 'Enterspeed MCP (sign-in)' client is per environment, so deleting it is not a per-person cut-off. Prod lifetime 604800 measured 2026-11-09.
