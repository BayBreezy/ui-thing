---
name: uithing
description: Builds and edits Nuxt apps with UI Thing, a copy-paste Vue/Nuxt component library (Reka UI, Tailwind CSS v4, tailwind-variants) with 100+ components, hundreds of blocks (hero, pricing, dashboards, auth, settings, chat and more), form wrappers and themes. Use when working with `ui-thing` CLI commands (`init`, `add`, `block`, `theme`, `registry`), any project with a `ui-thing.config.ts` file or `Ui*` components such as `UiButton`, when planning or building pages, forms and whole apps with UI Thing, when adding components from shadcn-style registries (Vue Bits, NXUI), or when converting React/shadcn code to Vue/Nuxt UI Thing components. Also applies when editing the UI Thing source repo itself (see maintainers/).
user-invocable: false
allowed-tools: Bash(npx ui-thing@latest *), Bash(pnpm dlx ui-thing@latest *), Bash(bunx --bun ui-thing@latest *), Bash(yarn dlx ui-thing@latest *)
---

# UI Thing

A Nuxt-first, shadcn-inspired component system built on Vue 3, Reka UI, Tailwind CSS v4 and `tailwind-variants`. Components, blocks and form wrappers are copied into the user's project as source code, so the files are theirs to edit. Works with Nuxt 3 and Nuxt 4.

> **IMPORTANT:** Run CLI commands with the project's package runner: `npx ui-thing@latest`, `pnpm dlx ui-thing@latest` or `bunx --bun ui-thing@latest`, based on the project's package manager. Examples use `npx`. Only use commands that exist: see [cli.md](./cli.md).

## Project Context

Before changing anything, read what the project already has:

1. `ui-thing.config.ts` (folders for components, composables, utils, plugins, the Tailwind CSS file, the package manager, `registries`). If it is missing, UI Thing is not initialized: run `npx ui-thing@latest init`.
2. `nuxt.config.ts` (modules, `css`) and `package.json` (Nuxt version, installed packages).
3. The components folder from the config (usually `app/components/Ui`). **List it before adding anything.** Do not re-add components that exist and do not use `Ui*` components that were never added.
4. `ui-thing.lock.json`, if present: items installed from third-party registries.

## Principles

1. **Blocks first, components second.** Start pages, auth screens and app shells from a block. Use components for what blocks do not cover (forms, tables, dialogs, data-driven UI).
2. **Use what exists.** Search before writing custom markup. Never rebuild `UiButton`, `UiCard`, `UiDialog`, `UiDropdownMenu` and friends.
3. **Semantic tokens, never raw colors.** `bg-background`, `text-muted-foreground`, `border-border`. Not `bg-white` or `text-gray-500`.
4. **Design every state.** Loading, empty, error, success and destructive confirmation.
5. **One tone per page.** One block per section, consistent alignment and spacing, no template collage.
6. **Replace every placeholder.** Copy, links, images, `COMPANY_NAME`. Never ship lorem ipsum, `#` links or unused sections.
7. **Verify.** Run the dev server, check light and dark mode, check 375px width, fix console errors.

## Critical Rules

Each rule file has Incorrect/Correct examples.

### Styling & Tokens → [rules/styling.md](./rules/styling.md)

- Use semantic tokens. Brand color and radius come from the theme, not per-component classes.
- Tweak components with `class`; it is merged by the component's `tv()` variants, so later classes win.
- Use built-in `variant`, `size`, `color` props before custom classes.
- Never override focus rings, `data-slot` hooks or ARIA attributes.
- Tailwind v4 class names (`bg-linear-to-br`, `size-*`, `shadow-xs`).

### Composition → [rules/composition.md](./rules/composition.md)

- Components ship with their parts: adding `card` installs `UiCardHeader`, `UiCardContent` and the rest. Use the full structure.
- Many components take shortcut props (`UiDialogContent title description`, `UiAlert icon title description`, `UiButton icon loading`). Prefer them over hand-building the parts.
- Use `as-child` to render a trigger as your own element. Never nest a button inside a button.
- Dialogs, sheets and drawers need a title (visible or `sr-only`).
- Use `UiContainer` for page width and gutters.

