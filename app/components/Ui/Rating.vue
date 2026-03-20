<template>
  <div data-slot="rating" :class="ratingClasses">
    <div class="flex items-center">
      <div
        v-for="(star, index) in props.maxRating"
        :key="star"
        :class="['relative', props.editable ? 'cursor-pointer' : '']"
        @click="handleStarClick(star)"
        @mouseenter="handleStarMouseEnter(star)"
        @mouseleave="handleStarMouseLeave"
      >
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

    <template v-if="showValue">
      <span data-slot="rating-value" :class="valueClasses">
        {{ displayRating?.toFixed(1) }}
      </span>
    </template>
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const ratingStyles = tv({
    slots: {
      rating: "inline-flex items-center",
      star: "",
      value: "w-5 text-muted-foreground",
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
    /**
     * Maximum rating value (number of stars to show)
     */
    maxRating?: number;
    /**
     * Additional classes to apply to the wrapper element.
     */
    class?: HTMLAttributes["class"];
    /**
     * Class name for the value span
     */
    valueClassName?: HTMLAttributes["class"];
    /**
     * Class name for the empty star icon
     */
    emptyIconClassName?: HTMLAttributes["class"];
    /**
     * Class name for the filled star icon
     */
    filledIconClassName?: HTMLAttributes["class"];
    /**
     * Size of the rating component
     * @default "md"
     */
    size?: VariantProps<typeof ratingStyles>["size"];
    /**
     * Whether to show the numeric rating value
     * @default false
     */
    showValue?: boolean;
    /**
     * Whether the rating is editable (clickable)
     * @default false
     */
    editable?: boolean;
    /**
     * Callback function called when rating changes
     */
    onRatingChange?: (rating: number) => void;
    /**
     * Name of the icon to use for the stars (defaults to a star icon)
     * @default "lucide:star"
     */
    icon?: string;
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<RatingProps>(), {
    maxRating: 5,
    size: "md",
    showValue: false,
    editable: false,
    icon: "lucide:star",
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

  // Pre-calculate star widths for better performance
  const starWidths = computed(() => {
    const rating = displayRating.value;
    return Array.from({ length: props.maxRating }, (_, i) => {
      const star = i + 1;
      if (rating >= star) return "100%";
      if (rating > star - 1 && rating < star) return `${(rating - (star - 1)) * 100}%`;
      return "0%";
    });
  });

  const handleStarClick = (starRating: number) => {
    if (props.editable) {
      props.onRatingChange?.(starRating);
      emit("ratingChange", starRating);
      modelValue.value = starRating;
    }
  };

  const handleStarMouseEnter = (starRating: number) => {
    if (props.editable) {
      hoveredRating.value = starRating;
      emit("starHover", starRating);
    }
  };

  const handleStarMouseLeave = () => {
    if (props.editable) {
      hoveredRating.value = null;
      emit("starHover", null);
    }
  };

  defineExpose({ displayRating, starWidths, modelValue });
</script>
