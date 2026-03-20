> [!NOTE]
> This installable copy is generated from `/.agents/skills/uithing`. Run `npm run sync:skills` after updating the source skill.

---

name: uithing
description: Manages UI Thing components, prose, blocks, themes, shortcuts, docs, and MCP-driven workflows in Nuxt projects and in the UI Thing source repo. Use when working with `ui-thing` CLI commands like `ui-thing init`, `ui-thing add`, `ui-thing prose`, `ui-thing block`, or `ui-thing theme`; when editing `app/components/Ui`, docs, generators, or generated registries; or when converting pasted React/shadcn code into native Vue/Nuxt UI Thing components.

---

# UI Thing

UI Thing is a Nuxt-first, shadcn-inspired, copy-paste component system built on Vue 3, Nuxt 4, Reka UI, Tailwind CSS v4, `tailwind-variants`, and Nuxt Content.

Unlike packaged component libraries, the source files are part of the product. In this repo, editing components, demos, docs, registries, APIs, and MCP metadata is normal and expected.

## Current Project Context

Before making changes:

- In consumer projects, inspect `ui-thing.config.*`, `package.json`, and `nuxt.config.*`.
- In this repo, inspect `AGENTS.md`, `scripts/components.js`, `server/utils/comp.ts`, `server/utils/prose.ts`, and `server/utils/block-examples.ts`.
- Use the local CLI repo at `/Users/baker/Desktop/ui-thing-cli` as the command source of truth.
- Use the UI Thing MCP surface for exact component, block, prose, and docs lookup.

## Principles

1. Use existing UI Thing components first.
2. Compose existing `Ui*` families before writing custom markup.
3. Preserve Reka accessibility, focus handling, keyboard behavior, and portal behavior.
4. Preserve Nuxt conventions: auto-imports, SFC patterns, and docs/content structure.
5. Treat generated registries as derived outputs, never as authoring targets.
6. For React conversion, preserve intent and semantics, not JSX syntax.

## Critical Rules

### Styling & Tokens → [rules/styling.md](./rules/styling.md)

- Prefer `tv()` from `tailwind-variants`.
- Do not center `cn()`-style conventions; UI Thing does not rely on that helper.
- Keep `data-slot` markers on roots and important parts.
- Normalize Vue class overrides at the styling boundary with `normalizeClass(...) || undefined`.
- Use semantic tokens and existing theme files instead of ad hoc colors.

### Composition & Existing UI → [rules/composition.md](./rules/composition.md)

- Use existing `Ui*` component families first.
- Prefer composition over custom markup.
- Use the full family structure when a pattern expects it.
- Preserve floating-surface, overlay, and portal behavior.

### Forms → [rules/forms.md](./rules/forms.md)

- Prefer `app/components/Ui/Vee/**` for form wrappers.
- Use existing form state/composable patterns.
- Keep label, hint, and error semantics aligned with the repo.

### Docs, Demos, and Generated Files → [rules/docs-and-generation.md](./rules/docs-and-generation.md)

- Source-of-truth files live in `app/components/Ui/**`, `app/components/content/**`, and `content/**`.
- Regenerate registries after component, prose, or block changes.
- Keep markdown snippets aligned with demo SFCs and `automd`.

### Reka Wrappers & Forwarding → [rules/reka-and-forwarding.md](./rules/reka-and-forwarding.md)

- Use `useForwardProps`, `useForwardPropsEmits`, and `reactiveOmit` consistently.
- Preserve accessibility and primitive behavior.
- Use the repo’s dual-script SFC pattern where it improves reuse.

## Workflow

### Consumer Workflow

1. Inspect project config and Nuxt version.
2. If UI Thing is not initialized, use the real CLI `init` workflow.
3. Add components, prose, blocks, themes, shortcuts, or prettier config with the real CLI commands only.
4. Use UI Thing docs and MCP tools to inspect exact implementation details before customizing.
5. Prefer existing `Ui*` families over custom code.

### Maintainer Workflow

1. Edit source-of-truth component, prose, block, or docs files.
2. Keep examples and markdown code snippets aligned.
3. Regenerate the affected registries.
4. Preserve API/MCP expectations and docs structure.
5. Never hand-edit generated registry outputs except when intentionally changing generators.

### React/shadcn Conversion Workflow

1. Read the pasted React/shadcn source carefully.
2. Identify whether it is a primitive, composed UI pattern, or page/block section.
3. Use MCP tools first to find the closest existing UI Thing component, block, prose component, or documentation pattern.
4. Convert the composition into native Vue/Nuxt idioms.
5. Only write custom Vue wrappers when the library truly lacks the pattern.

When handling React conversion, always read [references/react-conversion.md](./references/react-conversion.md).

## Quick Reference

Use only real UI Thing CLI commands:

```bash
ui-thing init
ui-thing add button dialog
ui-thing prose steps callout
ui-thing block --category hero
ui-thing theme zinc
ui-thing shortcuts
ui-thing prettier
```

UI Thing does not currently expose shadcn-style `info`, `docs`, or `search` CLI commands. For discovery and exact lookup, use the docs repo and MCP tools instead.

## Detailed References

- [cli.md](./cli.md)
- [mcp.md](./mcp.md)
- [rules/styling.md](./rules/styling.md)
- [rules/composition.md](./rules/composition.md)
- [rules/forms.md](./rules/forms.md)
- [rules/docs-and-generation.md](./rules/docs-and-generation.md)
- [rules/reka-and-forwarding.md](./rules/reka-and-forwarding.md)
- [references/react-conversion.md](./references/react-conversion.md)