### Forms → [rules/forms.md](./rules/forms.md)

- Use `UiVee*` wrappers inside `<form @submit>` with `useForm({ validationSchema: toTypedSchema(schema) })`.
- Every field needs `name` and `label`. The wrapper renders its own error message.
- Needs the `@vee-validate/nuxt` module and a schema library (zod or yup).
- Call `plan-form` (MCP) for the field-to-component mapping.

### Icons → [rules/icons.md](./rules/icons.md)

- `<Icon name="lucide:check" class="size-4" />` (Nuxt Icon). `lucide:*` for UI, `logos:*` for brands. One family per view.
- Icon-only buttons need `aria-label`.

### States, Feedback & Accessibility → [rules/states-and-accessibility.md](./rules/states-and-accessibility.md)

- `UiSkeleton` for loading, `UiEmpty` for empty, `UiAlert` for errors, `useSonner()` for toasts, `UiAlertDialog` for destructive confirmations.
- Do not replace interactive components with `div` + `@click`.
- Client-only components (charts, datatable, calendar) need `.client` variants or `<ClientOnly>`.

## Key Patterns

```vue
<!-- Page section: block-style rhythm, tokens only. -->
<UiContainer class="py-16 lg:py-24">
  <p class="text-primary font-semibold">Features</p>
  <h2 class="text-3xl font-semibold text-balance lg:text-4xl">Everything you need</h2>
  <p class="text-muted-foreground max-w-2xl text-lg">One clear sentence.</p>
</UiContainer>

<!-- Dialog: shortcut props, trigger as your own element. -->
<UiDialog v-model:open="open">
  <UiDialogTrigger as-child>
    <UiButton>Edit profile</UiButton>
  </UiDialogTrigger>
  <UiDialogContent title="Edit profile" description="Update your details." />
</UiDialog>

<!-- Button: variants and props, one primary action per view. -->
<UiButton icon="lucide:save" :loading="isSubmitting" type="submit">Save</UiButton>
<UiButton variant="outline">Cancel</UiButton>

<!-- Form field: wrapper owns label, hint and error. -->
<UiVeeInput name="email" label="Email" type="email" hint="We never share it." />

<!-- Feedback. -->
useSonner.success("Saved", { description: "Your changes are live." });
```

## Component Selection

| Need | Use |
| --- | --- |
| Action | `UiButton` (variants: `default` `secondary` `outline` `ghost` `link` `destructive` `gradient` `shine` `underline`) |
| Form inputs | `UiVeeInput`, `UiVeeTextarea`, `UiVeeSelect`, `UiVeeCombobox`, `UiVeeCheckbox`, `UiVeeSwitch`, `UiVeeRadioGroup`, `UiVeeDatepicker`, `UiVeePinInput`, `UiVeeFileInput`, `UiVeeTagsInput`, `UiVeeNumberField`, ... |
| Quick dynamic form | `UiFormBuilder` |
| Custom form layout | `UiField*` family (`UiFieldGroup`, `UiFieldLabel`, `UiFieldError`, ...) |
| Data display | `UiTable`, `UiCard`, `UiBadge`, `UiAvatar`, `UiItem`, `UiDescriptionList`, `UiTimeline` |
| Rich tables | `UiTanStackTable` (headless, typed) or `UiDatatable` (DataTables.net, client only) |
| Charts | `UiApexchart` (client only); simple SVG charts live in the Chart blocks |
| Navigation | `UiSidebar`, `UiNavbar`, `UiNavigationMenu`, `UiBreadcrumbs`, `UiTabs`, `UiPagination` |
| Overlays | `UiDialog` (content), `UiAlertDialog` (confirm), `UiSheet` (side panel), `UiDrawer` (mobile sheet), `UiPopover`, `UiTooltip`, `UiHoverCard` |
| Menus | `UiDropdownMenu`, `UiContextMenu`, `UiMenubar`, `UiCommand` (palette) |
| Feedback | `useSonner` + `<UiSonner />`, `UiAlert`, `UiProgress`, `UiCircularProgress`, `UiSkeleton`, `UiLoader`, `UiEmpty` |
| Layout | `UiContainer`, `UiCard`, `UiSeparator`, `UiSplitter`, `UiScrollArea`, `UiAccordion`, `UiCollapsible`, `UiAspectRatio` |
| Editors & rich input | `UiTiptap`, `UiColorPicker`, `UiCalendar`/`UiDatepicker`, `UiDropfile`, `UiPinInput` |
| Chat / AI | `UiMessageScroller`, `UiMessage`, `UiBubble`, `UiAttachment`, `UiMarker`, `UiQuestionnaire`, `UiTrace`, `UiTerminal`, `UiCodeBlock` |
| Visual flair | `UiBorderBeam`, `UiMeteors`, `UiRetroGrid`, `UiNeonGradientCard`, `UiBgPatternGrid`, `UiFloatingDock` (use sparingly) |

