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

You will need to add this to your `tailwind.config.js` file.

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        grid: "grid 15s linear infinite",
      },
      keyframes: {
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
};
```

::
::Step

### Create Component

Create the component `RetroGrid.vue` in the `components` directory.

<!-- automd:file src="../../app/components/Ui/RetroGrid.vue" code lang="vue" -->

```vue [RetroGrid.vue]
<template>
  <div
    class="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px]"
  >
    <div class="absolute inset-0 [transform:rotateX(35deg)]">
      <div
        class="animate-grid [background-image:linear-gradient(to_right,theme(colors.input)_1px,transparent_0),linear-gradient(to_bottom,theme(colors.input)_1px,transparent_0)] [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]"
      />
    </div>

    <div class="absolute inset-0 bg-gradient-to-t from-background to-transparent to-90%" />
  </div>
</template>
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
      class="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent"
    >
      Retro Grid
    </span>

    <UiRetroGrid />
  </div>
</template>
```

<!-- /automd -->

::
