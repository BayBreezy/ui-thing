---
title: Terminal
description: An implementation of the MacOS terminal. Useful for showcasing a command line interface.
---

## Credits

Shout out to [Magic UI](https://magicui.design/docs/components/terminal) for the inspiration. I actually discovered this component while browsing their website.

## Getting Started

:::Steps

::Step

### Add Components

This consists of three components

#### Terminal

<!-- automd:file src="../../app/components/Ui/Terminal/Terminal.vue" code lang="vue" -->

```vue [Terminal.vue]
<template>
  <Primitive :as :as-child :class="styles({ class: props.class })">
    <div class="flex flex-col gap-y-2 border-b border-border p-4">
      <div class="flex flex-row gap-x-2">
        <div
          v-for="(item, i) in buttonColors"
          :key="i"
          class="size-2 rounded-full"
          :class="[item]"
        />
      </div>
    </div>
    <pre class="overflow-auto p-4"><code class="grid gap-y-1 overflow-auto"><slot /></code></pre>
  </Primitive>
</template>
<script lang="ts">
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const styles = tv({
    base: "z-0 h-full max-h-[400px] w-full max-w-lg rounded-lg border border-border bg-background",
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        class?: HTMLAttributes["class"];
        buttonColors?: string[];
      }
    >(),
    {
      buttonColors: () => ["bg-red-500", "bg-yellow-500", "bg-green-500"],
    }
  );
</script>
```

<!-- /automd -->

#### AnimatedSpan

<!-- automd:file src="../../app/components/Ui/Terminal/AnimatedSpan.vue" code lang="vue" -->

```vue [AnimatedSpan.vue]
<template>
  <motion.div
    :initial="{ opacity: 0, y: -5 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.3, delay: delay / 1000 }"
    :class="styles({ class: props.class })"
  >
    <slot />
  </motion.div>
</template>
<script lang="ts">
  import { motion } from "motion-v";
  import type { MotionProps } from "motion-v";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export interface AnimatedSpanProps extends Omit<MotionProps, "as" | "asChild">, PrimitiveProps {
    class?: HTMLAttributes["class"];
    delay?: number;
  }

  const styles = tv({ base: "grid text-sm font-normal tracking-tight" });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AnimatedSpanProps>(), {
    delay: 0,
    as: "span",
  });
</script>
```

<!-- /automd -->

#### TypingAnimation

<!-- automd:file src="../../app/components/Ui/Terminal/TypingAnimation.vue" code lang="vue" -->

```vue [TypingAnimation.vue]
<template>
  <Motion ref="elementRef" :class="styles({ class: props.class })">{{ displayedText }}</Motion>
</template>
<script lang="ts">
  import type { MotionProps } from "motion-v";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export interface TypingAnimationProps
    extends Omit<MotionProps, "as" | "asChild">, PrimitiveProps {
    text?: string;
    class?: HTMLAttributes["class"];
    duration?: number;
    delay?: number;
  }

  const styles = tv({
    base: "text-sm font-normal tracking-tight",
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<TypingAnimationProps>(), {
    duration: 60,
    delay: 0,
    as: "span",
  });

  if (!props.text) {
    createError({
      message: "[Terminal - TypingAnimation]: Text prop is required",
      fatal: false,
      statusCode: 400,
    });
  }

  const displayedText = ref("");
  const started = ref(false);

  let typingInterval: ReturnType<typeof setInterval> | null = null;
  let startTimeout: ReturnType<typeof setTimeout> | null = null;

  onMounted(() => {
    startTimeout = setTimeout(() => {
      started.value = true;
    }, props.delay);
  });

  onUnmounted(() => {
    if (startTimeout) clearTimeout(startTimeout);
    if (typingInterval) clearInterval(typingInterval);
  });

  watch(
    () => started.value,
    (value) => {
      if (!value) return;

      let i = 0;
      typingInterval = setInterval(() => {
        const text = props.text ?? "";
        if (i < text.length) {
          displayedText.value = text.substring(0, i + 1);
          i++;
        } else {
          if (typingInterval) clearInterval(typingInterval);
        }
      }, props.duration);
    }
  );
</script>
```

<!-- /automd -->

::
:::

## Anatomy

```html
<UiTerminal>
  <UiTerminalTypingAnimation>
    <UiTerminalAnimatedSpan>Hello, world!</UiTerminalAnimatedSpan>
    <UiTerminalTypingAnimation>UI Thing is awesome!</UiTerminalTypingAnimation>
  </UiTerminalTypingAnimation>
</UiTerminal>
```

## Usage

::ShowCase

:DocsTerminal

#code

<!-- automd:file src="../../app/components/content/Docs/Terminal/DocsTerminal.vue" code lang="vue" -->

```vue [DocsTerminal.vue]
<template>
  <UiTerminal class="mx-auto">
    <UiTerminalTypingAnimation class="mb-4" text="> npx ui-thing@latest init" />

    <UiTerminalAnimatedSpan
      v-for="(text, i) in texts"
      :key="i"
      :delay="2000 + i * 500"
      class="text-green-500"
    >
      <span>{{ text }}</span>
    </UiTerminalAnimatedSpan>

    <UiTerminalTypingAnimation
      text="Success! Project initialization completed."
      :delay="7000"
      class="mt-4 text-muted-foreground"
    />

    <UiTerminalTypingAnimation
      text="You may now add components."
      :delay="7500"
      class="text-muted-foreground"
    />
  </UiTerminal>
</template>

<script lang="ts" setup>
  const texts = [
    "✔ Which Nuxt version are you using? › Nuxt 4",
    "✔ Which theme do you want to start with? › Zinc",
    "✔ Where is your tailwind.css file located? … app/assets/css/tailwind.css",
    "✔ Where is your tailwind.config file located? … tailwind.config.js",
    "✔ Where should your components be stored? … app/components/Ui",
    "✔ Where should your composables be stored? … app/composables",
    "✔ Where should your plugins be stored? … app/plugins",
    "✔ Where should your utils be stored? … app/utils",
    "✔ Should we just replace component files if they already exist? … yes",
    "✔ Would you like to use the default filename when adding components? … yes",
    "✔ Which package manager do you use? › NPM",
  ];
</script>
```

<!-- /automd -->

::
