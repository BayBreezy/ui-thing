<template>
  <div
    ref="containerRef"
    data-slot="pointer-highlight"
    :class="containerStyles({ class: normalizeClass(props.containerClass) || undefined })"
  >
    <div data-slot="pointer-highlight-content" class="relative z-10 w-fit *:m-px">
      <slot />
    </div>

    <motion.div
      v-if="showHighlight"
      data-slot="pointer-highlight-overlay"
      class="pointer-events-none absolute inset-0 z-0"
      :initial="{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
    >
      <motion.div
        data-slot="pointer-highlight-rectangle"
        :class="rectangleStyles({ class: normalizeClass(props.rectangleClass) || undefined })"
        :initial="{ width: 0, height: 0 }"
        :while-in-view="{ width, height }"
        :transition="{ duration: 1, ease: 'easeInOut' }"
      />

      <motion.div
        data-slot="pointer-highlight-pointer"
        class="pointer-events-none absolute"
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1, x: width + 4, y: height + 4 }"
        :style="{ rotate: '-90deg' }"
        :transition="{
          opacity: { duration: 0.1, ease: 'easeInOut' },
          duration: 1,
          ease: 'easeInOut',
        }"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          :class="pointerStyles({ class: normalizeClass(props.pointerClass) || undefined })"
        >
          <path
            d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"
          />
        </svg>
      </motion.div>
    </motion.div>
  </div>
</template>

<script lang="ts" setup>
  import { motion } from "motion-v";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<{
    /**
     * Custom class(es) for the outer container.
     */
    containerClass?: HTMLAttributes["class"];
    /**
     * Custom class(es) for the animated rectangle.
     */
    rectangleClass?: HTMLAttributes["class"];
    /**
     * Custom class(es) for the pointer icon.
     */
    pointerClass?: HTMLAttributes["class"];
  }>();

  const containerRef = useTemplateRef("containerRef");
  const { width, height } = useElementSize(containerRef);

  const showHighlight = computed(() => width.value > 0 && height.value > 0);

  const containerStyles = tv({ base: "relative w-fit" });

  const rectangleStyles = tv({ base: "absolute inset-0 border border-muted-foreground/50" });

  const pointerStyles = tv({ base: "size-5 text-blue-500" });
</script>
