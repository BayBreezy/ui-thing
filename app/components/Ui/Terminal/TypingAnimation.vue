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
