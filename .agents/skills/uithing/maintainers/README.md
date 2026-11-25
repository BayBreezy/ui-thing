# Maintainers: editing the UI Thing source repo

Use these files **only** when the working directory is the UI Thing repository itself (it has `app/components/Ui`, `scripts/create-components.js`, `scripts/create-blocks.js` and `AGENTS.md`). They do not apply to projects that merely use UI Thing.

`AGENTS.md` in the repo root is the source of truth. It covers component authoring, block authoring, MCP behavior, formatting (`oxfmt`), generators and commit rules. Read it first. These notes are a short summary:

- [docs-and-generation.md](./docs-and-generation.md): source of truth vs generated files, regeneration commands, docs and demo sync
- [reka-and-forwarding.md](./reka-and-forwarding.md): wrapping Reka UI primitives (`useForwardProps`, `reactiveOmit`, dual-script SFCs)

Evals: `evals/evals.json` holds realistic prompts with checkable expectations (forms, landing pages, dialogs, non-interactive setup, registry installs, React conversion, states, charts, theming, the removed `prose` command, and the maintainer workflow). To check the skill, run each prompt in a fresh agent session with and without the skill and grade the output against its `expectations`. Re-run them after changing the skill, the CLI flags or the MCP tools, and add an eval for every new trap you find.

Key reminders:

- Components use `tv()` from `tailwind-variants`, `data-slot` on roots and parts, and `class?: HTMLAttributes["class"]` normalized with `normalizeClass(props.class) || undefined`.
- Never hand-edit generated files (`server/utils/comp.ts`, `server/utils/block-examples.ts`, `app/utils/block-components.ts`). Run `bun run fmt`, then `bun run generate:components` / `generate:blocks` / `generate:all`.
- Blocks compose only existing `Ui*` components, use fictional data, semantic tokens and Tailwind v4 classes, and are verified in light, dark and mobile.
- Format with `oxfmt` (`bun run fmt`), never Prettier, in this repo.
- Prose components live in the `@baybreezy/docd` layer, not here.
