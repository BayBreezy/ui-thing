---
title: BG Pattern - Grid
description: A decorative grid SVG pattern that fades outward — useful as a background embellishment for hero sections, cards, and empty states.
---

## Source code

Click :SourceCodeLink{component="BgPattern/Grid.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add bg-pattern-grid"}

## Usage

### Basic

Place the component inside a relatively positioned container. It renders an inline SVG sized to the chosen `size` prop.

::prose-show-case

:DocsBgPatternGridBasic

#code

<!-- automd:file src="../../app/components/content/Docs/BgPattern/DocsBgPatternGridBasic.vue" code lang="vue" -->

```vue [DocsBgPatternGridBasic.vue]
<template>
  <div
    class="relative mx-auto flex h-80 w-full items-center justify-center overflow-hidden rounded-lg border"
  >
    <span
      class="from-foreground to-foreground/30 pointer-events-none relative z-10 bg-linear-to-b bg-clip-text text-center text-5xl leading-none font-bold tracking-tight whitespace-pre-wrap text-transparent"
    >
      Background Pattern
    </span>
    <UiBgPatternGrid class="absolute inset-0" />
  </div>
</template>
```

<!-- /automd -->

::

### Sizes

Three built-in sizes — `sm` (336x336), `md` (480x480), and `lg` (768x768, default).

::prose-show-case

:DocsBgPatternGridSizes

#code

<!-- automd:file src="../../app/components/content/Docs/BgPattern/DocsBgPatternGridSizes.vue" code lang="vue" -->

```vue [DocsBgPatternGridSizes.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <div
      v-for="size in sizes"
      :key="size"
      class="bg-background relative flex items-center justify-center overflow-hidden rounded-lg border"
      :class="{
        'size-[180px]': size === 'sm',
        'size-[240px]': size === 'md',
        'size-[300px]': size === 'lg',
      }"
    >
      <span
        class="text-muted-foreground pointer-events-none relative z-10 text-sm font-semibold tracking-widest uppercase"
      >
        {{ size }}
      </span>
      <UiBgPatternGrid :size="size" class="absolute inset-0 m-auto" />
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

::prose-show-case

:DocsBgPatternGridColored

#code

<!-- automd:file src="../../app/components/content/Docs/BgPattern/DocsBgPatternGridColored.vue" code lang="vue" -->

```vue [DocsBgPatternGridColored.vue]
<template>
  <div class="relative flex h-100 items-center justify-center overflow-hidden">
    <span
      class="pointer-events-none relative z-10 bg-linear-to-b from-sky-500 to-blue-500 bg-clip-text text-center text-5xl leading-none font-bold tracking-tight whitespace-pre-wrap text-transparent"
    >
      Custom Color
    </span>
    <UiBgPatternGrid class="absolute -top-10 -left-10 text-sky-500/30" />
  </div>
</template>
```

<!-- /automd -->

::

## Props

| Prop    | Type                      | Default | Description                                                                                      |
| ------- | ------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| `size`  | `"sm" \| "md" \| "lg"`    | `"lg"`  | Controls the overall dimensions of the SVG pattern.                                              |
| `class` | `HTMLAttributes["class"]` | —       | Extra classes forwarded to the `<svg>` element. Use text color utilities to tint the grid lines. |
