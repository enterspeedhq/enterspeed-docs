# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About this project

This is the Enterspeed public documentation site built with [Mintlify](https://mintlify.com). It covers Enterspeed Core (v1 and v2), Speedtrain, and the V1 API reference. Changes pushed to `master` are automatically deployed to production via the Mintlify GitHub app.

## Development

Install the Mintlify CLI once (globally):

```bash
npm i -g mint
```

Run the local dev server from the repo root (where `docs.json` lives):

```bash
mint dev
```

Preview at `http://localhost:3000`. If the dev server fails, run `mint update` to get the latest CLI.

There are no tests, linting steps, or build scripts.

## Architecture

All site configuration lives in `docs.json` — navigation tabs, theme colours, logo paths, and the OpenAPI reference binding. Edit this file to add pages to the navigation or change structure.

Content is written as MDX files (`.mdx`) with YAML frontmatter (`title`, `description`). Pages must be registered in `docs.json` under the appropriate tab/group to appear in navigation.

Directory layout follows product lines:
- `enterspeed/` — V1 API documentation
- `enterspeed-v2/` — V2 SDK documentation
- `speedtrain/` — Speedtrain product documentation
- `images/` — logos and brand assets (SVG)

The **API Reference** tab is generated automatically from `enterspeedv1Api.yaml` (OpenAPI 3.0) — do not manually create pages for it.

## MCP servers

Two Mintlify MCP servers are available for content editing and reference:
- `https://mcp.mintlify.com` — edit content and configuration
- `https://www.mintlify.com/docs/mcp` — query Mintlify's own documentation

## Writing style

- Active voice, second person ("you")
- One idea per sentence
- Sentence case for headings
- Bold UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and inline code references
