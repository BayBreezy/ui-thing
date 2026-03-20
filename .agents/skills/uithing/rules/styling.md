# Styling & Tokens

## Core Rules

- Prefer `tv()` from `tailwind-variants`.
- Do not center `cn()` as the primary styling pattern. UI Thing does not rely on a central `cn()` helper.
- Use semantic tokens like `bg-background`, `text-foreground`, `border-border`, `bg-popover`, and `text-muted-foreground`.
- Keep `data-slot` attributes on roots and important subparts.
- When passing class overrides into `tv()` or slot style builders, normalize them with `normalizeClass(props.class) || undefined`.
- Use the existing theme/token files instead of introducing ad hoc colors:
  - `app/assets/css/tailwind.css`
  - `app/assets/css/theme.css`
  - `app/utils/themes.ts`

## Class Override Rule

UI Thing wrapper components accept Vue-style class bindings:

```ts
class?: HTMLAttributes["class"];
```

At the styling boundary, pass them into `tv()` like this:

```ts
styles({ class: normalizeClass(props.class) || undefined });
```

Do not narrow the public prop type to a third-party `ClassValue` type just to satisfy an internal helper.

## Theme Guidance

- Prefer semantic theme tokens over raw Tailwind colors.
- Theme selection happens through `theme-*` classes and CSS variables.
- If the user wants a new theme, prefer the existing UI Thing theme flow rather than hand-rolling theme files from scratch.

## Overlay & Surface Styling

- Keep existing motion, collision, and portal behavior intact.
- When changing floating surfaces, preserve the family’s existing token base (`popover`, `background`, etc.).
