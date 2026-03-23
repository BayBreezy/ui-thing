<template>
  <svg
    :width="dim.width"
    :height="dim.height"
    :viewBox="`0 0 ${dim.width} ${dim.height}`"
    fill="none"
    v-bind="$attrs"
    :class="styles({ class: normalizeClass(props.class) })"
  >
    <mask
      :id="maskId"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      :width="dim.width"
      :height="dim.height"
    >
      <rect :width="dim.width" :height="dim.height" :fill="`url(#${gradientId})`" />
    </mask>
    <g :mask="`url(#${maskId})`">
      <g :clip-path="`url(#${clipId0})`">
        <g :clip-path="`url(#${clipId1})`">
          <line
            v-for="x in verticalLines"
            :key="x"
            :x1="x"
            :x2="x"
            :y2="dim.height"
            stroke="currentColor"
          />
        </g>
        <rect
          x="0.5"
          y="0.5"
          :width="dim.width - 1"
          :height="dim.height - 1"
          stroke="currentColor"
        />
        <g :clip-path="`url(#${clipId2})`">
          <line
            v-for="y in horizontalLines"
            :key="y"
            :x2="dim.width"
            :y1="y"
            :y2="y"
            stroke="currentColor"
          />
        </g>
        <rect
          x="0.5"
          y="0.5"
          :width="dim.width - 1"
          :height="dim.height - 1"
          stroke="currentColor"
        />
      </g>
    </g>
    <defs>
      <radialGradient
        :id="gradientId"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        :gradientTransform="`translate(${dim.cx} ${dim.cy}) rotate(90) scale(${dim.cx} ${dim.cy})`"
      >
        <stop />
        <stop offset="1" stop-opacity="0" />
      </radialGradient>
      <clipPath :id="clipId0">
        <rect :width="dim.width" :height="dim.height" fill="white" />
      </clipPath>
      <clipPath :id="clipId1">
        <rect :width="dim.width" :height="dim.height" fill="white" />
      </clipPath>
      <clipPath :id="clipId2">
        <rect :width="dim.width" :height="dim.height" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type BgPatternGridSize = "sm" | "md" | "lg";

  export type BgPatternGridProps = {
    /** Additional CSS classes */
    class?: HTMLAttributes["class"];
    /**
     * Size of the pattern
     * @default "lg"
     */
    size?: BgPatternGridSize;
  };

  const dimensions: Record<
    BgPatternGridSize,
    { width: number; height: number; cx: number; cy: number; step: number }
  > = {
    lg: { width: 768, height: 768, cx: 384, cy: 384, step: 48 },
    md: { width: 480, height: 480, cx: 240, cy: 240, step: 32 },
    sm: { width: 336, height: 336, cx: 168, cy: 168, step: 24 },
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<BgPatternGridProps>(), {
    size: "lg",
  });

  const uid = useId();
  const maskId = `bgpattern-grid-mask-${uid}`;
  const gradientId = `bgpattern-grid-gradient-${uid}`;
  const clipId0 = `bgpattern-grid-clip0-${uid}`;
  const clipId1 = `bgpattern-grid-clip1-${uid}`;
  const clipId2 = `bgpattern-grid-clip2-${uid}`;

  const dim = computed(() => dimensions[props.size]);

  const verticalLines = computed(() => {
    const { width, step } = dim.value;
    return Array.from({ length: width / step }, (_, i) => 0.5 + i * step);
  });

  const horizontalLines = computed(() => {
    const { height, step } = dim.value;
    return Array.from({ length: height / step }, (_, i) => step - 0.5 + i * step);
  });

  const styles = tv({
    base: "text-border",
  });
</script>
