# Styling & Tokens

UI Thing styling is token-driven (shadcn-style CSS variables) and built on `tailwind-variants` (`tv()`), with Tailwind CSS v4. Colors, radius and dark mode all come from the theme in the project's Tailwind CSS file (`tailwindCSSLocation` in `ui-thing.config.ts`).

## Contents

- Semantic tokens
- `class` is merged, later wins
- Built-in props before custom classes
- Theme, radius and dark mode
- Tailwind v4 class names
- `data-slot` hooks
- Writing a new styled component (`tv()`)
- `cn()` and registry components

---

## Semantic tokens

| Need | Use |
| --- | --- |
| Page / surface | `bg-background`, `bg-card`, `bg-popover`, `bg-muted` |
| Text | `text-foreground`, `text-muted-foreground` (secondary copy), `text-primary` (eyebrows, links) |
| Brand actions | `bg-primary text-primary-foreground` (or `<UiButton>`) |
| Subtle emphasis | `bg-accent`, `bg-secondary`, `bg-primary/10` |
| Borders and inputs | `border`, `border-input`, `ring-ring` |
| Destructive | `text-destructive`, `bg-destructive` |

**Incorrect:**

```vue
<div class="border-slate-200 bg-white text-gray-900 dark:bg-zinc-900">
  <p class="text-gray-500">Secondary text</p>
  <span class="text-emerald-600">+20.1%</span>
</div>
```

**Correct:**

```vue
<div class="bg-card text-foreground border">
  <p class="text-muted-foreground">Secondary text</p>
  <UiBadge variant="soft" color="green">+20.1%</UiBadge>
</div>
```

Raw colors break dark mode and theming. For status colors use `UiBadge` (`variant="soft|solid|outline|modern"` with `color`; colors include `primary`, `red`, `orange`, `amber`, `yellow`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, plus `error`/`warning`/`success` aliases) or `text-destructive`. If a needed color has no token, add a CSS variable to the theme (see [../customization.md](../customization.md)); do not hardcode it.

---

## `class` is merged, later wins

Every component merges the `class` you pass into its `tv()` variants, so use it for layout and small tweaks.

**Correct:**

```vue
<UiCard class="max-w-md">...</UiCard>
<UiButton class="w-full" type="submit">Continue</UiButton>
```

Do not use `class` to fight a component's design. If you are overriding colors, typography and padding of a component, you want a different `variant`, a different component, or an edit to the copied source file (the files are yours).

---

## Built-in props before custom classes

**Incorrect:**

```vue
<UiButton class="border-input hover:bg-accent border bg-transparent">Cancel</UiButton>
<UiBadge class="rounded-full bg-green-100 text-green-700">Active</UiBadge>
```

**Correct:**

```vue
<UiButton variant="outline">Cancel</UiButton>
<UiBadge variant="soft" color="green" shape="pill">Active</UiBadge>
```

`UiButton` variants: `default`, `secondary`, `outline`, `ghost`, `link`, `destructive`, `gradient`, `shine`, `underline`. Sizes: `xs`, `sm`, default, `lg`, `icon-xs`, `icon-sm`, `icon`, `icon-lg`. Use **one** `default` button per view as the primary action; secondary actions are `outline` or `ghost`.

---

## Theme, radius and dark mode

- Pick the brand color once, early: `npx ui-thing@latest theme <name>` (Zinc, Slate, Stone, Gray, Neutral, Red, Rose, Orange, Green, Blue, Yellow, Violet). It rewrites the token block in the Tailwind CSS file.
- Change roundness with the `--radius` token in the theme block, not per-component classes.
- Dark mode is the `.dark` class set by `@nuxtjs/color-mode`. Provide a toggle with `useColorMode()` and check every screen in both modes.
- Never write `dark:` color overrides for tokens that already switch (`bg-background`, `text-muted-foreground`).

---

## Tailwind v4 class names

Use v4 names: `bg-linear-to-br` (not `bg-gradient-to-br`), `shadow-xs`, `outline-hidden`, `size-*` when width and height are equal (`size-10`, not `w-10 h-10`), `truncate` instead of `overflow-hidden text-ellipsis whitespace-nowrap`, `text-balance` on headings.

Spacing: follow the block rhythm. Sections use `<UiContainer class="py-16 lg:py-24">`, grids `gap-6` to `gap-8`, related items `space-y-2` to `space-y-4` (or `flex flex-col gap-*`). Use one step between siblings and a larger step between groups. Design mobile first, then `md:` / `lg:`.

---

## `data-slot` hooks

Components put `data-slot` attributes on their roots and key parts (`data-slot="dialog-content"`, `alert-icon`, ...). To restyle a part from outside, target the slot instead of using deep descendant selectors or editing internals:

```vue
<UiCard class="[&_[data-slot=card-title]]:text-xl">...</UiCard>
```

Never remove `data-slot`, ARIA or focus-ring classes from a component you edit.

---

## Writing a new styled component (`tv()`)

`tv` and `VariantProps` are auto-imported (added by `ui-thing init`). Accept `class` as a Vue class binding and normalize it at the `tv()` boundary:

```vue
<template>
  <div data-slot="stat" :class="styles({ tone, class: normalizeClass(props.class) || undefined })">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const styles = tv({
    base: "bg-card text-card-foreground rounded-lg border p-4",
    variants: {
      tone: { default: "", danger: "border-destructive/50 text-destructive" },
    },
    defaultVariants: { tone: "default" },
  });

  const props = defineProps<{
    tone?: VariantProps<typeof styles>["tone"];
    class?: HTMLAttributes["class"];
  }>();
</script>
```

Prefer composing existing components over writing new ones (see [composition.md](./composition.md)).

---

## `cn()` and registry components

UI Thing's own components use `tv()` and do not need a `cn()` helper. Components from third-party registries (shadcn-style) often import `cn` from `~/lib/utils`. `ui-thing add <registry item>` creates that helper (`clsx` + `tailwind-merge`) for you when needed. See [../registries.md](../registries.md).
