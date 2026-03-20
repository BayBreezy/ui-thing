# React/shadcn → UI Thing Conversion

Use this reference when the user pastes React, JSX, TSX, shadcn/ui and wants the closest Vue/Nuxt/UI Thing version.

## Goal

Convert the source into something that feels native to UI Thing and Nuxt.

- preserve intent and semantics
- do not preserve JSX syntax one-to-one
- prefer existing UI Thing families first
- only write custom Vue wrappers when no close UI Thing match exists

## Workflow

1. Inspect the pasted source carefully.
2. Decide whether it is:
   - a single primitive/component
   - a composed interaction pattern
   - a block or page section
3. Use UI Thing MCP tools first:
   - `resolve-library-item`
   - `list-components`
   - `list-blocks`
   - `get-component`
   - `get-block`
   - `get-install-plan`
4. Map the result to the closest native UI Thing composition.
5. Rewrite the code idiomatically for Vue/Nuxt.
6. If no close match exists, explain that and compose the nearest native Vue/REKA-compatible structure.

## React → Vue Heuristics

- `children` → default slot
- named composition regions → named slots when the UI Thing family supports them
- `className` → `class`
- `onClick` → `@click`
- `onOpenChange`, `onValueChange`, etc. → `v-model` or `@update:*`
- React controlled state → Vue refs plus `v-model`
- JSX conditionals → `v-if` / `v-else`
- JSX list rendering → `v-for`
- `forwardRef` usually disappears unless the primitive wrapper needs explicit forwarding behavior
- React client-only behavior → Vue composables, `onMounted`, or Nuxt client-only boundaries where needed

## UI Thing Mapping Rules

### Use existing families first

Map by intent, not by raw source name:

- dialog-like UI → `UiDialog*`, `UiAlertDialog*`, `UiSheet*`, `UiDrawer*`
- menus → `UiDropdownMenu*`, `UiContextMenu*`, `UiMenubar*`
- info overlays → `UiPopover*`, `UiTooltip*`, `UiHoverCard*`
- forms → `Ui*` or `Ui/Vee/*` depending on whether validation is part of the task

### Blocks vs primitives

- If the source is a landing-page section or marketing layout, check blocks first.
- If the source is a docs/content concern, check prose components.
- If the source is a reusable interactive component, check `Ui*` families first.

## Acceptance Standard

The result should feel like native UI Thing code:

- Vue SFC structure
- Nuxt-friendly patterns
- Reka-compatible composition
- semantic tokens and `tv()`
- copy-pasteable source code

It should not feel like React syntax pasted into Vue.

## Concise Examples

### Primitive conversion

React:

```tsx
<Button variant="outline" onClick={save}>
  Save
</Button>
```

Vue/UI Thing:

```vue
<UiButton variant="outline" @click="save">Save</UiButton>
```

### Overlay conversion

React/shadcn:

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

Vue/UI Thing:

```vue
<UiDialog v-model:open="open">
  <UiDialogTrigger as-child>
    <UiButton>Edit Profile</UiButton>
  </UiDialogTrigger>
  <UiDialogContent title="Edit profile" />
</UiDialog>
```
