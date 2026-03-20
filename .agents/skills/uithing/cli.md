# UI Thing CLI Reference

This skill uses the local CLI repo at `/Users/baker/Desktop/ui-thing-cli` as the command source of truth.

> **IMPORTANT:** Document and use only commands that actually exist in the CLI source. Do not invent shadcn-style commands like `info`, `docs`, or `search`.

## Commands

### `ui-thing init`

Initializes UI Thing in a Nuxt project.

Documented flags:

- `-f, --force`
- `-y, --yes`
- `-n, --nuxtVersion <number>`

What it edits:

- `nuxt.config.*`
- the Tailwind CSS file from UI Thing config
- `ui-thing.config`
- a `tw-helper.ts` utility
- VS Code files
- project dependencies, dev dependencies, and Nuxt modules
- optional prettier config if the user agrees

Use this when the project has not been initialized yet or when the user needs the base UI Thing setup added cleanly.

### `ui-thing add [componentNames...]`

Adds one or more UI Thing components to the project.

Documented options:

- `-a, --all`

Behavior:

- loads UI Thing config
- fetches available components
- prompts if component names are not provided
- writes component files
- may also write related `utils`, `composables`, and `plugins`
- may add Nuxt modules
- may install dependencies and dev dependencies
- may run component-specific config updates such as sonner or datatable helpers

Use this for source-copy component installation.

### `ui-thing prose [componentNames...]`

Adds prose components.

Documented options:

- `-a, --all`

Behavior:

- fetches prose components
- resolves prose-to-prose dependencies
- writes prose files
- may also write related `utils`, `composables`, and `plugins`
- may add Nuxt modules
- may install dependencies
- may call `ui-thing add` for required standard UI components

Use this when the user is building docs/content pages with Nuxt Content prose components.

### `ui-thing block`

Adds UI Thing blocks.

Documented options:

- `-c, --category <category>`

Behavior:

- fetches block categories and block definitions
- prompts for block selection
- asks where to place blocks
- writes block files
- may call `ui-thing add` for required UI components

Use this when the user wants marketing sections, page sections, or larger copy-paste blocks.

### `ui-thing theme [themeName]`

Adds or overwrites the project's Tailwind/UI Thing theme file using a known theme option.

Behavior:

- validates the theme name if passed
- otherwise prompts for a theme
- overwrites the Tailwind CSS file after confirmation

Use this when the user wants a predefined theme applied through UI Thing's theme generation flow.

### `ui-thing shortcuts`

Adds shortcuts composables to the project.

Behavior:

- adds shortcut files
- prompts for package manager
- installs the VueUse Nuxt module

### `ui-thing prettier`

Adds prettier config for UI Thing projects.

Behavior:

- adds `.prettierrc`
- prompts for package manager
- installs the required prettier dev dependencies

## Important Constraints

- There is no CLI equivalent of shadcn's `info`, `docs`, or `search`.
- For exact component lookup, docs lookup, and dependency-aware planning, use the UI Thing MCP tools and docs repo.
- When the user is inside this repo, prefer repo source-of-truth files over assuming CLI behavior alone.
