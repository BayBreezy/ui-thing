# Composition

## Contents

- Naming, imports and where code goes
- Use the full structure and the shortcut props
- Triggers: `as-child`
- Layout: containers and cards
- Use existing components
- Component gotchas

---

## Naming, imports and where code goes

- Components live in the configured components folder (usually `app/components/Ui`) and are used with the `Ui` prefix: `<UiButton>`, `<UiCard>`, `<UiCardContent>`.
- Compound parts ship with their parent: adding `card` installs `UiCardHeader`, `UiCardTitle`, `UiCardContent` and the rest. `ui-thing add` takes a registry value that is usually the kebab-case name (`dropdown-menu`, `vee-input`) but not always: `UiTanStackTable` is `tanstacktable` and `UiApexchart` is `apexcharts`. Get the exact value from `ui-thing list`, MCP `resolve-library-item` / `list-components`, or `https://uithing.com/api/components` before running `add`; do not guess.
- Nuxt auto-imports components, composables and utils. **Do not** add manual imports for `Ui*` components, `useForm`, `toTypedSchema`, `useSonner`, `Icon`, `tv` or `VariantProps`.
- Blocks are named `Block<Category><N>` (for example `BlockHero1`). Copy the block into `app/components` (or inline it in a page) and edit it. Blocks compose existing `Ui*` components, so install the components they use.

---

## Use the full structure and the shortcut props

Compose the full family when a pattern expects it (card header/title/content/footer, menu items, tabs list/trigger/content). Many components also accept **shortcut props** that render the common parts for you. Prefer them.

**Incorrect:**

```vue
<UiDialogContent>
  <UiDialogHeader>
    <UiDialogTitle>Edit profile</UiDialogTitle>
    <UiDialogDescription>Update your details.</UiDialogDescription>
  </UiDialogHeader>
</UiDialogContent>

<div class="flex gap-3 rounded-lg border border-red-300 bg-red-50 p-4"><span>Payment failed</span></div>
```

**Correct:**

```vue
<UiDialogContent title="Edit profile" description="Update your details." />

<UiAlert variant="destructive" icon="lucide:circle-alert" title="Payment failed" description="Update your card and try again." />
```

Known shortcut props:

- `UiDialogContent`: `title`, `description`, `hideClose`, and slots `header`, `title`, `description`, `content`, `footer`, `close`.
- `UiAlert`: `variant` (`default`, `destructive`, `info`, `success`, `warning`), `filled`, `icon`, `title`, `description`. Add `role="alert"` or `role="status"` for alerts that appear after an action.
- `UiButton`: `icon`, `iconPlacement`, `loading`, `loadingIcon`.
- `UiBadge`: `variant`, `color`, `shape`.

Check the component's docs for the exact props before assuming a shortcut exists.

---

## Triggers: `as-child`

Render a trigger as your own element instead of nesting buttons.

**Incorrect:**

```vue
<UiDialogTrigger><UiButton>Open</UiButton></UiDialogTrigger>
```

**Correct:**

```vue
<UiDialogTrigger as-child><UiButton>Open</UiButton></UiDialogTrigger>
```

Never nest interactive elements (a `UiButton` inside a `<button>` or `<a>`).

---

## Layout: containers and cards

- Page width and gutters: `<UiContainer>`. Do not hand-roll `max-w-7xl mx-auto px-4`.
- `UiCard` has `py-6 gap-6` built in. For an edge-to-edge image or header use `gap-0 py-0`.
- `UiCardHeader` is a CSS grid, so `flex-row` does nothing. For a row layout use a plain `<div class="flex ...">` inside it.
- Use `UiSeparator` instead of `<hr>` or `border-t` divs, `UiSkeleton` for loading placeholders, `UiBadge` instead of styled spans, `UiEmpty` for empty states, `UiAlert` for callouts.

---

## Use existing components

Before writing a styled `div`, check whether a component or block exists. Search with the MCP `search-components` / `resolve-library-item` tools or `https://uithing.com/raw/components/<name>.md`. Compose the nearest match first.

| If you need | Compose |
| --- | --- |
| Modal with content | `UiDialog` |
| Confirm a destructive action | `UiAlertDialog` |
| Side panel / mobile sheet | `UiSheet` / `UiDrawer` |
| Row menu / user menu | `UiDropdownMenu` |
| Command palette | `UiCommand` |
| Settings or link lists | `UiItem*`, `UiDescriptionList` |
| App shell | the Sidebar blocks (`get-block` for exact source) |

---

## Component gotchas

These come from building the library's blocks. They save a lot of debugging.

- `@update:open` on `UiDialog` does not fire when you set `v-model:open` in code. Use `watch(open, ...)`.
- `UiCheckbox` needs an `id` plus `<UiLabel :for="id">`. Do not wrap it in a `<label>`.
- `UiTextarea` needs a numeric `:rows` and has no autosize.
- `UiCalendar` wraps v-calendar (client only, no `v-model`). For a real `v-model` use `UiDatepicker`.
- `UiPinInput type="number"` emits numbers, so `0` is falsy. Use `code.join('').length` to check completeness.
- `UiToggleGroup type="single"` items render as `button[aria-pressed]`.
- `UiCircularProgress` takes `progress` (0 to 1) or `current-step` and `total-steps`.
- `UiDraggable` drag is pointer only and `UiDropfile` has no keyboard access: add a keyboard alternative (a real "Browse files" button, `useFileDialog`).
- `UiTimeline` items are `aria-hidden`. Build readable feeds with an `<ol>`.
- `useSonner` is vue-sonner's `toast`: call `useSonner("Saved", { description })` or `useSonner.success(...)`. Do not destructure it.
- Tiptap 3: import from `@tiptap/vue-3` and `@tiptap/vue-3/menus` (not auto-imported). `StarterKit` already includes Link and Underline.
- Popups that open upward need reserved space above them when shown in an iframe or preview.
