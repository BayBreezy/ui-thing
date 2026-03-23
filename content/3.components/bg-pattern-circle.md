---
title: BG Pattern - Circle
description: A decorative concentric circle SVG pattern that fades outward - useful as a background embellishment for hero sections, cards, and empty states.
---

## Source code

Click :SourceCodeLink{component="BgPattern/Circle.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add bg-pattern-circle"}

## Usage

### Basic

Place the component inside a relatively positioned container. It renders an inline SVG sized to the chosen `size` prop.

::ShowCase

:DocsBgPatternCircleBasic

#code

<!-- automd:file src="../../app/components/content/Docs/BgPattern/DocsBgPatternCircleBasic.vue" code lang="vue" -->

```vue [DocsBgPatternCircleBasic.vue]
<template>
  <div
    class="relative mx-auto flex h-80 w-full items-center justify-center overflow-hidden rounded-lg border"
  >
    <span
      class="pointer-events-none relative z-10 bg-linear-to-b from-foreground to-foreground/30 bg-clip-text text-center text-5xl leading-none font-bold tracking-tight whitespace-pre-wrap text-transparent"
    >
      Background Pattern
    </span>
    <UiBgPatternCircle class="absolute inset-0 mx-auto" />
  </div>
</template>
```

<!-- /automd -->

::

### Sizes

Three built-in sizes — `sm` (336x336), `md` (480x480), and `lg` (768x768, default).

::ShowCase

:DocsBgPatternCircleSizes

#code

<!-- automd:file src="../../app/components/content/Docs/BgPattern/DocsBgPatternCircleSizes.vue" code lang="vue" -->

```vue [DocsBgPatternCircleSizes.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <div
      v-for="size in sizes"
      :key="size"
      class="relative flex items-center justify-center overflow-hidden rounded-lg border bg-background"
      :class="{
        'size-[180px]': size === 'sm',
        'size-[240px]': size === 'md',
        'size-[300px]': size === 'lg',
      }"
    >
      <span
        class="pointer-events-none relative z-10 text-sm font-semibold tracking-widest text-muted-foreground uppercase"
      >
        {{ size }}
      </span>
      <UiBgPatternCircle :size="size" class="absolute inset-0 m-auto" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  const sizes = ["sm", "md", "lg"] as const;
</script>
```

<!-- /automd -->

::

### Custom Color

The component inherits `currentColor` for its strokes. Override the color by passing a text color utility via `class`.

::ShowCase

:DocsBgPatternCircleColored

#code

<!-- automd:file src="../../app/components/content/Docs/BgPattern/DocsBgPatternCircleColored.vue" code lang="vue" -->

```vue [DocsBgPatternCircleColored.vue]
<template>
  <div class="relative flex h-100 items-center justify-center overflow-hidden">
    <span
      class="pointer-events-none relative z-10 bg-linear-to-b from-violet-500 to-indigo-500 bg-clip-text text-center text-5xl leading-none font-bold tracking-tight whitespace-pre-wrap text-transparent"
    >
      Custom Color
    </span>
    <UiBgPatternCircle class="absolute -top-10 -left-10 text-violet-500/30" />
  </div>
</template>
```

<!-- /automd -->

::

## Props

| Prop    | Type                      | Default | Description                                                                                   |
| ------- | ------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `size`  | `"sm" \| "md" \| "lg"`    | `"lg"`  | Controls the overall dimensions of the SVG pattern.                                           |
| `class` | `HTMLAttributes["class"]` | —       | Extra classes forwarded to the `<svg>` element. Use text color utilities to tint the circles. |
