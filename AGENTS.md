<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `bunx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `bunx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

# AGENTS.md

## Purpose

This repo is the source for the UI Thing documentation site and the copy-paste component library behind it. It is a Nuxt-first, shadcn/ui-inspired system built on Vue 3, Nuxt 4, Reka UI, Tailwind CSS v4, and Nuxt Content.

The important distinction is that this repo does not behave like a typical packaged component library. The `app/components/Ui` files are the product. The site, APIs, and MCP layer expose those files as editable source.

## High-Level Stack

- Nuxt `4.5.2`
- Vue `3.5.x`
- TypeScript
- Tailwind CSS `4` via `@tailwindcss/vite`
- `tailwind-variants` for style definitions
- Reka UI primitives for accessibility and interaction
- Nuxt Content `3` for docs/content
- `motion-v` for animation-heavy docs and blocks
- `vee-validate` for form wrappers
- `@nuxtjs/mcp-toolkit` + custom MCP resources/tools
- `@baybreezy/docd` Nuxt layer (`extends` in `nuxt.config.ts`) for the docs shell, prose components, theme CSS, and the `/raw/<path>.md` markdown route

## Source Of Truth Vs Generated Files

Treat these as source-of-truth:

- `app/components/Ui/**`
- `app/components/content/Block/**`
- `app/components/content/Docs/**`
- `content/**`
- `scripts/components.js`
- `scripts/create-components.js`
- `scripts/create-blocks.js`

Treat these as generated or derived and do not hand-edit unless you are intentionally changing the generator output format:

- `server/utils/comp.ts`
- `server/utils/block-examples.ts`
- `.nuxt/**`
- `.data/**`
- build output like `.output/`, `dist/`

If you change UI components or blocks, regenerate metadata:

- `bun run generate:components`
- `bun run generate:blocks`
- or `bun run generate:all`

If you change markdown docs that embed example code, expect `automd` to refresh those blocks. The repo already does this in `lint-staged`.

## Repo Map

- `app/components/Ui/`: core reusable UI Thing components
- `app/components/content/Docs/`: small example/demo components used inside docs pages
- `app/components/content/Block/`: larger copy-paste page sections and block patterns
- `app/components/content/Page/`, `Home/`: docs-site page and homepage pieces
- Prose components (`ProseShowCase`, `ProsePmX`, callouts, etc.) come from the `@baybreezy/docd` layer in `node_modules`, not from this repo. Change them upstream.
- `content/`: markdown docs, grouped into getting started, examples, components, goodies, utilities, forms, apex-charts, blocks
- `app/pages/` + `app/layouts/`: site-specific pages and layouts (the docs `[...slug]` page and layout come from the docd layer)
- `server/api/`: local JSON APIs for components, blocks, and the changelog
- `server/mcp/`: MCP tools, prompts, and resources backed by the same generated registries
- `app/examples/`: non-doc example pages

## Component Authoring Rules

- Use Vue SFCs with `<script setup lang="ts">`.
- It is common to also include a plain `<script lang="ts">` block when exporting reusable types or style definitions.
- Prefer `tv()` from `tailwind-variants` for styling. This repo does not rely on a central `cn()` helper.
- Keep `data-slot` attributes on component roots and notable subparts. They are used consistently across the library.
- For Reka wrappers, forward primitive props with:
  - `useForwardProps`
  - `useForwardPropsEmits`
  - `reactiveOmit`
- Accept `class?: HTMLAttributes["class"]` on wrapper components and keep the public API aligned with Vue class bindings.
- When passing class overrides into `tv()` or slot style builders, normalize them at the boundary with `normalizeClass(props.class) || undefined` instead of narrowing the prop type.
- Export reusable styles and variant types when other components depend on them. Example: `buttonStyles`.
- Use `withDefaults(defineProps<...>(), ...)` when defaults exist.
- Use `defineSlots`, `defineExpose`, and typed emits where they improve the component contract.
- Preserve accessibility behavior from Reka and existing wrappers. Do not strip ARIA, keyboard, focus, or portal behavior for stylistic cleanup.

## Naming And Import Conventions

- UI components use the `Ui` prefix and live under `app/components/Ui`.
- Docs examples use `Docs*` names.
- Blocks use `Block*` names and are grouped by category directories.
- Prose components are global and usually end in `.global.vue`.
- Common aliases in use:
  - `~/` for project-root-relative imports
  - `@/` for app-root-relative imports
  - `#components` for auto-imported components
  - `#app` or `#app/components` for Nuxt types
- Nuxt auto-imports are relied on heavily. Do not add explicit imports for utilities that Nuxt already auto-imports unless necessary.

## Styling And Theme Rules

