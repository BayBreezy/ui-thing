# UI Thing MCP and Docs Access

UI Thing ships an MCP server that gives agents exact component and block source, docs, install plans and scaffold plans. Prefer it over guessing prop names. If MCP is not connected, use the HTTP fallbacks below.

## Connect

Hosted endpoint: `https://uithing.com/mcp` (HTTP). Quickest setup: `npx ui-thing@latest mcp init --client claude --yes` (or `cursor`, `vscode`; for `codex`, `windsurf` and `claude-desktop` it prints what to run). Example client config:

```json
{ "mcpServers": { "ui-thing": { "type": "http", "url": "https://uithing.com/mcp" } } }
```

VS Code uses `servers` in `.vscode/mcp.json`, Codex uses `codex mcp add uiThingHosted --url https://uithing.com/mcp`, Claude Desktop uses `npx mcp-remote https://uithing.com/mcp`. Full client instructions: `https://uithing.com/getting-started/mcp`. If MCP is not connected and the task is large, tell the user it improves results and show them that page.

## Tools

**Discovery:** `list-components`, `list-blocks`, `list-block-pages`, `list-documentation-pages`, `search-components`, `search-documentation-pages`, `resolve-library-item` (turn a fuzzy request like "date picker" into an exact name before the detail tools).

**Details:** `get-component` (full source and docs), `get-block` (full block source), `get-documentation-page`.

**Planning:** `get-project-setup`, `plan-app` (whole product), `plan-page` (one page type), `plan-form` (one form), `get-install-plan` (one normalized install plan for mixed components and blocks; `validate-dependencies` is an alias).

**Changelog:** `list-changelog`, `get-changelog-entry` (check before assuming an API from memory).

## Resources

Small indexes and guides, read them before writing UI:

- `resource://uithing/design-patterns`: design guide (composition, tokens, theming, spacing, states, motion, mistakes)
- `resource://uithing/conventions`: naming, imports, forms, overlays, install workflow
- `resource://uithing/quick-start`, `components`, `blocks`, `documentation-pages`, `examples`, `page-templates`

## Prompts

`setup-project`, `build-app`, `build-page`, `create-form`, `implement-component`, `create-documentation`, `fix-component-issue`, `optimize-accessibility`.

## Recommended order

1. Read `design-patterns` and `conventions`.
2. `get-project-setup` (new project) → `plan-app` / `plan-page` / `plan-form`.
3. `resolve-library-item` for fuzzy names.
4. `get-install-plan` once for everything; run every command it returns and apply its notes.
5. `get-component`, `get-block` or `get-documentation-page` for exact code. Do not write props from memory.

## Without MCP

All of this is public over HTTP:

| Need | URL |
| --- | --- |
| Index of all docs for LLMs | `https://uithing.com/llms.txt` (full: `/llms-full.txt`) |
| Any docs page as markdown | `https://uithing.com/raw/<path>.md`, for example `/raw/components/button.md`, `/raw/forms/veeinput.md`, `/raw/getting-started/cli.md` |
| One component (source + metadata) | `https://uithing.com/api/components/<name>` |
| All components / blocks / categories | `https://uithing.com/api/components`, `/api/blocks`, `/api/blocks/categories` |
| One block | `https://uithing.com/api/blocks/<name>`, for example `/api/blocks/BlockHero1` (also matches `Hero%201`) |

The `/api/components` and `/api/blocks` lists are large. Fetch a single item, or filter, instead of loading them whole.

Inside a project, installed component source is also the documentation: read the file in the components folder.

## Not available

There is no `ui-thing docs` or `search` CLI command. Use `ui-thing view <name>` for a component's or block's source, `ui-thing info` for project context, and `ui-thing registry search` for third-party registries ([registries.md](./registries.md)).
