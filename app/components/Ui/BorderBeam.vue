<template>
  <div
    class="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
  >
    <motion.div
      :class="styles({ class: normalizeClass(props.class) || undefined })"
      :style="
        {
          width: `${size}px`,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          ...style,
        } as MotionStyle
      "
      :initial="{ offsetDistance: `${initialOffset}%` }"
      :animate="{
        offsetDistance: reverse
          ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
          : [`${initialOffset}%`, `${100 + initialOffset}%`],
      }"
      :transition="{
        repeat: Infinity,
        ease: 'linear',
        duration,
        delay: -delay,
        ...transition,
      }"
    />
  </div>
</template>

<script lang="ts">
  import { motion } from "motion-v";
  import type { MotionStyle, Transition } from "motion-v";
  import { normalizeClass } from "vue";
  import type { CSSProperties, HTMLAttributes } from "vue";

  interface BorderBeamProps {
    /**
     * The size of the border beam.
     */
    size?: number;
    /**
     * The duration of the border beam.
     */
    duration?: number;
    /**
     * The delay of the border beam.
     */
    delay?: number;
    /**
     * The color of the border beam from.
     */
    colorFrom?: string;
    /**
     * The color of the border beam to.
     */
    colorTo?: string;
    /**
     * The motion transition of the border beam.
     */
    transition?: Transition;
    /**
     * The class name of the border beam.
     */
    class?: HTMLAttributes["class"];
    /**
     * The style of the border beam.
     */
    style?: CSSProperties;
    /**
     * Whether to reverse the animation direction.
     */
    reverse?: boolean;
    /**
     * The initial offset position (0-100).
     */
    initialOffset?: number;
  }
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<BorderBeamProps>(), {
    size: 50,
    delay: 0,
    duration: 6,
    colorFrom: "#ffaa40",
    colorTo: "#9c40ff",
    reverse: false,
    initialOffset: 0,
  });

  const styles = tv({
    base: "absolute aspect-square bg-linear-to-l from-(--color-from) via-(--color-to) to-transparent",
  });
</script>
