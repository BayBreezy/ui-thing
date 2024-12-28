---
title: Meteors
description: Shower your UI with meteors.... For whatever reason you want to do that.
---

## Credits

Shout out to [Magic UI](https://magicui.design/docs/components/meteors) for the inspiration. I actually discovered this package while browsing their website.

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
        meteor: "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
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

Create the component `UiMeteors.client.vue` in the `components` directory.

<!-- automd:file src="../../app/components/Ui/Meteors.client.vue" code lang="vue" -->

```vue [Meteors.client.vue]
<template>
  <span v-for="(s, i) in meteorStyles" :key="i" :class="localStyles().wrapper()" :style="s">
    <div :class="localStyles().tail()" />
  </span>
</template>

<script lang="ts" setup>
  import type { CSSProperties } from "vue";

  const props = withDefaults(
    defineProps<{
      number?: number;
      class?: any;
    }>(),
    {
      number: 20,
    }
  );
  const meteorStyles = ref<CSSProperties[]>(
    [...Array.from({ length: props.number })].map(() => ({
      top: -5,
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }))
  );

  const setStyles = () => {
    const styles = [...new Array(props.number)].map(() => ({
      top: -5,
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
    meteorStyles.value = styles;
  };

  setStyles();

  watch(() => props.number, setStyles, { immediate: true });

  const localStyles = tv({
    slots: {
      wrapper:
        "pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-muted-foreground shadow-[0_0_0_1px_#ffffff10]",
      tail: "pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-muted-foreground to-transparent",
    },
  });
</script>
```

<!-- /automd -->

::
:::

## Usage

### Basic

We can add the `UiMeteors` component to trigger the meteors.

::ShowCase

:DocsMeteors

#code

<!-- automd:file src="../../app/components/content/Docs/Meteors/DocsMeteors.vue" code lang="vue" -->

```vue [DocsMeteors.vue]
<template>
  <div
    class="relative mx-auto flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl"
  >
    <UiMeteors :number="30" />
    <p
      class="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white"
    >
      Meteors
    </p>
  </div>
</template>
```

<!-- /automd -->

::
