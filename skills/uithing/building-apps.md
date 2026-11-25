# Building Apps and Pages with UI Thing

The workflow for turning "build me a ___" into a polished Nuxt app. It mirrors the MCP `build-app` prompt, so follow it with or without MCP.

## Contents

- Rule zero: avoid interactive prompts
- The workflow
- Page types and block categories
- Recipes
- Quality bar
- What makes UI look generic

---

## Rule zero: avoid interactive prompts

An agent cannot answer terminal prompts. A command that opens one will hang.

| Command | Non-interactive form |
| --- | --- |
| `init` | `npx ui-thing@latest init --yes` (accepts defaults: Zinc theme, standard paths; detects the package manager; skips the Prettier question) |
| `add` | Always pass names: `add button card dialog`. Add `--yes` to skip the install confirmation (recent versions; older ones reject the flag, so omit it and install the packages yourself). With no names it opens a picker. |
| `block` | **Interactive only** (category, selection and folder prompts). Do not run it. Use MCP `get-block` for the source and write the file into `app/components` yourself, or ask the user to run `block`. |
| `theme <name>` | `npx ui-thing@latest theme rose --yes` overwrites the Tailwind CSS file without asking. Always pass the name, or it opens a picker. Run it before customizing tokens ([customization.md](./customization.md)). |
| `prettier`, `shortcuts` | Prompt for the package manager. Ask the user, or skip them. |

Install npm packages yourself with the project's package manager when a plan lists them.

---

## The workflow

### 0. Read the design guide and conventions

With MCP: read `resource://uithing/design-patterns` and `resource://uithing/conventions`. Without MCP, the rules in this skill (`rules/`) cover the same ground.

### 1. Set up the project (skip if it exists)

```bash
npx nuxi@latest init my-app --template minimal --packageManager npm --no-install --gitInit=false
cd my-app && npm install
npx ui-thing@latest init --yes
npx ui-thing@latest add button card input --yes
```

Use MCP `get-project-setup` for the same commands with the user's package manager. `--template` is required in non-interactive terminals (nuxi exits without it). `init --yes` detects the package manager from the lockfile and skips the Prettier question. Then:

- Check `@nuxtjs/color-mode` and `@nuxt/icon` are in `nuxt.config.ts` `modules` (init adds them).
- Render `<UiSonner />` once in `app.vue` if you use toasts (`add sonner`).
- For existing projects, read `ui-thing.config.ts` and list the components folder instead.

### 2. Plan

- Whole product: MCP `plan-app` with the description and optional features (`"pricing, settings, ai chat"`). It returns a route map, layouts (`default`, `auth`, `marketing`), a page type per route, candidate blocks and components, and one combined install plan. Adjust the route map if the product needs something it missed.
- Single page: `plan-page` with a page type. Single form: `plan-form`.
- Without MCP, decide routes, layouts and page types yourself using the lists below and `list-blocks`/the docs.

### 3. Install once

Collect every component and block you will use and run **one** install: MCP `get-install-plan` returns `addNuxtModules`, `installDependencies`, `addComponents`, `nuxtConfigModules` and `notes`. Run each, register `nuxtConfigModules` by hand in `nuxt.config.ts`, and apply the notes (for example defining `COMPANY_NAME`).

Blocks compose existing `Ui*` components and may import packages (`motion-v`, `@nuxt/icon`, chart or editor libraries). Missing ones are the most common cause of "component not found" and build errors.

### 4. Layouts first

Build the shells before pages, from blocks (`get-block` for exact source):

- **App shell** (dashboards, SaaS): Sidebar block + header. Put it in `layouts/default.vue` (under `app/` in Nuxt 4).
- **Marketing**: Header/Navigation block + Footer block in `layouts/marketing.vue`.
- **Auth**: a centered, minimal layout in `layouts/auth.vue`.

Wire them with `<NuxtLayout>` in `app.vue` and `definePageMeta({ layout: "auth" })` in pages. Use `NuxtLink` for internal links, never bare `<a href>`.

### 5. Pages, in route order

For each page:

1. `plan-page` (or the recipe below) to pick a block per section. **One block per section, one tone per page.**
2. `get-block` / `get-component` for the exact source and props. Do not guess props.
3. Forms: `plan-form`, then follow [rules/forms.md](./rules/forms.md).
4. Tables and data: `UiTable` for simple lists, `UiTanStackTable` or `UiDatatable` for sorting, filtering and pagination.
5. Add SEO: `useSeoMeta({ title, description })`.

### 6. Replace placeholders and add states

- Replace every placeholder: copy, links (no `#`), images, `COMPANY_NAME`, avatars, fake numbers that look real but are wrong for the product.
- Add loading, empty and error states ([rules/states-and-accessibility.md](./rules/states-and-accessibility.md)), toasts for feedback, `UiAlertDialog` for destructive actions.
- Remove unused sections and imports.

### 7. Verify

- Run `npx nuxi prepare` (look for warnings such as duplicate component names), then `npx nuxi build` and the dev server. Fix console errors and hydration warnings (client-only components: [rules/states-and-accessibility.md](./rules/states-and-accessibility.md)).
- Check light and dark mode, 375px width, and keyboard navigation of the main flow.
- Run the project's lint/type-check scripts if they exist.

