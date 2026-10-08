<template>
  <div data-slot="rating" :class="ratingClasses">
    <!-- Read-only: supports any decimal value (e.g. 4.3) -->
    <div
      v-if="!props.editable"
      role="img"
      :aria-label="`${modelValue} out of ${props.maxRating}`"
      class="flex items-center"
    >
      <div v-for="(star, index) in props.maxRating" :key="star" class="relative">
        <!-- Background star (empty) -->
        <Icon
          v-if="props.icon"
          :name="props.icon"
          data-slot="rating-star-empty"
          :class="emptyStarClasses"
        />
        <!-- Filled star -->
        <div class="absolute inset-0 overflow-hidden" :style="{ width: starWidths[index] }">
          <Icon
            v-if="props.icon"
            :name="props.icon"
            data-slot="rating-star-filled"
            :class="filledStarClasses"
          />
        </div>
      </div>
    </div>

    <!-- Editable: Reka UI Rating (radio group semantics, keyboard, form support) -->
    <RatingRoot
      v-else
      v-slot="{ items }"
      data-slot="rating-root"
      :model-value="modelValue"
      :length="props.maxRating"
      :step="props.step"
      :clearable="props.clearable"
      :disabled="props.disabled"
      :name="props.name"
      :required="props.required"
      :dir="props.dir"
      hoverable
      class="flex items-center data-disabled:cursor-not-allowed data-disabled:opacity-50"
      @update:model-value="handleChange"
      @mouseleave="handleMouseLeave"
    >
      <RatingItem
        v-for="item in items"
        :key="item"
        v-slot="{ steps }"
        :item="item"
        data-slot="rating-item"
        :class="itemClasses"
      >
        <!-- Background star (empty) -->
        <Icon
          v-if="props.icon"
          :name="props.icon"
          data-slot="rating-star-empty"
          :class="emptyStarClasses"
        />
        <RatingItemIndicator
          v-for="value in steps"
          :key="value"
          :step="value"
          data-slot="rating-indicator"
          :aria-label="`${value} out of ${props.maxRating}`"
          :class="indicatorClasses"
          @mouseenter="handleMouseEnter(value)"
        >
          <!-- Filled star -->
          <Icon
            v-if="props.icon"
            :name="props.icon"
            data-slot="rating-star-filled"
            :class="[
              filledStarClasses,
              'opacity-0 group-data-[state=active]/indicator:opacity-100',
            ]"
          />
        </RatingItemIndicator>
      </RatingItem>
    </RatingRoot>

    <template v-if="showValue">
      <span data-slot="rating-value" :class="valueClasses">
        {{ displayRating?.toFixed(1) }}
      </span>
    </template>
  </div>
</template>

