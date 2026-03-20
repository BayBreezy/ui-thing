# Reka Wrappers & Forwarding

## Core Rules

- Use `useForwardProps` for pure prop forwarding.
- Use `useForwardPropsEmits` when the wrapper forwards both props and emits.
- Use `reactiveOmit` to strip wrapper-only props before forwarding.
- Preserve primitive accessibility and behavior.

## Wrapper Shape

Typical UI Thing wrappers:

- accept primitive props plus UI Thing-specific props like `class`, `to`, `title`, `description`
- strip wrapper-only props with `reactiveOmit`
- pass the rest to the primitive untouched

## Class Handling

Wrapper components should expose:

```ts
class?: HTMLAttributes["class"];
```

Then pass it into `tv()` after normalization.

## Dual-Script SFCs

Use a plain `<script lang="ts">` block when you need:

- exported shared styles
- exported types
- shared helpers for sibling components

Keep imports that support those exports in the plain script block when needed.

## Nuxt Expectations

- Rely on Nuxt auto-imports where the repo already expects them.
- Do not add explicit imports for repo-local utilities when auto-imports are the established pattern.
