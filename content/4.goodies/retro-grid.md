---
title: Retro Grid
description: Display an animated scrolling grid of retro squares.
---

## Credits

Shout out to [Magic UI](https://magicui.design/docs/components/retro-grid) for the inspiration. I actually discovered this package while browsing their website.

## Getting Started

:::Steps
::Step

### Add Animation

You will need to add this to your `tailwind.css` file.

```css
--animate-grid: grid 15s linear infinite;

@keyframes grid {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
}
```

::
::Step

### Create Component

Create the component `RetroGrid.vue` in the `components` directory.

<!-- automd:file src="../../app/components/Ui/RetroGrid.vue" code lang="vue" -->

```vue [RetroGrid.vue]
<template>
  <Primitive
    :as
    :as-child
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    :style="{
      '--grid-angle': `${angle}deg`,
      '--cell-size': `${cellSize}px`,
      '--opacity': opacity,
      '--light-line': lightLineColor,
      '--dark-line': darkLineColor,
    }"
  >
    <div class="absolute inset-0 transform-[rotateX(var(--grid-angle))]">
      <div
        class="inset-[0%_0px] -ml-[200%] h-[300vh] w-[600vw] origin-[100%_0_0] animate-grid bg-[linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] bg-size-[var(--cell-size)_var(--cell-size)] bg-repeat dark:bg-[linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]"
      />
    </div>

    <div class="absolute inset-0 bg-linear-to-t from-white to-transparent to-90% dark:from-black" />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export type RetroGridProps = PrimitiveProps & {
    /**
     * Additional CSS classes to apply to the grid container
     */
    class?: HTMLAttributes["class"];
    /**
     * Rotation angle of the grid in degrees
     * @default 65
     */
    angle?: number;
    /**
     * Grid cell size in pixels
     * @default 60
     */
    cellSize?: number;
    /**
     * Grid opacity value between 0 and 1
     * @default 0.5
     */
    opacity?: number;
    /**
     * Grid line color in light mode
     * @default "gray"
     */
    lightLineColor?: string;
    /**
     * Grid line color in dark mode
     * @default "gray"
     */
    darkLineColor?: string;
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<RetroGridProps>(), {
    angle: 65,
    cellSize: 60,
    opacity: 0.5,
    lightLineColor: "gray",
    darkLineColor: "gray",
  });
  const styles = tv({
    base: [
      "pointer-events-none absolute size-full overflow-hidden perspective-[200px]",
      "opacity-(--opacity)",
    ],
  });
</script>
```

<!-- /automd -->

::
:::

## Usage

### Basic

::ShowCase

:DocsRetroGrid

#code

<!-- automd:file src="../../app/components/content/Docs/RetroGrid/DocsRetroGrid.vue" code lang="vue" -->

```vue [DocsRetroGrid.vue]
<template>
  <div
    class="relative mx-auto flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background p-20"
  >
    <span
      class="pointer-events-none z-10 bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl leading-none font-bold tracking-tighter whitespace-pre-wrap text-transparent"
    >
      Retro Grid
    </span>

    <UiRetroGrid />
  </div>
</template>
```

<!-- /automd -->

::