<script lang="ts">
  import { RatingItem, RatingItemIndicator, RatingRoot } from "reka-ui";
  import type { RatingRootProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const ratingStyles = tv({
    slots: {
      rating: "inline-flex items-center",
      item: "relative inline-flex",
      indicator:
        "group/indicator focus-visible:ring-ring/50 absolute inset-y-0 left-0 z-(--reka-rating-item-step-z-index) w-(--reka-rating-item-step-width) cursor-pointer overflow-hidden rounded-sm opacity-(--reka-rating-item-step-opacity) outline-none focus-visible:ring-2 data-[disabled]:cursor-not-allowed",
      star: "shrink-0",
      value: "text-muted-foreground w-5",
    },
    variants: {
      size: {
        sm: { rating: "gap-2", star: "size-4", value: "text-xs" },
        md: { rating: "gap-2.5", star: "size-5", value: "text-sm" },
        lg: { rating: "gap-3", star: "size-6", value: "text-base" },
      },
    },
    defaultVariants: {
      size: "md",
    },
  });

  export type RatingProps = {
    /** Maximum rating value (number of stars to show) */
    maxRating?: number;
    /** Additional classes to apply to the wrapper element. */
    class?: HTMLAttributes["class"];
    /** Class name for the value span. */
    valueClassName?: HTMLAttributes["class"];
    /** Class name for the empty star icon. */
    emptyIconClassName?: HTMLAttributes["class"];
    /** Class name for the filled star icon. */
    filledIconClassName?: HTMLAttributes["class"];
    /**
     * Size of the rating component.
     *
     * @default "md"
     */
    size?: VariantProps<typeof ratingStyles>["size"];
    /**
     * Whether to show the numeric rating value.
     *
     * @default false
     */
    showValue?: boolean;
    /**
     * Whether the rating is editable (clickable). When `false` the rating is rendered as a
     * non-interactive image and can display any decimal value.
     *
     * @default false
     */
    editable?: boolean;
    /** Callback function called when rating changes. */
    onRatingChange?: (rating: number) => void;
    /**
     * Name of the icon to use for the stars (defaults to a star icon)
     *
     * @default "lucide:star"
     */
    icon?: string;
    /**
     * Granularity of the editable rating. Use `0.5` for half stars.
     *
     * @default 1
     */
    step?: RatingRootProps["step"];
    /**
     * Whether clicking the current value again resets the rating to `0` (editable only).
     *
     * @default false
     */
    clearable?: RatingRootProps["clearable"];
    /** Prevents interaction while keeping the rating editable-looking (editable only). */
    disabled?: RatingRootProps["disabled"];
    /** Name of the field when used inside a form (editable only). */
    name?: RatingRootProps["name"];
    /** Whether a value is required when used inside a form (editable only). */
    required?: RatingRootProps["required"];
    /** Reading direction of the rating (editable only). */
    dir?: RatingRootProps["dir"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<RatingProps>(), {
    maxRating: 5,
    size: "md",
    showValue: false,
    editable: false,
    icon: "lucide:star",
    step: 1,
  });

  const modelValue = defineModel<number>({ default: 0 });

  if (modelValue.value < 0 || modelValue.value > props.maxRating) {
    console.warn(`Rating value ${modelValue.value} is out of bounds (0 - ${props.maxRating})`);
  }
  if (!props.icon) {
    console.warn(`No icon provided for Rating component, defaulting to 'lucide:star'`);
  }

  const emit = defineEmits<{
    ratingChange: [payload: number];
    starHover: [payload: number | null];
  }>();

  const hoveredRating = ref<number | null>(null);
  const displayRating = computed(() =>
    props.editable && hoveredRating.value !== null ? hoveredRating.value : modelValue.value
  );

  // Memoize style calculations to avoid recalculating on every render
  const ratingClasses = computed(() =>
    ratingStyles().rating({ class: normalizeClass(props.class) || undefined, size: props.size })
  );
  const itemClasses = computed(() => ratingStyles().item({ size: props.size }));
  const indicatorClasses = computed(() => ratingStyles().indicator({ size: props.size }));
  const emptyStarClasses = computed(() =>
    ratingStyles().star({
      class: normalizeClass(["text-muted-foreground/30", props.emptyIconClassName]) || undefined,
      size: props.size,
    })
  );
  const filledStarClasses = computed(() =>
    ratingStyles().star({
      class:
        normalizeClass(["fill-yellow-400 text-yellow-400", props.filledIconClassName]) || undefined,
      size: props.size,
    })
  );
  const valueClasses = computed(() =>
    ratingStyles().value({
      class: normalizeClass(props.valueClassName) || undefined,
      size: props.size,
    })
  );

  // Pre-calculate star widths (read-only path) for better performance
  const starWidths = computed(() => {
    const rating = displayRating.value;
    return Array.from({ length: props.maxRating }, (_, i) => {
      const star = i + 1;
      if (rating >= star) return "100%";
      if (rating > star - 1 && rating < star) return `${(rating - (star - 1)) * 100}%`;
      return "0%";
    });
  });

  // `emit("ratingChange")` also invokes the `onRatingChange` callback prop.
  const handleChange = (rating: number) => {
    modelValue.value = rating;
    emit("ratingChange", rating);
  };

  const handleMouseEnter = (step: number) => {
    hoveredRating.value = step;
    emit("starHover", step);
  };

  const handleMouseLeave = () => {
    hoveredRating.value = null;
    emit("starHover", null);
  };

  defineExpose({ displayRating, starWidths, modelValue });
</script>
