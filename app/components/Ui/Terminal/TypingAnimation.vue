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
  import { normalizeClass } from "vue";
  import type { SequenceContextValue } from "./Terminal.vue";
  import type { MotionProps } from "motion-v";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

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
