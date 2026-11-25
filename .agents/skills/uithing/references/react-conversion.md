# React/shadcn → UI Thing Conversion

Use this when the user pastes React, JSX, TSX or shadcn/ui code and wants the Vue/Nuxt/UI Thing version.

## Goal

Produce code that feels native to UI Thing and Nuxt. Preserve intent and semantics, not JSX syntax, and map to existing UI Thing components and blocks before writing anything custom.

## Workflow

1. Read the source and decide whether it is a primitive, a composed interaction pattern, or a page section/block.
2. Find the closest UI Thing match: MCP `resolve-library-item`, `search-components`, `list-blocks`; or the docs (`https://uithing.com/raw/components/<name>.md`).
3. Read the exact API: `get-component` / `get-block`. Do not carry React prop names over.
4. Check what is installed (components folder, `package.json`) and install what is missing (`get-install-plan`, then `ui-thing add <names> --yes`).
5. Rewrite for Vue/Nuxt using the rules in [../rules/](../rules/). Keep the original's behavior, copy and layout intent.
6. If no close match exists, say so and compose the nearest UI Thing / Reka UI structure.

## React → Vue

| React | Vue / Nuxt |
| --- | --- |
| `children` | default slot |
| `className` | `class` |
| `onClick` | `@click` |
| `onOpenChange`, `onValueChange`, ... | `v-model` / `v-model:open` / `@update:*` |
| `useState` | `ref` / `reactive` |
| `useEffect` | `watch`, `watchEffect`, `onMounted` (client-only work) |
| `useMemo` | `computed` |
| JSX conditionals / `.map()` | `v-if` / `v-else` / `v-for` (with `:key`) |
| `forwardRef` | usually disappears |
| `"use client"` | remove; use `<ClientOnly>` / `.client.vue` only if the code needs the browser |
| `next/link` | `NuxtLink` |
| `next/image` | `<img>` (or `NuxtImg` if `@nuxt/image` is installed) |
| `next/navigation` (`useRouter`) | `useRouter()`, `navigateTo()` |
| `lucide-react` icons | `<Icon name="lucide:..." />` |
| `sonner` / `toast()` | `useSonner()` with `<UiSonner />` in `app.vue` |
| `cn(...)` | `class` (merged by `tv()`); `cn` only exists for registry code ([../registries.md](../registries.md)) |
| `asChild` | `as-child` |
| react-hook-form + `Form` / zod resolver | `useForm` + `toTypedSchema` + `UiVee*` ([../rules/forms.md](../rules/forms.md)) |

## Mapping rules

- **By intent, not by name:**
  - dialogs → `UiDialog`, `UiAlertDialog`, `UiSheet`, `UiDrawer`
  - menus → `UiDropdownMenu`, `UiContextMenu`, `UiMenubar`, `UiCommand`
  - info overlays → `UiPopover`, `UiTooltip`, `UiHoverCard`
  - forms → `UiVee*` for validated forms, base `Ui*` otherwise
  - empty states → `UiEmpty`, callouts → `UiAlert`, loading → `UiSkeleton`
- **Use shortcut props** when the component has them (`UiDialogContent title description`, `UiAlert icon title description`, `UiButton icon loading`).
- **Landing/marketing sections** → check blocks first (`list-blocks`). **Reusable interactive widgets** → `Ui*` components first. **Docs/content styling** → prose components from the `@baybreezy/docd` layer.
- **Tokens:** shadcn color classes already match UI Thing tokens (`bg-background`, `text-muted-foreground`). Convert raw colors to tokens.
- **Client-only libraries** (charts, editors, canvas) need `<ClientOnly>` or the `.client` component.

## Acceptance standard

The result is a Vue SFC (`<script setup lang="ts">`), uses auto-imported `Ui*` components and Nuxt conventions, semantic tokens, accessible Reka behavior, and reads as UI Thing code, not as JSX pasted into Vue.

## Examples

Primitive:

```tsx
<Button variant="outline" onClick={save}>Save</Button>
```

```vue
<UiButton variant="outline" @click="save">Save</UiButton>
```

Overlay:

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild><Button>Edit Profile</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Edit profile</DialogTitle></DialogHeader>
  </DialogContent>
</Dialog>
```

```vue
<UiDialog v-model:open="open">
  <UiDialogTrigger as-child>
    <UiButton>Edit Profile</UiButton>
  </UiDialogTrigger>
  <UiDialogContent title="Edit profile" />
</UiDialog>
```

Form:

```tsx
<form onSubmit={form.handleSubmit(onSubmit)}>
  <Input {...form.register("email")} />
  {errors.email && <p>{errors.email.message}</p>}
</form>
```

```vue
<form @submit="onSubmit">
  <UiVeeInput name="email" label="Email" type="email" />
</form>
```