Look up exact names and props with the MCP tools or the docs ([mcp.md](./mcp.md)). Do not guess.

## Workflow

### Build an app or page (most tasks)

Follow [building-apps.md](./building-apps.md): plan → set up → install once → layouts → pages → states → verify.

### Add or change components

1. Read the project context above.
2. Find the component or block: MCP `resolve-library-item` / `search-components`, or `ui-thing list`.
3. Read its docs and source: MCP `get-component` / `get-block`, or `https://uithing.com/raw/components/<name>.md`.
4. Install: `npx ui-thing@latest add <name...>` (blocks: `npx ui-thing@latest block <names> --yes`, which also installs the components and packages a block uses; find names with `block --json --category <name>`).
5. Compose with the rules above. **Read the added files** and check imports, missing parts and placeholders.

### Theme

`npx ui-thing@latest theme <name>` once, early. See [customization.md](./customization.md).

### Third-party registries

`ui-thing add <url|@namespace/item>` works with shadcn-style registries such as Vue Bits and NXUI. **Always review what was added.** See [registries.md](./registries.md).

### Convert React/shadcn code

Read [references/react-conversion.md](./references/react-conversion.md).

### Editing the UI Thing source repo

Only when the working directory is the UI Thing repo (has `app/components/Ui`, `scripts/create-components.js` and `AGENTS.md`). Read `AGENTS.md` and [maintainers/](./maintainers/) first.

## Quick Reference

```bash
npx ui-thing@latest init                       # set up an existing Nuxt project
npx ui-thing@latest init --yes                 # accept defaults
npx ui-thing@latest add button card dialog     # add components
npx ui-thing@latest add --all                  # everything
npx ui-thing@latest block --list --category hero   # browse blocks (--json for machines)
npx ui-thing@latest block BlockHero1 --yes      # add blocks by name
npx ui-thing@latest theme zinc                 # apply a theme
npx ui-thing@latest list --installed           # what is installed
npx ui-thing@latest update button              # overwrite with latest (loses local edits)
npx ui-thing@latest remove button
npx ui-thing@latest registry search glass      # search Vue Bits, NXUI, ...
npx ui-thing@latest add @vue-bits/HoloMosaic   # install from a registry
npx ui-thing@latest shortcuts                  # defineShortcuts composable
npx ui-thing@latest prettier                   # Prettier config
```

There is no `ui-thing prose`, `info` or `docs` command. Prose components for Nuxt Content docs ship with the `@baybreezy/docd` layer. Use the MCP tools or `https://uithing.com/raw/<path>.md` for docs.

## Detailed References

- [building-apps.md](./building-apps.md): end-to-end app workflow, page types, recipes
- [rules/styling.md](./rules/styling.md), [rules/composition.md](./rules/composition.md), [rules/forms.md](./rules/forms.md), [rules/icons.md](./rules/icons.md), [rules/states-and-accessibility.md](./rules/states-and-accessibility.md)
- [cli.md](./cli.md): every command and flag
- [mcp.md](./mcp.md): MCP tools, resources, prompts and the no-MCP fallback
- [customization.md](./customization.md): themes, tokens, dark mode, radius, extending components
- [registries.md](./registries.md): third-party registry installs and the review checklist
- [references/react-conversion.md](./references/react-conversion.md): React/shadcn → UI Thing
- [maintainers/](./maintainers/): only for editing the UI Thing repo
