<template>
  <svg
    :width="dimensions[size].width"
    :height="dimensions[size].height"
    :viewBox="`0 0 ${dimensions[size].width} ${dimensions[size].height}`"
    fill="none"
    v-bind="$attrs"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <mask
      :id="maskId"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      :width="dimensions[size].width"
      :height="dimensions[size].height"
    >
      <rect
        :width="dimensions[size].width"
        :height="dimensions[size].height"
        :fill="`url(#${gradientId})`"
      />
    </mask>
    <g :mask="`url(#${maskId})`">
      <circle
        v-for="r in dimensions[size].radii"
        :key="r"
        :cx="dimensions[size].cx"
        :cy="dimensions[size].cy"
        :r="r"
        stroke="currentColor"
      />
    </g>
    <defs>
      <radialGradient
        :id="gradientId"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        :gradientTransform="`translate(${dimensions[size].cx} ${dimensions[size].cy}) rotate(90) scale(${dimensions[size].cx} ${dimensions[size].cy})`"
      >
        <stop />
        <stop offset="1" stop-opacity="0" />
      </radialGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type BgPatternCircleSize = "sm" | "md" | "lg";

  export type BgPatternCircleProps = {
    /** Additional CSS classes */
    class?: HTMLAttributes["class"];
    /**
     * Size of the pattern
     * @default "lg"
     */
    size?: BgPatternCircleSize;
  };

  const dimensions: Record<
    BgPatternCircleSize,
    { width: number; height: number; cx: number; cy: number; radii: number[] }
  > = {
    lg: {
      width: 768,
      height: 768,
      cx: 384,
      cy: 384,
      radii: [47.5, 95.5, 143.5, 191.5, 239.5, 287.5, 335.5, 383.5],
    },
    md: {
      width: 480,
      height: 480,
      cx: 240,
      cy: 240,
      radii: [47.5, 79.5, 111.5, 143.5, 175.5, 207.5, 239.5],
    },
    sm: {
      width: 336,
      height: 336,
      cx: 168,
      cy: 168,
      radii: [47.5, 71.5, 95.5, 119.5, 143.5, 167.5],
    },
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<BgPatternCircleProps>(), {
    size: "lg",
  });

  const uid = useId();
  const maskId = `bgpattern-circle-mask-${uid}`;
  const gradientId = `bgpattern-circle-gradient-${uid}`;

  const styles = tv({
    base: "text-border",
  });
</script>
