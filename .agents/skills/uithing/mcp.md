# UI Thing MCP Usage

UI Thing has a first-class MCP surface in `server/mcp/**`. Use it for exact library lookup, dependency planning, docs lookup, and React-to-UI-Thing mapping.

## Core Tools

- `resolve-library-item`
- `list-components`
- `list-blocks`
- `list-prose`
- `get-component`
- `get-block`
- `get-prose`
- `get-documentation-page`
- `get-install-plan`
- `plan-page`
- `plan-form`

## How to Use MCP

### Exact lookup

If the target item name is fuzzy, call `resolve-library-item` first. Then call `get-component`, `get-block`, or `get-prose` only after the name is exact.

### Dependency discovery

Use `get-install-plan` when a task requires one or more components, prose components, or blocks and you need the full dependency picture.

### Docs and context

Use `get-documentation-page` when the user references a docs page, documentation pattern, or prose-driven usage example.

### React/shadcn conversion

When converting React/shadcn code:

1. Identify the source intent.
2. Use `resolve-library-item` if the target UI Thing concept is fuzzy.
3. Use `list-*` or `get-*` tools to inspect existing exact matches.
4. Use `get-install-plan` to confirm supporting dependencies.
5. Only write custom Vue structure when MCP lookup shows that no close match exists.

## What MCP Is For

Use MCP to reduce guessing. It is best for:

- exact component and block lookup
- dependency summaries
- docs lookup
- page/form planning
- mapping React source code to the closest existing UI Thing family

Do not rely on memory alone when MCP can answer the question exactly.
