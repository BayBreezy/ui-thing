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
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
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