---

## Page types and block categories

MCP `plan-page` page types: `landing`, `dashboard`, `auth`, `docs`, `pricing`, `about`, `contact`, `settings`, `billing`, `legal`, `storefront`, `product-page`, `checkout`, `orders`, `project-management`, `team-management`, `onboarding`, `admin-table`, `ai-chat`, `inbox`, `calendar`, `booking`, `activity`, `file-manager`, `changelog`, `roadmap`, `integrations`, plus `custom` with explicit `sections`.

Block categories (for `list-blocks`, `block --category`) include: Hero, Feature, SocialProof, Stats, Pricing, FAQ, CTA, Comparison, Footer, Header, Navigation, Sidebar, Dashboards, Metric, Chart, TableLists, TableExpandable, EmptyState, Login, SignUp, ForgotPassword, ResetPassword, OTP, Profile, Appearance, Security, Billing, ApiKeys, Notifications, Members, Integrations, AiChat, Composer, ConversationList, ProductList, ProductDetail, Cart, Checkout, Orders, Board, Sprint, Roadmap, Releases, Calendar/MonthViews, FileManager, Feed, Error, Maintenance, Legal and more. Confirm exact names with `list-blocks`; the list changes.

---

## Recipes

Each recipe is a starting point. Confirm exact blocks with `plan-page`.

**Marketing / landing site.** Header → Hero → SocialProof (logos) → Feature (one or two styles) → Stats → Pricing → FAQ → CTA → Footer. Add `/pricing`, `/about`, `/contact`, legal pages as routes.

**SaaS dashboard.** App shell (Sidebar + header with user `UiDropdownMenu`) → overview page with Metric/Stats cards, a Chart block, and a table (`UiTanStackTable`). Add settings pages (Profile, Appearance, Security, Billing, ApiKeys, Members, Notifications) and an EmptyState for each list.

**Auth.** Login, SignUp, ForgotPassword, ResetPassword and OTP blocks in the `auth` layout. Validate with `UiVee*` and a schema ([rules/forms.md](./rules/forms.md)). Do not invent an auth backend unless asked: wire to the project's existing auth or leave a clear `TODO` with a stubbed `$fetch`.

**Settings.** Cards per section (`UiCard`), `UiVee*` fields, one Save `UiButton` per card, toast on success.

**AI chat.** AiChat/Composer/ConversationList blocks, `UiMessageScroller`, `UiMessage`, `UiBubble`, `UiAttachment`, `UiMarker`; `UiCodeBlock`/`UiTerminal`/`UiTrace` for tool and code output.

**Ecommerce.** ShopHero, ProductList, ProductDetail, Cart, Checkout, Orders blocks. Forms in checkout use `UiVee*`.

**Admin tables.** `UiTanStackTable` or `UiDatatable` with `UiVeeInput` filters, `UiDropdownMenu` row actions, `UiAlertDialog` delete confirmation, `UiSheet` edit panel, `UiEmpty` empty state.

---

## Quality bar

- Hierarchy: one `h1` per page, a clear primary action per view (one `default` `UiButton`), secondary actions `outline`/`ghost`.
- Typography rhythm: eyebrow `text-primary font-semibold`, heading `text-3xl font-semibold lg:text-4xl text-balance`, lead `text-muted-foreground text-lg max-w-2xl`.
- Spacing: `UiContainer class="py-16 lg:py-24"` sections, `gap-6` to `gap-8` grids.
- Real content that fits the product. Plausible names, numbers, dates. Pluralize counts.
- Tokens only; both color modes; 375px; keyboard; reduced motion.
- No leftover lorem ipsum, `#` links, `COMPANY_NAME`, unused blocks or imports.

## Troubleshooting

- **Build fails with `No fs option provided to compileScript` or `globalTypeFiles requires fs access`:** the project has TypeScript 7, which Vue's SFC compiler cannot use yet. Install TypeScript 6: `npm i -D typescript@^6` (use the project's package manager). `ui-thing init` pins this for new projects.
- **A `Ui*` component renders as an unknown element / "Failed to resolve component":** it was never added, or `nuxi prepare` has not run since it was. Add it with `ui-thing add <name>`, then check `.nuxt/components.d.ts` for the exact name.
- **Hydration or SSR errors after adding a visual component:** it is client-only. Wrap it in `<ClientOnly>` ([rules/states-and-accessibility.md](./rules/states-and-accessibility.md)).
- **`add` or `init` seems to hang:** it is waiting at a prompt. Re-run with the non-interactive form in the table above.
- **A second lockfile appeared (`package-lock.json` next to `bun.lock`):** an older CLI defaulted to npm. Delete the extra lockfile and set `packageManager` in `ui-thing.config.ts`.

## What makes UI look generic

1. Skipping blocks and hand-building hero/pricing/footer sections.
2. Hardcoded colors instead of tokens.
3. Mixing six unrelated section styles on one page.
4. Several primary buttons, or mixed icon families.
5. Missing empty, loading and error states.
6. Importing a block without installing its packages or Nuxt modules.
7. Rendering charts or canvas components on the server.
8. Editing component internals for a tweak that a `class` or `variant` would handle.
