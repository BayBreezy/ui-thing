<script lang="ts">
  import { tv, type VariantProps } from "tailwind-variants";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const SIZE_PRESETS = {
    xs: { radius: 8, strokeWidth: 2 },
    sm: { radius: 12, strokeWidth: 2.5 },
    default: { radius: 18, strokeWidth: 3 },
    lg: { radius: 26, strokeWidth: 4 },
    xl: { radius: 36, strokeWidth: 5 },
  } as const;

  export const circularProgressStyles = tv({
    slots: {
      root: "relative inline-flex shrink-0 items-center justify-center",
      indicator: "transition-[stroke-dashoffset] duration-300 ease-out",
      label: "absolute text-center leading-none font-medium tabular-nums",
    },
    variants: {
      size: {
        xs: { label: "text-[7px]" },
        sm: { label: "text-[9px]" },
        default: { label: "text-xs" },
        lg: { label: "text-sm" },
        xl: { label: "text-base" },
      },
      color: {
        default: { indicator: "text-primary" },
        secondary: { indicator: "text-secondary-foreground" },
        destructive: { indicator: "text-destructive" },
        success: { indicator: "text-green-500 dark:text-green-400" },
        warning: { indicator: "text-yellow-500 dark:text-yellow-400" },
      },
      indeterminate: {
        true: { indicator: "transition-none" },
      },
    },
    defaultVariants: {
      size: "default",
      color: "default",
    },
  });

  export type CircularProgressVariants = VariantProps<typeof circularProgressStyles>;
</script>

<script setup lang="ts">
  interface Props {
    /** The radius of the circle in pixels. Overrides the size preset. */
    radius?: number;
    /** The stroke width of the circle. Overrides the size preset. */
    strokeWidth?: number;
    /**
     * The progress value between 0 and 1. Ignored if both currentStep and totalSteps are provided.
     *
     * @default 0
     */
    progress?: number;
    /** The current step (1-indexed). */
    currentStep?: number;
    /** The total number of steps. */
    totalSteps?: number;
    /**
     * The size preset controlling radius, stroke width, and label text size.
     *
     * @default "default"
     */
    size?: CircularProgressVariants["size"];
    /**
     * The color variant of the progress indicator.
     *
     * @default "default"
     */
    color?: CircularProgressVariants["color"];
    /** When true, renders a spinning indeterminate loader with no known progress. */
    indeterminate?: boolean;
    /** When true, displays the current percentage in the center of the circle. */
    showValue?: boolean;
    /** Accessible label for screen readers. */
    ariaLabel?: string;
    /** Custom class(es) to add to the root element. */
    class?: HTMLAttributes["class"];
  }

  const props = withDefaults(defineProps<Props>(), {
    progress: 0,
    size: "default",
    color: "default",
  });

  const resolvedProgress = computed(() => {
    if (props.indeterminate) return 0.75;
    if (props.totalSteps !== undefined && props.currentStep !== undefined) {
      return Math.min(Math.max(props.currentStep / props.totalSteps, 0), 1);
    }
    return Math.min(Math.max(props.progress ?? 0, 0), 1);
  });

  const preset = computed(() => SIZE_PRESETS[props.size ?? "default"]);
  const r = computed(() => props.radius ?? preset.value.radius);
  const sw = computed(() => props.strokeWidth ?? preset.value.strokeWidth);
  const od = computed(() => (r.value + sw.value / 2) * 2);
  const circumference = computed(() => 2 * Math.PI * r.value);
  const strokeDashoffset = computed(
    () => circumference.value - resolvedProgress.value * circumference.value
  );
  const percentageValue = computed(() => Math.round(resolvedProgress.value * 100));

  const variantStyles = computed(() =>
    circularProgressStyles({
      size: props.size,
      color: props.color,
      indeterminate: props.indeterminate,
    })
  );
</script>

<template>
  <div
    data-slot="circular-progress"
    :role="indeterminate ? 'status' : 'progressbar'"
    :aria-valuenow="indeterminate ? undefined : percentageValue"
    :aria-valuemin="indeterminate ? undefined : 0"
    :aria-valuemax="indeterminate ? undefined : 100"
    :aria-label="ariaLabel ?? (indeterminate ? 'Loading' : `${percentageValue}%`)"
    :class="variantStyles.root({ class: normalizeClass(props.class) || undefined })"
  >
    <svg
      data-slot="circular-progress-svg"
      :width="od"
      :height="od"
      :viewBox="`0 0 ${od} ${od}`"
      :class="indeterminate ? 'shrink-0 animate-spin' : 'shrink-0 -rotate-90'"
    >
      <circle
        data-slot="circular-progress-track"
        :cx="od / 2"
        :cy="od / 2"
        :r="r"
        fill="none"
        stroke="currentColor"
        :stroke-width="sw"
        class="text-border"
      />
      <circle
        data-slot="circular-progress-indicator"
        :cx="od / 2"
        :cy="od / 2"
        :r="r"
        fill="none"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
        :stroke-width="sw"
        stroke-linecap="round"
        stroke="currentColor"
        :class="variantStyles.indicator()"
      />
    </svg>
    <span
      v-if="$slots.default || (!indeterminate && showValue)"
      data-slot="circular-progress-label"
      :class="variantStyles.label()"
    >
      <slot>{{ `${percentageValue}%` }}</slot>
    </span>
  </div>
</template>
