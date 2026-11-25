# States, Feedback & Accessibility

A screen is not done until it handles every state and works with a keyboard.

## Contents

- Design every state
- Feedback: toasts and confirmations
- Client-only components
- Motion
- Accessibility traps

---

## Design every state

| State | Use |
| --- | --- |
| Loading | `UiSkeleton` shaped like the final content, or `:loading` on `UiButton`. `UiLoader` for blocking spinners. |
| Empty | `UiEmpty` (or an EmptyState block) with a clear next action. |
| Error | `UiAlert variant="destructive"` for page/section errors, field-level messages from `UiVee*` inputs. |
| Success | `useSonner.success("Saved")`. |
| Destructive | Confirm with `UiAlertDialog` before deleting or cancelling. |

**Incorrect:**

```vue
<div v-if="!items.length" class="text-muted-foreground p-8 text-center">Nothing here</div>
```

**Correct:**

```vue
<UiEmpty v-if="!items.length">
  <UiEmptyHeader>
    <UiEmptyMedia variant="icon"><Icon name="lucide:folder-code" /></UiEmptyMedia>
    <UiEmptyTitle>No projects yet</UiEmptyTitle>
    <UiEmptyDescription>Create your first project to get started.</UiEmptyDescription>
  </UiEmptyHeader>
  <UiEmptyContent>
    <UiButton>Create project</UiButton>
  </UiEmptyContent>
</UiEmpty>
```

---

## Feedback: toasts and confirmations

- Add the toaster once: `npx ui-thing@latest add sonner`, then render `<UiSonner />` once in `app.vue`.
- Call `useSonner("Title", { description })`, `useSonner.success(...)`, `useSonner.error(...)`. Do not destructure `useSonner`.
- Use `UiAlertDialog` (not `confirm()`) for destructive confirmations. Use `UiDialog` for content and `UiSheet`/`UiDrawer` for panels.

---

## Client-only components

Some components cannot render on the server. Use their `.client` variants as shipped, or wrap them in `<ClientOnly>`:

- Charts (`UiApexchart`), `UiDatatable`, `UiCalendar`, `UiMeteors`, `UiFlipClock`, and anything using canvas, WebGL, `window` or `document`.

If you see hydration or SSR errors after adding a component, check this first.

---

## Motion

- Blocks use `motion-v` (`<Motion>`, `while-in-view`). `ui-thing init` installs the `motion-v/nuxt` module.
- Keep motion subtle: fade or translate on entry, 200 to 500 ms, staggered children. Animate one idea per section.
- Respect reduced motion: use `motion-safe:` / `motion-reduce:` utilities and do not animate layout-critical content continuously.
- Reuse a block's existing `variants` instead of inventing a new animation setup.

---

## Accessibility traps

- Keep Reka's focus, keyboard and ARIA behavior. Never replace `UiButton`, menus or dialogs with `div` + `@click`.
- Dialogs, sheets and drawers need a title. Use `title` or a `sr-only` title if it must be hidden.
- Icon-only buttons need `aria-label`.
- Add a keyboard alternative to anything pointer-only (drag and drop, hover cards, sliders).
- Do not use color alone to show status. Add text or an icon. Pluralize counts ("1 event", "2 events").
- `sr-only` is `position: absolute`. Inside an `overflow-auto` wrapper that is not positioned, it makes the page scroll sideways on mobile: put `relative` on the scroll wrapper, and never put `sr-only` on a `<table>`.
- Prefer `aria-label` over `sr-only` spans for button names.
- Take a `today`/`now` prop instead of reading the current date in demos, and derive timers from `useNow({ interval: 1000 })` plus a start timestamp so they stay accurate in background tabs.
- Check 375px width and both color modes before calling a page done.
