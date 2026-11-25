# UI Thing CLI Reference

Run commands with the project's package runner (`npx ui-thing@latest`, `pnpm dlx ui-thing@latest`, `bunx --bun ui-thing@latest`). `ui-thing <command> --help` is the source of truth for flags.

> **IMPORTANT:** Document and use only commands that actually exist in the CLI source. Do not invent shadcn-style commands like `docs` or `search` (use `info`, `view` and `registry search`). There is no `ui-thing prose` command: prose components for Nuxt Content docs ship with the `@baybreezy/docd` layer.

## Interactive vs non-interactive

An agent cannot answer terminal prompts, so a command that prompts will hang. See the table in [building-apps.md](./building-apps.md#rule-zero-avoid-interactive-prompts). In short: `init --yes`, `add <names> --yes`, `block <names> --yes`, `theme <name> --yes`, `prettier --yes`, `shortcuts` and `mcp init --client <c> --yes` run unattended. Read-only commands never prompt and support `--json` (JSON on stdout only): `info`, `list`, `view`, `diff`, `block --list`, `registry list/search`, `add --dry-run`, `update --dry-run`. `update` and `remove` need names (with no names they open a picker), and `remove` asks for confirmation. `--yes` on `add` and `theme` requires a recent ui-thing version; `init --yes` also detects the package manager and skips the Prettier question in recent versions. `add vee-* --yes` installs yup unless `--validator` says otherwise.

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

### `ui-thing info`

Read-only project context. `--json` returns `initialized`, `framework` (Nuxt version), `packageManager` (`configured`, `detected`), `typescript`, `tailwind`, `paths`, `config`, `installed.components`, `installed.registryItems`, `nuxtModules`, `registries` and `warnings`. Run it first and fix its warnings (for example TypeScript 7, a missing Tailwind CSS file, `@nuxtjs/color-mode` missing).

### `ui-thing view <names...>`

Prints a component's (`button`), block's (`BlockHero1`) or registry item's (`@vue-bits/HoloMosaic`, URL) files with their target paths, dependencies, Nuxt modules and the components it uses, without installing. `--json` for machines. Unknown names exit with code 1.

### `ui-thing diff [names...]`

Compares installed components and registry items with upstream. Prints a unified diff per changed file (`-` local, `+` upstream). `--json` returns `items[].files[]` with `status` (`modified`, `missing`, `unchanged`) and `patch`, plus a `summary`.

### `ui-thing add [componentNames...]`

Adds one or more components to the project. Each argument is a UI Thing component name, a registry item URL, or a `@namespace/item` reference.

Documented options:

- `-a, --all`: add every UI Thing component and install dependencies without asking
- `--skip-config`: do not require `ui-thing.config`; use auto-detected Nuxt defaults
- `--package-manager <pm>`: package manager to use with `--skip-config`
- `-y, --yes`: skip confirmation prompts (uses yup for vee-validate components)
- `--validator <name>`: schema library to install for vee-validate components (`yup`, `zod`, `joi`, `valibot`)
- `--dry-run`: print the plan (components incl. the full dependency tree, files with an `exists` flag, packages, Nuxt modules, validator) and write nothing; `--json` for machines

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

### `ui-thing block [blockNames...]`

Adds UI Thing blocks (page sections such as hero, pricing, dashboards, auth and settings).

Documented options:

- `-l, --list`: list categories with counts, or the blocks in `--category`, and exit
- `--json`: print the catalog (or one `--category`) as JSON (`id`, `name`, `category`, `description`, `components`) and exit
- `-c, --category <category>`: filter by category (case-insensitive)
- `-d, --dir <path>`: target folder (default `app/components/Blocks`, or `components/Blocks` in Nuxt 3)
- `-y, --yes`: no prompts; requires block names; skips existing files

Behavior:

- block names match by id or display name: `BlockHero1`, `"Hero 1"` and `hero-1` all work; an unknown name fails before anything is written
- writes each block to `<dir>/<Category>/<Block>.vue`
- adds the UI Thing components the blocks use (in-process `add`, honoring `--yes`)
- installs npm packages the blocks import directly (`dayjs`, `@faker-js/faker`, `gsap`, ...)
- prints the Nuxt tag for each block, such as `<BlocksHeroBlockHero1 />`

Unattended workflow: `ui-thing block --json --category hero` to choose, then `ui-thing block BlockHero1 --yes`.

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

Lists available components. `-i, --installed` shows only installed ones, including registry items from `ui-thing.lock.json`. `--json` returns `value`, `name`, `source` and `docs` for each.

### `ui-thing update [componentNames...]`

Re-fetches components and overwrites the local copies without asking. Run `update <names> --dry-run` (or `diff`) first to see what would change; `--dry-run --json` for machines. Registry items are re-fetched from the source recorded in `ui-thing.lock.json`.

### `ui-thing remove [componentNames...]`

Deletes installed components after confirmation. UI Thing components also lose their shared utils and composables. Registry items remove only the files recorded in `ui-thing.lock.json`.

### `ui-thing shortcuts`

Adds shortcuts composables to the project.

Behavior:

- adds `shortcuts.ts` (`defineShortcuts`, `useKbd`) to the composables folder
- installs `@vueuse/nuxt` only if missing and registers the module
- never prompts

### `ui-thing prettier`

Adds prettier config for UI Thing projects.

Behavior:

- adds `.prettierrc` (asks merge, overwrite or cancel if one exists; `--yes` merges)
- uses the package manager from the config or lockfile (or `--package-manager`); never asks
- installs the required prettier dev dependencies
- does not reformat files

### `ui-thing mcp init`

Connects an editor to the UI Thing MCP server. `--client claude|cursor|vscode` merges the server into `.mcp.json`, `.cursor/mcp.json` or `.vscode/mcp.json` (other servers are kept). `--client codex|windsurf|claude-desktop` prints the command or snippet for their global config. `--url` overrides the server (for example `http://localhost:3000/mcp`). `--yes` requires `--client`.

## Important Constraints

- `info` is the counterpart of shadcn's `info`; there is no `docs` command (use `view`, the MCP tools or `https://uithing.com/raw/<path>.md`). `registry search` only searches registry items.
- For exact component lookup, docs lookup, and dependency-aware planning, use the UI Thing MCP tools and docs repo.
- When the user is inside this repo, prefer repo source-of-truth files over assuming CLI behavior alone.
