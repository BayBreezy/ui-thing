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
  import { normalizeClass } from "vue";
  import type { SequenceContextValue } from "./Terminal.vue";
  import type { MotionProps } from "motion-v";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

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
