---
title: Shimmer
description: Utilities for adding a shimmer effect to text elements.

---

## Credits

Shout out to [Shadcn Vue](https://www.shadcn-vue.com/docs/utilities/shimmer) for the hard work on this utility.


::prose-show-case

:DocsShimmerDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Shimmer/DocsShimmerDemo.vue" code lang="vue" -->

```vue [DocsShimmerDemo.vue]
<template>
  <div class="flex h-full w-full items-center justify-center">
    <p class="shimmer text-muted-foreground text-sm">Generating response&hellip;</p>
  </div>
</template>
```

<!-- /automd -->

::


## Installation

Adding this to your project ensures that the shimmer utility is available for use in your components.

```css [shimmer.css]
@property --shimmer-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 20deg;
}
@property --shimmer-image {
  syntax: "*";
  inherits: false;
}
@property --shimmer-text-fill {
  syntax: "*";
  inherits: false;
}

@theme inline {
  @keyframes tw-shimmer {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: 0 0;
    }
  }
}

@utility shimmer {
  --_spread: var(--shimmer-spread, calc(3ch + 40px));
  --_base: currentColor;
  --_highlight: var(--shimmer-color, oklch(from currentColor l c h / calc(alpha* 0.2)));

  background-image: var(
    --shimmer-image,
    linear-gradient(
      calc(90deg + var(--shimmer-angle)),
      var(--_base) calc(50% - var(--_spread)),
      color-mix(in oklch, var(--_highlight), var(--_base) 50%) calc(50% - var(--_spread) * 0.5),
      var(--_highlight) 50%,
      color-mix(in oklch, var(--_highlight), var(--_base) 50%) calc(50% + var(--_spread) * 0.5),
      var(--_base) calc(50% + var(--_spread))
    )
  );
  background-repeat: no-repeat;
  background-size: calc(200% + var(--_spread) * 2) 100%;
  background-position: 0 0;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: var(--shimmer-text-fill, transparent);
  animation: tw-shimmer var(--shimmer-duration, 2s) linear infinite;

  @variant dark {
    --_highlight: var(
      --shimmer-color,
      oklch(from currentColor max(0.8, calc(l + 0.4)) c h / calc(alpha + 0.4))
    );
  }

  &:where([dir="rtl"], [dir="rtl"] *) {
    animation-direction: reverse;
  }
}

@utility shimmer-once {
  animation-iteration-count: 1;
}

@utility shimmer-reverse {
  animation-direction: reverse;
}

@utility shimmer-none {
  --shimmer-image: none;
  --shimmer-text-fill: currentColor;
}

@utility shimmer-color-* {
  --shimmer-color: --value(--color, [color]);
  --shimmer-color: color-mix(
    in oklch,
    --value(--color, [color]) calc(--modifier(integer) * 1%),
    transparent
  );
}

@utility shimmer-duration-* {
  --shimmer-duration: calc(--value(integer) * 1ms);
}

@utility shimmer-spread-* {
  --shimmer-spread: calc(var(--spacing) * --value(integer));
  --shimmer-spread: --value([length], [percentage]);
}

@utility shimmer-angle-* {
  --shimmer-angle: calc(--value(integer) * 1deg);
}

@media (prefers-reduced-motion: reduce) {
  .shimmer {
    animation: none;
    background-image: none;
    -webkit-text-fill-color: currentColor;
  }
}
```


## Usage

| Class | Styles |
| --- | --- |
| `shimmer`                     | `background-clip: text;` <br /> `animation: tw-shimmer var(--shimmer-duration, 2s) linear infinite;` |
| `shimmer-once`                | `animation-iteration-count: 1;`                                                                      |
| `shimmer-reverse`             | `animation-direction: reverse;`                                                                      |
| `shimmer-none`                | `--shimmer-image: none;` <br /> `--shimmer-text-fill: currentColor;`                                 |
| `shimmer-color-<color>`       | `--shimmer-color: <color>;`                                                                          |
| `shimmer-color-[<value>]`     | `--shimmer-color: <value>;`                                                                          |
| `shimmer-color-<color>/<pct>` | `--shimmer-color: color-mix(in oklch, <color> <pct>, transparent);`                                  |
| `shimmer-duration-<number>`   | `--shimmer-duration: calc(<number> * 1ms);`                                                          |
| `shimmer-spread-<number>`     | `--shimmer-spread: calc(var(--spacing) * <number>);`                                                 |
| `shimmer-spread-[<value>]`    | `--shimmer-spread: <value>;`                                                                         |
| `shimmer-angle-<number>`      | `--shimmer-angle: calc(<number> * 1deg);`                                                            |

Add `shimmer` to a text element.

```html
<p class="shimmer text-muted-foreground">Generating response&hellip;</p>
```

The shimmer is built on `currentColor`, so it adapts to the element:

- The highlight is derived from the text color, with no configuration needed.
- It works on any color, from `text-muted-foreground` to brand colors.
- In dark mode, the highlight automatically brightens to stay visible.

The effect is pure CSS. The text is painted with `background-clip: text`, and the highlight sweeps across it in a seamless loop.


## Color

Use `shimmer-color-<color>` to set the highlight color explicitly. It accepts theme colors with an optional opacity modifier, or any arbitrary color value.

::prose-show-case
:DocsShimmerColorDemo

#code
<!-- automd:file src="../../app/components/content/Docs/Shimmer/DocsShimmerColorDemo.vue" code lang="vue" -->

```vue [DocsShimmerColorDemo.vue]
<template>
  <div class="text-muted-foreground flex flex-col items-center gap-2 text-sm">
    <p class="shimmer shimmer-color-blue-500/60">Generating response&hellip;</p>
    <p class="shimmer shimmer-color-[#378ADD]">Generating response&hellip;</p>
  </div>
</template>
```

<!-- /automd -->

::


## Duration

Use `shimmer-duration-<number>` to set the duration of one sweep in milliseconds. The default is `2000`, i.e. `2s`.

::prose-show-case

:DocsShimmerDurationDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Shimmer/DocsShimmerDurationDemo.vue" code lang="vue" -->

```vue [DocsShimmerDurationDemo.vue]
<template>
  <div
    class="text-muted-foreground mx-auto grid w-full max-w-lg gap-6 text-center text-sm sm:grid-cols-2"
  >
    <div class="flex flex-col gap-3">
      <p class="shimmer">Generating response&hellip;</p>
      <p class="font-mono text-xs">shimmer</p>
    </div>
    <div class="flex flex-col gap-3">
      <p class="shimmer shimmer-duration-1000">Generating response&hellip;</p>
      <p class="font-mono text-xs">shimmer-duration-1000</p>
    </div>
  </div>
</template>
```

<!-- /automd -->

::


## Spread

Use `shimmer-spread-<number>` to set the width of the highlight band using the spacing scale. The default is `calc(3ch + 40px)`: a fixed base plus a `3ch` term that scales with the font size.

::prose-show-case

:DocsShimmerSpreadDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Shimmer/DocsShimmerSpreadDemo.vue" code lang="vue" -->

```vue [DocsShimmerSpreadDemo.vue]
<template>
  <div
    class="text-muted-foreground mx-auto grid w-full max-w-lg gap-6 text-center text-sm sm:grid-cols-2"
  >
    <div class="flex flex-col gap-3">
      <p class="shimmer shimmer-spread-4">Generating response&hellip;</p>
      <p class="font-mono text-xs">shimmer-spread-4</p>
    </div>
    <div class="flex flex-col gap-3">
      <p class="shimmer shimmer-spread-24">Generating response&hellip;</p>
      <p class="font-mono text-xs">shimmer-spread-24</p>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

For one-off values, use an arbitrary length or percentage:

```html
<p class="shimmer shimmer-spread-[5rem]">Generating response&hellip;</p>
```


## Angle

Use `shimmer-angle-<number>` to set the tilt of the highlight band in degrees. The default is `20`.

::prose-show-case

:DocsShimmerAngleDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Shimmer/DocsShimmerAngleDemo.vue" code lang="vue" -->

```vue [DocsShimmerAngleDemo.vue]
<template>
  <div
    class="text-muted-foreground mx-auto grid w-full max-w-lg gap-6 text-center text-sm sm:grid-cols-2"
  >
    <div class="flex flex-col gap-3">
      <p class="shimmer">Generating response&hellip;</p>
      <p class="font-mono text-xs">shimmer</p>
    </div>
    <div class="flex flex-col gap-3">
      <p class="shimmer shimmer-angle-45">Generating response&hellip;</p>
      <p class="font-mono text-xs">shimmer-angle-45</p>
    </div>
  </div>
</template>
```

<!-- /automd -->

::


## Reverse

Use `shimmer-reverse` to sweep the highlight in the opposite direction. In RTL layouts the sweep already follows the reading direction. See [RTL](#rtl).


## Play Once

Use `shimmer-once` to play a single sweep instead of looping, useful as a reveal when streaming completes. Pair it with `shimmer-duration-<number>` to control how long the sweep takes.

::prose-show-case

:DocsShimmerPlayOnceDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Shimmer/DocsShimmerPlayOnceDemo.vue" code lang="vue" -->

```vue [DocsShimmerPlayOnceDemo.vue]
<script setup lang="ts">
  import { ref } from "vue";

  const key = ref(0);
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <p :key="key" class="shimmer text-muted-foreground shimmer-duration-1100 shimmer-once text-sm">
      Generating response&hellip;
    </p>
    <UiButton variant="outline" size="sm" @click="key++"> Replay </UiButton>
  </div>
</template>
```

<!-- /automd -->

::


## Disabling the Shimmer

Use `shimmer-none` to turn the effect off and render the text normally. It works in any class order, so the typical use is responsive or stateful:

::prose-show-case
:DocsShimmerDisablingDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Shimmer/DocsShimmerDisablingDemo.vue" code lang="vue" -->

```vue [DocsShimmerDisablingDemo.vue]
<template>
  <div class="text-muted-foreground flex flex-col items-center gap-3 text-sm">
    <p class="shimmer md:shimmer-none">Generating response&hellip;</p>
    <p class="font-mono text-xs">shimmer md:shimmer-none</p>
  </div>
</template>
```

<!-- /automd -->

::


## Fallback

The shimmer is built on modern color features, [relative color syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) and `color-mix()`, which are available in all current browsers. In older browsers without support, the highlight gradient is dropped and the text can render transparent. If you target older browsers, apply `shimmer` conditionally with a `supports-*` variant:

```vue
<p class="supports-[color:oklch(from_white_l_c_h)]:shimmer">
  Generating response&hellip;
</p>
```


## Reduced Motion

When the user prefers reduced motion, the animation is disabled automatically and the text renders normally. There is nothing to configure.


## RTL

The sweep follows the reading direction, left to right in LTR and right to left in RTL, with no extra classes. Use `shimmer-reverse` to flip the direction manually.

::prose-show-case

:DocsShimmerR_T_L_Demo

#code

<!-- automd:file src="../../app/components/content/Docs/Shimmer/DocsShimmerRTLDemo.vue" code lang="vue" -->

```vue [DocsShimmerRTLDemo.vue]
<template>
  <div
    class="text-muted-foreground mx-auto grid w-full max-w-lg gap-6 text-center text-sm sm:grid-cols-2"
  >
    <div class="flex flex-col gap-3">
      <p dir="ltr" class="shimmer">Generating response&hellip;</p>
      <p class="font-mono text-xs">dir=&quot;ltr&quot;</p>
    </div>
    <div class="flex flex-col gap-3">
      <p dir="rtl" class="shimmer">جارٍ إنشاء الرد&hellip;</p>
      <p class="font-mono text-xs">dir=&quot;rtl&quot;</p>
    </div>
  </div>
</template>
```

<!-- /automd -->

::
