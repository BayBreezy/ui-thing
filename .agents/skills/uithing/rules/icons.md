# Icons

UI Thing uses [Nuxt Icon](https://nuxt.com/modules/icon) (Iconify). `ui-thing init` installs and configures `@nuxt/icon`.

## Rules

- **Icon names are strings: `collection:name`.** Use `<Icon name="lucide:check" class="size-4" />`. `Icon` is auto-imported.
- **Use `lucide:*` for UI icons and `logos:*` for brand logos.** Do not mix icon families in one view.
- **Size with `size-*` on the icon** (`size-4`, `size-5`). Inside a `UiButton`, set `icon` and let the button size it.
- **Icon-only buttons need an accessible name** and usually a tooltip.

**Incorrect:**

```vue
<UiButton size="icon"><Icon name="lucide:trash-2" /></UiButton>
<UiButton><Icon name="lucide:save" class="mr-2 size-4" />Save</UiButton>
```

**Correct:**

```vue
<UiTooltip>
  <UiTooltipTrigger as-child>
    <UiButton size="icon" variant="ghost" aria-label="Delete"><Icon name="lucide:trash-2" class="size-4" /></UiButton>
  </UiTooltipTrigger>
  <UiTooltipContent>Delete</UiTooltipContent>
</UiTooltip>
<UiButton icon="lucide:save">Save</UiButton>
```

## Props that take icons

Components with an `icon` prop (`UiButton`, `UiAlert`, ...) take the **string name**, not an imported component: `icon="lucide:circle-alert"`. Buttons also have `iconPlacement="left|right"` and `loadingIcon`.

## Gotchas

- Iconify icons set `fill="none"` on the inner path. For a filled icon (stars, hearts) add `[&_path]:fill-current`.
- `logos:*` brand icons can be black and vanish in dark mode. Put them on a light chip (`bg-white rounded-md p-1`).
- Do not import icon components from an icon package for use inside UI Thing components; use `Icon`.
