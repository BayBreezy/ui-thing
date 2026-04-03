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

This consists of four(4) components

#### Terminal

<!-- automd:file src="../../app/components/Ui/Terminal/Terminal.vue" code lang="vue" -->

```vue [Terminal.vue]
<template>
  <div ref="containerRef" :class="styles({ class: normalizeClass(props.class) || undefined })">
    <div
      class="sticky top-0 left-0 z-10 flex flex-col gap-y-2 border-b border-border bg-background p-4"
    >
      <div class="flex flex-row gap-x-2">
        <div
          v-for="(item, i) in buttonColors"
          :key="i"
          class="size-2 rounded-full"
          :class="[item]"
        />
      </div>
    </div>
    <pre class="p-4"><code class="grid! gap-y-1"><slot /></code></pre>
  </div>
</template>
<script lang="ts">
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type SequenceContextValue = {
    /**
     * Marks the item at the given index as complete in the sequence.
     */
    completeItem: (index: number) => void;
    /**
     * The currently active index in the sequence.
     */
    activeIndex: number;
    /**
     * Whether the sequence has started.
     */
    sequenceStarted: boolean;
  };

  /**
   * Injection key for the sequence context.
   */
  export const SequenceKey = Symbol("sequence") as InjectionKey<
    ComputedRef<SequenceContextValue | null>
  >;
  /**
   * Injection key for the item index within the sequence.
   */
  export const ItemIndexKey = Symbol("itemIndex") as InjectionKey<number | null>;

  const styles = tv({
    base: "relative z-0 size-full max-w-lg overflow-auto rounded-lg border border-border bg-background",
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /**
         * Additional classes for the terminal container.
         */
        class?: HTMLAttributes["class"];
        /**
         * Colors for the terminal control buttons.
         */
        buttonColors?: string[];
        /**
         * Whether to enable sequence mode.
         */
        sequence?: boolean;
        /**
         * Whether to start the terminal animation when it comes into view.
         */
        startOnView?: boolean;
      }
    >(),
    {
      buttonColors: () => ["bg-red-500", "bg-yellow-500", "bg-green-500"],
      sequence: true,
      startOnView: true,
    }
  );

  const containerRef = useTemplateRef("containerRef");
  const activeIndex = ref(0);
  const isInView = ref(false);

  const slots = useSlots();

  // Observe container for startOnView
  if (props.startOnView) {
    useIntersectionObserver(
      containerRef,
      ([entry], observer) => {
        if (entry?.isIntersecting) {
          isInView.value = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
  }

  const sequenceStarted = computed(() =>
    props.sequence ? !props.startOnView || isInView.value : false
  );

  const contextValue = computed<SequenceContextValue | null>(() => {
    if (!props.sequence) return null;
    return {
      completeItem: (index: number) => {
        if (index === activeIndex.value) {
          activeIndex.value++;
        }
      },
      activeIndex: activeIndex.value,
      sequenceStarted: sequenceStarted.value,
    };
  });

  // Provide context if sequence mode is enabled
  if (props.sequence) {
    provide(SequenceKey, contextValue);

    // Provide item index for each child
    if (slots.default) {
      const children = slots.default();
      children.forEach((child, index) => {
        // We'll provide the index in the child components instead
      });
    }
  }
</script>
```

<!-- /automd -->

#### TerminalItem

<!-- automd:file src="../../app/components/Ui/Terminal/TerminalItem.vue" code lang="vue" -->

```vue [TerminalItem.vue]
<template>
  <slot />
</template>
<script lang="ts" setup>
  import { ItemIndexKey } from "./Terminal.vue";

  const props = defineProps<{
    index: number;
  }>();

  provide(ItemIndexKey, props.index);
</script>
```

<!-- /automd -->

#### AnimatedSpan

<!-- automd:file src="../../app/components/Ui/Terminal/AnimatedSpan.vue" code lang="vue" -->

