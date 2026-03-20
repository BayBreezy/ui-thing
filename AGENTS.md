# AGENTS.md

## Purpose

This repo is the source for the UI Thing documentation site and the copy-paste component library behind it. It is a Nuxt-first, shadcn/ui-inspired system built on Vue 3, Nuxt 4, Reka UI, Tailwind CSS v4, and Nuxt Content.

The important distinction is that this repo does not behave like a typical packaged component library. The `app/components/Ui` files are the product. The site, APIs, and MCP layer expose those files as editable source.

## High-Level Stack

- Nuxt `4.4.2`
- Vue `3.5.x`
- TypeScript
- Tailwind CSS `4` via `@tailwindcss/vite`
- `tailwind-variants` for style definitions
- Reka UI primitives for accessibility and interaction
- Nuxt Content `3` for docs/content
- `motion-v` for animation-heavy docs and blocks
- `vee-validate` for form wrappers
- `@nuxtjs/mcp-toolkit` + custom MCP resources/tools

## Source Of Truth Vs Generated Files

Treat these as source-of-truth:

- `app/components/Ui/**`
- `app/components/content/prose/**`
- `app/components/content/Block/**`
- `app/components/content/Docs/**`
- `content/**`
- `scripts/components.js`
- `scripts/prose.js`
- `scripts/create-components.js`
- `scripts/create-prose.js`
- `scripts/create-blocks.js`

Treat these as generated or derived and do not hand-edit unless you are intentionally changing the generator output format:

- `server/utils/comp.ts`
- `server/utils/prose.ts`
- `server/utils/block-examples.ts`
- `.nuxt/**`
- `.data/**`
- build output like `.output/`, `dist/`

If you change UI components, prose components, or blocks, regenerate metadata:

- `npm run generate:components`
- `npm run generate:prose`
- `npm run generate:blocks`
- or `npm run generate:all`

If you change markdown docs that embed example code, expect `automd` to refresh those blocks. The repo already does this in `lint-staged`.

## Repo Map

- `app/components/Ui/`: core reusable UI Thing components
- `app/components/content/Docs/`: small example/demo components used inside docs pages
- `app/components/content/Block/`: larger copy-paste page sections and block patterns
- `app/components/content/prose/`: global MDC/Nuxt Content prose components
- `app/components/content/ShowCase.global.vue`: preview/code switcher used in docs
- `content/`: markdown docs, grouped into getting started, components, goodies, forms, charts, blocks, prose, examples
- `app/pages/` + `app/layouts/`: docs site pages and layouts
- `server/api/`: local JSON/markdown APIs for components, prose, blocks, docs markdown
- `server/mcp/`: MCP tools, prompts, and resources backed by the same generated registries
- `app/examples/`: non-doc example pages
- `app/emails/`: email renderer templates

## Component Authoring Rules

- Use Vue SFCs with `<script setup lang="ts">`.
- It is common to also include a plain `<script lang="ts">` block when exporting reusable types or style definitions.
- Prefer `tv()` from `tailwind-variants` for styling. This repo does not rely on a central `cn()` helper.
- Keep `data-slot` attributes on component roots and notable subparts. They are used consistently across the library.
- For Reka wrappers, forward primitive props with:
  - `useForwardProps`
  - `useForwardPropsEmits`
  - `reactiveOmit`
- Accept `class?: HTMLAttributes["class"]` on wrapper components and merge it through `styles({ class: props.class })`.
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
- The main design tokens live in:
  - `app/assets/css/tailwind.css`
  - `app/assets/css/theme.css`
  - `app/utils/themes.ts`
- Prefer semantic tokens like `bg-background`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`.
- Theme selection is done by adding `theme-*` classes to the document root. Radius is controlled via CSS custom properties.
- `useConfigStore()` persists theme and radius with `useStorage`.
- Dark mode is handled with `@nuxtjs/color-mode`.
- Prettier is configured to understand Tailwind classes inside `tv()` and `tw()`.
- If you add scoped styles that need Tailwind tokens/utilities, use the repo pattern with `@reference "~/assets/css/tailwind.css"` where appropriate.

## Docs And Content Rules

- Docs content lives in `content/**` and is rendered through Nuxt Content.
- Every markdown page should have at least `title` and `description` frontmatter.
- Section metadata and icons are often declared in `.navigation.yml`.
- Component docs use MDC custom components such as:
  - `::ShowCase`
  - `:BlockShowcase`
  - `:prose-pm-x`
  - `:SourceCodeLink`
- Many docs pages embed source code via `automd:file` comments. Do not manually drift embedded code away from the referenced file.
- `app/pages/[...slug].vue` is the main docs renderer.
- `/blocks/*` pages intentionally suppress the right-side TOC behavior in the page layout.

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

- `server/api/**` exposes searchable component, prose, block, and markdown endpoints.
- Search uses `Fuse.js`.
- `server/mcp/**` is a first-class part of the product, not throwaway tooling.
- MCP tools and resources depend on the generated registries in `server/utils/**`, so keep those files regenerated after source changes.
- `server/api/md/[...slug].get.ts` converts content pages back into markdown and appends a GitHub source link. Avoid breaking that assumption when changing content structure.

## Formatting, Linting, And Commits

- Prettier rules:
  - 2 spaces
  - semicolons on
  - double quotes
  - trailing commas `es5`
  - print width `100`
  - import sorting enabled
- ESLint is based on Nuxt's generated config with a number of relaxed Vue/TS rules.
- Husky hooks are active:
  - pre-commit: `npx lint-staged`
  - commit-msg: conventional commits via commitlint
- `lint-staged` runs:
  - `automd`
  - `npm run generate:all`
  - `prettier --write`
  - `eslint --fix` for `js/ts/vue`

## Environment And Runtime Rules

- Node version target is `>=24.13.1`.
- Package manager is `npm@11.12.0`.
- `.npmrc` enables `legacy-peer-deps=true`.
- Runtime env vars visible in the repo:
  - `PUBLIC_URL`
  - `GA_ID`
- Docker builds expect native deps for `better-sqlite3`, then ship the Nuxt server output.

## Practical Editing Guidance

- If you are changing a component API, update the source component first, then regenerate registries.
- If you are changing docs examples, update the demo SFC under `app/components/content/Docs/**` and let `automd` keep markdown code snippets aligned.
- If you are changing blocks, update the block SFC under `app/components/content/Block/**` and regenerate `server/utils/block-examples.ts`.
- If you are changing prose components, update the `.global.vue` source and regenerate `server/utils/prose.ts`.
- Avoid editing `.nuxt/**` or `.data/**` directly.
- Avoid treating this repo as a packaged library with a single export surface. The file contents themselves are part of the deliverable.

## What To Preserve

- The open-code, copy-pasteable nature of components
- Shadcn-style design tokens and naming
- Reka accessibility behavior
- Nuxt Content doc structure
- Generated API/MCP metadata staying in sync with source
