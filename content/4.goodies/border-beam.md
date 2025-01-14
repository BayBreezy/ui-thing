---
title: Border Beam
description: An animated beam of light which travels along the border of its container.
---

## Credits

Shout out to [Magic UI](https://magicui.design/docs/components/border-beam) for the inspiration. I actually discovered this package while browsing their website.

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
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
    },
  },
};
```

::

::Step

### Create Component

Create the component `UiBorderBeam.vue` in the `components` directory.

<!-- automd:file src="../../app/components/Ui/BorderBeam.vue" code lang="vue" -->

```vue [BorderBeam.vue]
<template>
  <div
    :style="{
      '--size': size,
      '--duration': duration,
      '--anchor': anchor,
      '--border-width': borderWidth,
      '--color-from': colorFrom,
      '--color-to': colorTo,
      '--delay': `-${delay}s`,
    }"
    class="absolute inset-[0] rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]"
  />
</template>

<script lang="ts">
  export interface BorderBeamProps {
    class?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    anchor?: number;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
  }
</script>

<script lang="ts" setup>
  withDefaults(defineProps<BorderBeamProps>(), {
    size: 200,
    duration: 15,
    anchor: 90,
    borderWidth: 1.5,
    colorFrom: "#ffaa40",
    colorTo: "#9c40ff",
    delay: 0,
  });
</script>
```

<!-- /automd -->

::

:::

## Usage

### Basic

Just place the border beam component inside a div with relative positioning, width, and height. You will notice the beam automatically moves around the perimeter of it's container.

::ShowCase

:DocsBorderBeam

#code

<!-- automd:file src="../../app/components/content/Docs/BorderBeam/DocsBorderBeam.vue" code lang="vue" -->

```vue [DocsBorderBeam.vue]
<template>
  <div class="relative overflow-hidden rounded-xl">
    <!-- eslint-disable-next-line vue/html-self-closing -->
    <img
      src="https://store-wp.mui.com/wp-content/uploads/2019/08/tabler-react.com_-min-e1565617941333.png"
      alt="Hero Image"
      class="w-full rounded-xl border object-cover"
    />

    <UiBorderBeam :size="350" :duration="12" :delay="9" />
  </div>
</template>
```

<!-- /automd -->

::
