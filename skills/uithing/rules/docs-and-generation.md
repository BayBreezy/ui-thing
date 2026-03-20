# Docs, Demos, and Generated Files

## Source of Truth

Treat these as source-of-truth:

- `app/components/Ui/**`
- `app/components/content/prose/**`
- `app/components/content/Block/**`
- `app/components/content/Docs/**`
- `content/**`
- `scripts/components.js`
- `scripts/prose.js`
- block/prose/component generator scripts

Treat these as generated:

- `server/utils/comp.ts`
- `server/utils/prose.ts`
- `server/utils/block-examples.ts`

## Regeneration Rules

After changing source files:

- components → `npm run generate:components`
- prose → `npm run generate:prose`
- blocks → `npm run generate:blocks`
- broad changes → `npm run generate:all`

Never hand-edit generated registries unless you are intentionally changing generator output.

## Docs and Demos

- Docs content lives in `content/**`.
- Demo SFCs live under `app/components/content/Docs/**`.
- Keep markdown snippets aligned with demo SFCs.
- `automd` is part of the expected docs sync workflow.

## Maintainer Workflow

When changing a component API:

1. update the source component
2. update docs demos if the public usage changed
3. update markdown examples/snippets
4. regenerate registries
5. keep MCP/API surfaces in sync
