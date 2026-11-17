# chore/sc-14875/remove-deploy-confirmation — 2026-11-13

## Changed files

- `enterspeed/mcp-server/management-mcp/overview.mdx`
- `enterspeed/mcp-server/management-mcp/tools.mdx`

## Observations

Jesper's review (2026-11-16): the deploy accordion is gone from Guardrails (three limits now) and the fact moved to the capabilities section; the Management App does confirm a deploy in a dialog (BulkDeployModal, comment optional there) while the MCP tool requires a comment, so the comparison is stated that way; `readOnly` is per connection, so the security bullet says it covers every tenant; the 'write permission on the tenant' wording is dropped.
