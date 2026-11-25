# Customization & Theming

UI Thing's design tokens live in the project's Tailwind CSS file (`tailwindCSSLocation` in `ui-thing.config.ts`, usually `app/assets/css/tailwind.css`). Everything below edits that file or the component files you own.

## Contents

- How it works
- Choose a theme
- Change radius, fonts and colors
- Add a custom color token
- Dark mode
- Extending a component

---

## How it works

The CSS file written by `ui-thing init` / `ui-thing theme` contains:

- `@import "tailwindcss"`, `@import "tw-animate-css"` and the `@tailwindcss/forms` plugin.
- `@custom-variant dark (&:is(.dark *))` for dark mode.
- `@theme { ... }` with fonts (`--font-sans` Inter, `--font-mono` Fira Code) and animations used by components.
- `@theme inline { ... }` mapping Tailwind color utilities to variables (`--color-primary: var(--primary)`, plus radius and sidebar and chart tokens).
- `:root { ... }` with the light values and `html.dark { ... }` with the dark values, written in `oklch()`.

Tokens: `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, each with a `-foreground` pair where relevant, plus `--border`, `--input`, `--ring`, `--radius`, `--chart-1..5` and `--sidebar-*`.

Components use these through utilities such as `bg-primary`, `text-muted-foreground` and `border-border`. Change a token once and every component follows.

---

## Choose a theme

```bash
npx ui-thing@latest theme zinc     # or: slate, stone, gray, neutral, red, rose, orange, green, blue, yellow, violet
```

- It **rewrites the whole Tailwind CSS file** after asking for confirmation, so custom tokens are lost. Pick the theme first, then customize.
- It asks before overwriting. Pass `--yes` (`npx ui-thing@latest theme rose --yes`) to skip the question when running unattended, and always pass the theme name.
- The themes are the shadcn/ui themes (`https://ui.shadcn.com/themes`). You can copy a customized theme from there into the `:root` and `html.dark` blocks directly.

---

## Change radius, fonts and colors

- **Radius:** set `--radius` in `:root` (for example `0.5rem` sharper, `0.9rem` rounder). `--radius-sm/md/lg/xl` derive from it.
- **Fonts:** change `--font-sans` / `--font-mono` in `@theme`. `@nuxt/fonts` (installed by init) loads web fonts that are referenced by `font-family`.
- **Brand color:** change `--primary` and `--primary-foreground` in both `:root` and `html.dark`. Keep contrast readable in both modes. Charts use `--chart-1..5`.

Do not change colors per-component with raw Tailwind colors.

---

## Add a custom color token

Example: a `success` color that works in both modes.

```css
@theme inline {
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
}

:root {
  --success: oklch(0.62 0.17 150);
  --success-foreground: oklch(0.985 0 0);
}

html.dark {
  --success: oklch(0.7 0.17 150);
  --success-foreground: oklch(0.15 0 0);
}
```

Now `bg-success text-success-foreground` works and follows dark mode. For badges, prefer `UiBadge variant="soft" color="green"` before adding tokens.

---

## Dark mode

- `@nuxtjs/color-mode` (configured by init with `classSuffix: ""`) sets the `dark` class on `<html>`.
- Toggle with `const colorMode = useColorMode()` and `colorMode.preference = "dark" | "light" | "system"`.
- Use tokens and you rarely need `dark:` utilities at all.
- Test every screen in both modes.

---

## Extending a component

Components are your files. Choose the lightest option that works:

1. **`class`** for layout and small tweaks (`<UiCard class="max-w-md">`).
2. **Built-in `variant` / `size` / `color`** props.
3. **Edit the component's `tv()` block** to add a variant everyone in the app can use:

   ```ts
   const styles = tv({
     base: "...",
     variants: {
       variant: {
         // existing variants...
         brand: "bg-brand text-brand-foreground hover:bg-brand/90",
       },
     },
   });
   ```

4. **Wrap it** in your own component (`AppPrimaryButton.vue`) when you want an app-specific preset without touching the library file.

Keep `data-slot`, ARIA and focus classes intact. Note that `ui-thing update <component>` overwrites the file: commit your edits first, or keep customizations in wrapper components.