```vue [AnimatedSpan.vue]
<template>
  <motion.div
    ref="elementRef"
    :initial="{ opacity: 0, y: -5 }"
    :animate="shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }"
    :transition="{ duration: 0.3, delay: sequence ? 0 : delay / 1000 }"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    @animation-complete="onAnimationComplete"
  >
    <slot>{{ text }}</slot>
  </motion.div>
</template>
<script lang="ts">
  import { motion } from "motion-v";
  import type { MotionProps } from "motion-v";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { SequenceContextValue } from "./Terminal.vue";
  import { ItemIndexKey, SequenceKey } from "./Terminal.vue";

  export interface AnimatedSpanProps extends Omit<MotionProps, "as" | "asChild">, PrimitiveProps {
    /**
     * Additional classes for the animated span.
     */
    class?: HTMLAttributes["class"];
    /**
     * Delay before the animation starts (in milliseconds).
     */
    delay?: number;
    /**
     * Whether to start the animation when the element comes into view.
     */
    startOnView?: boolean;
    /**
     * Optional item index for sequence mode.
     */
    itemIndex?: number;
    /**
     * Text content to display if no slot is provided.
     */
    text?: string;
  }

  const styles = tv({ base: "grid text-sm font-normal tracking-tight" });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AnimatedSpanProps>(), {
    delay: 0,
    startOnView: false,
    as: "div",
  });

  const elementRef = ref<HTMLDivElement | null>(null);
  const isInView = ref(false);
  const hasStarted = ref(false);

  const sequence = inject<ComputedRef<SequenceContextValue | null>>(SequenceKey);
  const providedItemIndex = inject(ItemIndexKey, null);
  const itemIndex = props.itemIndex ?? providedItemIndex;

  // Observe element for startOnView
  if (props.startOnView) {
    useIntersectionObserver(
      elementRef,
      ([entry], observer) => {
        if (entry?.isIntersecting) {
          isInView.value = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
  }

  // Handle sequence-based starting
  watch(
    () => ({
      activeIndex: sequence?.value?.activeIndex,
      sequenceStarted: sequence?.value?.sequenceStarted,
    }),
    ({ activeIndex, sequenceStarted }) => {
      if (!sequence || itemIndex === null) return;
      if (!sequenceStarted) return;
      if (hasStarted.value) return;
      if (activeIndex === itemIndex) {
        hasStarted.value = true;
      }
    },
    { deep: true }
  );

  const shouldAnimate = computed(() => {
    if (sequence?.value) {
      return hasStarted.value;
    }
    return props.startOnView ? isInView.value : true;
  });

  const onAnimationComplete = () => {
    if (!sequence?.value) return;
    if (itemIndex === null) return;
    sequence.value.completeItem(itemIndex);
  };
</script>
```

<!-- /automd -->

#### TypingAnimation

<!-- automd:file src="../../app/components/Ui/Terminal/TypingAnimation.vue" code lang="vue" -->