- Styling is shadcn-like and token-driven.
- The design tokens live in `app/assets/css/tailwind.css` and in the docd layer's `app/assets/css/theme.css` / `shadcn.css`.
- Prefer semantic tokens like `bg-background`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`.
- Theme selection is done by adding `theme-*` classes to the document root. Radius is controlled via CSS custom properties.
- Dark mode is handled with `@nuxtjs/color-mode`.
- `oxfmt` is configured (`.oxfmtrc.json`) to sort Tailwind classes inside `tv()` and `tw()` and `:class` bindings.
- If you add scoped styles that need Tailwind tokens/utilities, use the repo pattern with `@reference "~/assets/css/tailwind.css"` where appropriate.

## Docs And Content Rules

- Docs content lives in `content/**` and is rendered through Nuxt Content.
- Every markdown page should have at least `title` and `description` frontmatter.
- Section metadata and icons are often declared in `.navigation.yml`.
- Component docs use MDC custom components such as:
  - `::prose-show-case` (docd layer)
  - `:BlockShowcase`
  - `:prose-pm-x` (docd layer)
  - `:SourceCodeLink`
- Many docs pages embed source code via `automd:file` comments. Do not manually drift embedded code away from the referenced file.
- The docd layer's `[...slug].vue` page is the main docs renderer. Set `hideToc: true` in frontmatter to suppress the right-side TOC.

## Blocks And Examples Rules

- Blocks are intentionally visual and often animation-heavy.
- They are expected to compose existing `Ui*` components instead of re-implementing primitives.
- `scripts/create-blocks.js` derives required component names by scanning for `Ui*` usage inside block files.
- `app/components/content/Block/BlockShowcase.vue` expects raw block source to be loadable from the file system and is tied to the docs experience.

## Forms Rules

- Form wrappers live in `app/components/Ui/Vee/**`.
- They use `vee-validate` `useField()` instead of ad hoc validation state.
- Reusable form field state lives in `app/composables/useFormField.ts`.
- Keep label, hint, and error message behavior consistent with the existing Vee wrappers.

## Server And MCP Rules

- `server/api/**` exposes searchable component, block, and changelog endpoints.
- Search uses `Fuse.js`.
- `server/mcp/**` is a first-class part of the product, not throwaway tooling.
- MCP tools and resources depend on the generated registries in `server/utils/**`, so keep those files regenerated after source changes.
- Raw markdown for docs pages is served at `/raw/<path>.md` (Nuxt Content's llms feature). The MCP tools in `server/mcp/utils/library.ts` fetch docs from there, so keep that route working when changing content structure.
- Registry data uses kebab-case component values (`vee-input`). In `components.js`, `deps` are npm packages (Nuxt modules are listed in `nuxtModules` as well), and `components` lists other UI Thing components. Block metadata stores lowercased `Ui*` tag names, which `library.ts` maps back to registry components.

## Formatting, Linting, And Commits

- Formatting is done by `oxfmt` (`bun run fmt` / `bun run fmt:check`), configured in `.oxfmtrc.json`: import sorting, Tailwind class sorting, `trailingComma: "es5"`. Do not run `prettier` on this repo; it formats differently and produces noisy diffs.
- ESLint is based on Nuxt's generated config with a number of relaxed Vue/TS rules (`bun run lint`).
- Husky hooks are active:
  - pre-commit: `npx lint-staged`
  - commit-msg: conventional commits via commitlint
- `lint-staged` runs:
  - `oxfmt`
  - `automd`
  - `npm run generate:all` (then stages `server/utils/`)
  - `eslint --fix` for `js/ts/vue`

## Environment And Runtime Rules

- Node version target is `>=24.13.1`.
- Package manager is `bun@1.4.0` (see `packageManager` in `package.json`); the lockfile is `bun.lock`. Use `bun install` / `bun add`. `.npmrc` still sets `legacy-peer-deps=true` for npm-based tooling.
- `package.json` `overrides` pins `mdast-util-to-markdown` to `2.1.2`. Version 2.1.3 makes `remark-mdc`'s `strong` handler recurse forever, which breaks prerendering `/llms-full.txt`. Remove the pin only after `remark-mdc` is fixed and `bun run build` passes.
- There is no CI workflow that builds the site. Run `bun run build` locally after dependency bumps (a full build also prerenders `llms.txt` and `llms-full.txt`, which dev mode does not catch).
- Runtime env vars visible in the repo:
  - `PUBLIC_URL`
  - `GA_ID`
- Deploys build with Nixpacks (`nixpacks.toml` adds python3, gcc, make, and node-gyp for native deps such as `better-sqlite3`), then ship the Nuxt server output.

## Practical Editing Guidance

- If you are changing a component API, update the source component first, then regenerate registries.
- If you are changing docs examples, update the demo SFC under `app/components/content/Docs/**` and let `automd` keep markdown code snippets aligned.
- If you are changing blocks, update the block SFC under `app/components/content/Block/**` and regenerate `server/utils/block-examples.ts`.
- If you are changing prose components, make the change in the `@baybreezy/docd` layer; there are no local prose components or generated prose registry.
- Avoid editing `.nuxt/**` or `.data/**` directly.
- Avoid treating this repo as a packaged library with a single export surface. The file contents themselves are part of the deliverable.

## What To Preserve

- The open-code, copy-pasteable nature of components
- Shadcn-style design tokens and naming
- Reka accessibility behavior
- Nuxt Content doc structure
- Generated API/MCP metadata staying in sync with source
