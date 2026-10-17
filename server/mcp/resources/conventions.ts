export default defineMcpResource({
  name: "conventions",
  title: "UI Thing Usage Conventions",
  uri: "resource://uithing/conventions",
  description:
    "How UI Thing components are named, imported, composed, styled and wired to forms in a consuming Nuxt app.",
  cache: "24h",
  async handler(uri: URL) {
    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "text/markdown",
          text: `# UI Thing Usage Conventions

## Naming and imports

- Components live in \`app/components/Ui\` and are used with the \`Ui\` prefix: \`<UiButton>\`, \`<UiCard>\`, \`<UiCardContent>\`. Compound parts ship with their parent (\`UiCardHeader\`, \`UiDropdownMenuItem\`); adding \`card\` installs all of them.
- Registry values are kebab-case (\`vee-input\`, \`dropdown-menu\`). Use them with \`get-component\` and \`ui-thing add\`.
- Nuxt auto-imports components, composables and utils. Do not add manual imports for \`Ui*\` components, \`useForm\`, \`useSonner\` or \`Icon\`.
- Blocks are named \`Block<Category><N>\` (\`BlockHero1\`). Copy the file into \`app/components\` (or inline it into a page) and edit it.

## Using components

- Reka UI primitives power behavior and accessibility. Props and events follow Reka (\`v-model\`, \`@update:open\`...). Read the docs page from \`get-component\` for the exact API.
- Pass layout or color tweaks with \`class\`; it is merged by the component's \`tv()\` variants, so later classes win.
- Compose using the parts: \`<UiDialog><UiDialogTrigger as-child>…</UiDialogTrigger><UiDialogContent>…</UiDialogContent></UiDialog>\`. Use \`as-child\` to render a trigger as your own element instead of nesting buttons.
- Elements carry \`data-slot\` attributes. Target them for styling instead of deep descendant selectors.

## Forms

- \`UiVee*\` components register themselves with the nearest \`useForm()\` by \`name\` (needs the \`@vee-validate/nuxt\` module).
- Define a schema (yup in the shipped blocks), call \`useForm({ validationSchema })\`, bind \`handleSubmit\` to \`<form @submit>\`.
- Each Vee field takes \`label\`, \`hint\`, \`name\` and renders its own error message. Do not add separate error elements.
- \`plan-form\` returns the component mapping and a complete example.

## Feedback and overlays

- Toasts: add \`sonner\`, render \`<UiSonner />\` once in \`app.vue\`, call \`useSonner("Title", { description })\`.
- Modals: \`UiDialog\` (content), \`UiAlertDialog\` (confirmations), \`UiSheet\` (side panels), \`UiDrawer\` (mobile bottom sheets).
- Menus: \`UiDropdownMenu\`, \`UiContextMenu\`, \`UiCommand\` (searchable palette).

## Data display

- Simple tables: \`UiTable\`. Rich tables (sorting, filtering, pagination): \`UiTanStackTable\` (headless, typed) or \`UiDatatable\` (DataTables.net, client only).
- Charts: \`UiApexcharts\` (client only). See \`/apex-charts\` docs for each chart type.
- Lists of settings or links: \`UiItem\`, \`UiDescriptionList\`.

## Install workflow

1. \`get-install-plan\` with every component and block you will use.
2. Run \`addNuxtModules\`, \`installDependencies\` (block-imported packages), then \`addComponents\`.
3. Register any \`nuxtConfigModules\` by hand in \`nuxt.config.ts\`.
4. Apply the plan's \`notes\` (for example defining \`COMPANY_NAME\`).

## Docs

- \`list-documentation-pages\` / \`search-documentation-pages\` for guides, \`/ai-elements/*\` for chat/agent patterns, \`/examples/*\` for full page examples.`,
        },
      ],
    };
  },
});