```vue [TypingAnimation.vue]
<template>
  <component
    :is="Component"
    ref="elementRef"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    {{ displayedText }}
  </component>
</template>
<script lang="ts">
  import type { MotionProps } from "motion-v";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { SequenceContextValue } from "./Terminal.vue";
  import { ItemIndexKey, SequenceKey } from "./Terminal.vue";

  export interface TypingAnimationProps
    extends Omit<MotionProps, "as" | "asChild">, PrimitiveProps {
    /**
     * Text to be typed out in the animation.
     */
    text?: string;
    /**
     * Additional classes for the typing animation component.
     */
    class?: HTMLAttributes["class"];
    /**
     * Duration of typing for each character (in milliseconds).
     */
    duration?: number;
    /**
     * Delay before the typing starts (in milliseconds).
     */
    delay?: number;
    /**
     * Whether to start the typing animation when the element comes into view.
     */
    startOnView?: boolean;
    /**
     * Optional item index for sequence mode.
     */
    itemIndex?: number;
  }

  const styles = tv({
    base: "block text-sm font-normal tracking-tight",
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<TypingAnimationProps>(), {
    duration: 60,
    delay: 0,
    startOnView: true,
    as: "div",
  });

  if (!props.text) {
    console.error("[Terminal - TypingAnimation]: Text prop is required");
  }

  const Component = props.as;
  const elementRef = useTemplateRef<HTMLElement | null>("elementRef");
  const displayedText = ref("");
  const started = ref(false);
  const isInView = ref(false);

  const sequence = inject<ComputedRef<SequenceContextValue | null>>(SequenceKey);
  const providedItemIndex = inject(ItemIndexKey, null);
  const itemIndex = props.itemIndex ?? providedItemIndex;

  let typingInterval: ReturnType<typeof setInterval> | null = null;
  let startTimeout: ReturnType<typeof setTimeout> | null = null;

  // Observe element for startOnView
  if (props.startOnView) {
    useIntersectionObserver(
      elementRef,
      ([entry], observer) => {
        if (entry?.isIntersecting) {
          isInView.value = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
  }

  // Handle starting the typing animation
  watch(
    [
      () => sequence?.value?.activeIndex,
      () => sequence?.value?.sequenceStarted,
      () => isInView.value,
    ],
    () => {
      if (started.value) return;

      // Sequence mode
      if (sequence?.value && itemIndex !== null) {
        if (!sequence.value.sequenceStarted) return;
        if (sequence.value.activeIndex === itemIndex) {
          started.value = true;
        }
        return;
      }

      // Non-sequence mode
      if (!props.startOnView) {
        startTimeout = setTimeout(() => {
          started.value = true;
        }, props.delay);
        return;
      }

      if (!isInView.value) return;

      startTimeout = setTimeout(() => {
        started.value = true;
      }, props.delay);
    },
    { immediate: true, deep: true }
  );

  // Handle typing effect
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
          // Complete sequence item
          if (sequence?.value && itemIndex !== null) {
            sequence.value.completeItem(itemIndex);
          }
        }
      }, props.duration);
    }
  );

  onUnmounted(() => {
    if (startTimeout) clearTimeout(startTimeout);
    if (typingInterval) clearInterval(typingInterval);
  });
</script>
```

<!-- /automd -->

::
:::

## Usage

::ShowCase

:DocsTerminal

#code

<!-- automd:file src="../../app/components/content/Docs/Terminal/DocsTerminal.vue" code lang="vue" -->

```vue [DocsTerminal.vue]
<template>
  <UiTerminal class="mx-auto">
    <UiTerminalItem :index="0">
      <UiTerminalTypingAnimation text="> npx ui-thing@latest init" />
    </UiTerminalItem>

    <UiTerminalItem v-for="(text, i) in texts" :key="i" :index="i + 1">
      <UiTerminalAnimatedSpan class="text-green-500">
        <span>{{ text }}</span>
      </UiTerminalAnimatedSpan>
    </UiTerminalItem>

    <UiTerminalItem :index="texts.length + 1">
      <UiTerminalTypingAnimation
        text="Success! Project initialization completed."
        class="text-muted-foreground"
      />
    </UiTerminalItem>

    <UiTerminalItem :index="texts.length + 2">
      <UiTerminalTypingAnimation text="You may now add components." class="text-muted-foreground" />
    </UiTerminalItem>
  </UiTerminal>
</template>

<script lang="ts" setup>
  const texts = [
    "✔ Which Nuxt version are you using? > Nuxt 4",
    "✔ Which theme do you want to start with? > Zinc",
    "✔ Where is your tailwind.css file located? ... app/assets/css/tailwind.css",
    "✔ Where is your tailwind.config file located? ... tailwind.config.js",
    "✔ Where should your components be stored? ... app/components/Ui",
    "✔ Where should your composables be stored? ... app/composables",
    "✔ Where should your plugins be stored? ... app/plugins",
    "✔ Where should your utils be stored? ... app/utils",
    "✔ Should we just replace component files if they already exist? ... yes",
    "✔ Would you like to use the default filename when adding components? ... yes",
    "✔ Which package manager do you use? > NPM",
  ];
</script>
```

<!-- /automd -->

::
