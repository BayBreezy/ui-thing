# UI Thing CLI Reference

Run commands with the project's package runner (`npx ui-thing@latest`, `pnpm dlx ui-thing@latest`, `bunx --bun ui-thing@latest`). `ui-thing <command> --help` is the source of truth for flags.

> **IMPORTANT:** Document and use only commands that actually exist in the CLI source. Do not invent shadcn-style commands like `info` or `docs`. There is no `ui-thing prose` command: prose components for Nuxt Content docs ship with the `@baybreezy/docd` layer.

## Interactive vs non-interactive

An agent cannot answer terminal prompts, so a command that prompts will hang. See the table in [building-apps.md](./building-apps.md#rule-zero-avoid-interactive-prompts). In short: `init --yes`, `add <names> --yes` and `theme <name> --yes` run unattended; `block`, `prettier` and `shortcuts` prompt; `update` and `remove` ask for confirmation or a selection. `--yes` on `add` and `theme` requires a recent ui-thing version; `init --yes` also detects the package manager and skips the Prettier question in recent versions. `add vee-* --yes` installs yup unless `--validator` says otherwise.

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

Adds one or more components to the project. Each argument is a UI Thing component name, a registry item URL, or a `@namespace/item` reference.

Documented options:

- `-a, --all`: add every UI Thing component and install dependencies without asking
- `--skip-config`: do not require `ui-thing.config`; use auto-detected Nuxt defaults
- `--package-manager <pm>`: package manager to use with `--skip-config`
- `-y, --yes`: skip confirmation prompts (uses yup for vee-validate components)
- `--validator <name>`: schema library to install for vee-validate components (`yup`, `zod`, `joi`, `valibot`)

Behavior for UI Thing components:

- loads UI Thing config
- fetches available components
- prompts if component names are not provided
- writes component files
- may also write related `utils`, `composables`, and `plugins`
- may add Nuxt modules
- may install dependencies and dev dependencies
- may run component-specific config updates such as sonner or datatable helpers

Behavior for registry items (`https://.../r/item.json`, `@vue-bits/HoloMosaic`):

- fetches and validates the shadcn-style registry item and its `registryDependencies`
- lists every file and package, then asks to confirm (unless `--yes`)
- maps `components/ui/*` targets onto the configured components folder and keeps sub-folders
- refuses paths that escape the project
- merges `css`, `cssVars`, and `envVars` without duplicating existing entries
- creates a `cn` helper at `<srcDir>/lib/utils.ts` when an item imports it from `~/lib/utils` and none exists
- records the item in `ui-thing.lock.json`

`@vue-bits` and `@nxui` namespaces are built in. Others come from `registries` in `ui-thing.config.ts`.

### `ui-thing registry`

Subcommands:

- `list [source]`: configured registries, or every item in one (`@namespace` or URL)
- `search <query> [source]`: search registry items by name or description (all configured registries if no source)
- `add-namespace <namespace> <url>`: save a namespace such as `@acme https://acme.dev/r/{name}.json` to `ui-thing.config.ts`

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

Documented options:

- `-y, --yes`: overwrite the Tailwind CSS file without asking

Behavior:

- validates the theme name if passed
- otherwise prompts for a theme
- overwrites the Tailwind CSS file after confirmation (unless `--yes`)

Use this when the user wants a predefined theme applied through UI Thing's theme generation flow.

### `ui-thing list`

Lists available components. `-i, --installed` shows only installed ones, including registry items from `ui-thing.lock.json`.

### `ui-thing update [componentNames...]`

Re-fetches components and overwrites the local copies without asking. Registry items are re-fetched from the source recorded in `ui-thing.lock.json`.

### `ui-thing remove [componentNames...]`

Deletes installed components after confirmation. UI Thing components also lose their shared utils and composables. Registry items remove only the files recorded in `ui-thing.lock.json`.

### `ui-thing shortcuts`

Adds shortcuts composables to the project.

Behavior:

- adds shortcut files
- prompts for package manager
- installs the VueUse Nuxt module

### `ui-thing prettier`

Adds prettier config for UI Thing projects.

Behavior:

- adds `.prettierrc` (merge, overwrite, or cancel if one exists)
- prompts for package manager
- installs the required prettier dev dependencies
- does not reformat files

## Important Constraints

- There is no CLI equivalent of shadcn's `info` or `docs`. `registry search` only searches registry items.
- For exact component lookup, docs lookup, and dependency-aware planning, use the UI Thing MCP tools and docs repo.
- When the user is inside this repo, prefer repo source-of-truth files over assuming CLI behavior alone.
