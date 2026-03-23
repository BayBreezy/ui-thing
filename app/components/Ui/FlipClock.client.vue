<template>
  <div
    :class="
      flipClockVariants({
        size: props.size,
        variant: props.variant,
        class: props.class ? normalizeClass(props.class) : undefined,
      })
    "
    aria-live="polite"
  >
    <span class="sr-only absolute">{{ `${time.hours}:${time.minutes}:${time.seconds}` }}</span>

    <template v-if="shouldShowDays">
      <FlipUnit
        v-for="(dayDigit, index) in daysDigits"
        :key="`day-${index}`"
        :digit="dayDigit"
        :size="props.size"
        :variant="props.variant"
      />
      <ClockSeparator :size="props.size" />
    </template>

    <FlipUnit
      v-for="(hourDigit, index) in hoursDigits"
      :key="`hour-${index}`"
      :digit="hourDigit"
      :size="props.size"
      :variant="props.variant"
    />
    <ClockSeparator :size="props.size" />

    <FlipUnit
      v-for="(minuteDigit, index) in minutesDigits"
      :key="`minute-${index}`"
      :digit="minuteDigit"
      :size="props.size"
      :variant="props.variant"
    />
    <ClockSeparator :size="props.size" />

    <FlipUnit
      v-for="(secondDigit, index) in secondsDigits"
      :key="`second-${index}`"
      :digit="secondDigit"
      :size="props.size"
      :variant="props.variant"
    />
  </div>
</template>

<!-- eslint-disable vue/one-component-per-file -->
<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes, PropType } from "vue";

  type FlipClockVariants = VariantProps<typeof flipClockVariants>;
  type FlipUnitVariants = VariantProps<typeof flipUnitVariants>;
  type FlipClockSize = NonNullable<FlipClockVariants["size"]>;

  interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  const flipUnitVariants = tv({
    base: "relative overflow-hidden rounded-md subpixel-antialiased perspective-[1000px]",
    variants: {
      size: {
        sm: "h-14 w-10 min-w-10 text-3xl",
        md: "h-20 w-14 min-w-14 text-5xl",
        lg: "h-24 w-17 min-w-17 text-6xl",
        xl: "h-32 w-22 min-w-22 text-8xl",
      },
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background text-foreground",
        muted: "bg-muted text-muted-foreground",
        red: "bg-red-500 text-white",
        orange: "bg-orange-500 text-white",
        amber: "bg-amber-400 text-black",
        yellow: "bg-yellow-300 text-black",
        lime: "bg-lime-300 text-black",
        green: "bg-green-500 text-white",
        emerald: "bg-emerald-500 text-white",
        teal: "bg-teal-500 text-white",
        cyan: "bg-cyan-500 text-white",
        sky: "bg-sky-500 text-white",
        blue: "bg-blue-500 text-white",
        indigo: "bg-indigo-500 text-white",
        violet: "bg-violet-500 text-white",
        purple: "bg-purple-500 text-white",
        fuchsia: "bg-fuchsia-500 text-white",
        pink: "bg-pink-500 text-white",
        rose: "bg-rose-500 text-white",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  });

  const flipClockVariants = tv({
    base: "relative flex items-center justify-center font-mono font-medium",
    variants: {
      size: {
        sm: "space-x-1 text-3xl",
        md: "space-x-2 text-5xl",
        lg: "space-x-2 text-6xl",
        xl: "space-x-3 text-8xl",
      },
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        outline: "",
        muted: "",
        red: "text-red-500",
        orange: "text-orange-500",
        amber: "text-amber-500",
        yellow: "text-yellow-500",
        lime: "text-lime-500",
        green: "text-green-500",
        emerald: "text-emerald-500",
        teal: "text-teal-500",
        cyan: "text-cyan-500",
        sky: "text-sky-500",
        blue: "text-blue-500",
        indigo: "text-indigo-500",
        violet: "text-violet-500",
        purple: "text-purple-500",
        fuchsia: "text-fuchsia-500",
        pink: "text-pink-500",
        rose: "text-rose-500",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  });

  const heightMap: Record<FlipClockSize, string> = {
    sm: "text-4xl",
    md: "text-5xl",
    lg: "text-6xl",
    xl: "text-8xl",
  };

  const props = withDefaults(
    defineProps<{
      /**
       * If true, the clock will count down to the target date.
       *
       * If false or omitted, the clock will show the current time.
       *
       * @default false
       */
      countdown?: boolean;
      /**
       * The target date for the countdown.
       *
       * Can be a Date object, a date string, or a timestamp.
       *
       * If omitted, the countdown will not function.
       */
      targetDate?: Date | string | number;
      /**
       * Controls the display of days in countdown mode.
       *
       * - "auto": Show days only if there are remaining days (default).
       * - "always": Always show days.
       * - "never": Never show days.
       *
       * @default "auto"
       */
      showDays?: "auto" | "always" | "never";
      class?: HTMLAttributes["class"];
      /**
       * Size variant of the flip clock.
       */
      size?: FlipClockVariants["size"];
      /**
       * Color variant of the flip clock.
       */
      variant?: FlipClockVariants["variant"];
    }>(),
    {
      countdown: false,
      showDays: "auto",
    }
  );

  const resolvedTargetDate = computed(() => {
    if (!props.targetDate) return undefined;
    const date = props.targetDate instanceof Date ? props.targetDate : new Date(props.targetDate);
    return Number.isNaN(date.getTime()) ? undefined : date;
  });

  const time = ref<TimeLeft>(getTime(props.countdown, resolvedTargetDate.value));

  useIntervalFn(
    () => {
      const next = getTime(props.countdown, resolvedTargetDate.value);
      if (time.value.seconds === next.seconds && time.value.minutes === next.minutes) return;
      time.value = next;
    },
    250,
    { immediate: true }
  );

  watch(
    () => [props.countdown, resolvedTargetDate.value],
    () => {
      time.value = getTime(props.countdown, resolvedTargetDate.value);
    }
  );

  const daysStr = computed(() => String(time.value.days).padStart(3, "0"));
  const hoursStr = computed(() => String(time.value.hours).padStart(2, "0"));
  const minutesStr = computed(() => String(time.value.minutes).padStart(2, "0"));
  const secondsStr = computed(() => String(time.value.seconds).padStart(2, "0"));

  const daysDigits = computed(() => daysStr.value.split(""));
  const hoursDigits = computed(() => hoursStr.value.split(""));
  const minutesDigits = computed(() => minutesStr.value.split(""));
  const secondsDigits = computed(() => secondsStr.value.split(""));

  const shouldShowDays = computed(
    () =>
      props.countdown &&
      (props.showDays === "always" || (props.showDays === "auto" && time.value.days > 0))
  );

  // Base style shared by all four card halves inside a FlipUnit
  const commonCardStyle = "absolute inset-x-0 overflow-hidden h-1/2 bg-inherit text-inherit";
  const backfaceHidden = { backfaceVisibility: "hidden" as const };

  const DigitSpan = defineComponent({
    name: "DigitSpan",
    props: {
      position: {
        type: String as PropType<"top" | "bottom">,
        default: "top",
      },
    },
    setup(localProps, { slots }) {
      const topOffset = computed(() => (localProps.position === "top" ? "0%" : "-100%"));

      return () =>
        h(
          "span",
          {
            class: "absolute left-0 right-0 w-full flex items-center justify-center h-[200%]",
            style: { top: topOffset.value },
          },
          slots.default?.()
        );
    },
  });

  const FlipUnit = defineComponent({
    name: "FlipUnit",
    props: {
      /** The digit to display in this flip unit. */
      digit: {
        type: [String, Number],
        required: true,
      },
      /**
       * Size variant of the flip unit.
       */
      size: {
        type: String as PropType<FlipUnitVariants["size"]>,
        default: undefined,
      },
      /**
       * Color variant of the flip unit.
       */
      variant: {
        type: String as PropType<FlipUnitVariants["variant"]>,
        default: undefined,
      },
      /**
       * Additional classes to apply to the flip unit.
       */
      class: {
        type: [String, Array, Object] as PropType<HTMLAttributes["class"]>,
        default: undefined,
      },
    },
    setup(localProps) {
      const prevDigit = ref(localProps.digit);
      const flipping = ref(false);
      let timer: ReturnType<typeof setTimeout> | undefined;

      const clear = () => {
        if (timer) clearTimeout(timer);
        timer = undefined;
      };

      watch(
        () => localProps.digit,
        (next, prev) => {
          if (next === prev) return;
          flipping.value = true;
          clear();
          timer = setTimeout(() => {
            flipping.value = false;
            prevDigit.value = next;
          }, 550);
        }
      );

      onBeforeUnmount(clear);

      const unitClass = computed(() =>
        flipUnitVariants({
          size: localProps.size,
          variant: localProps.variant,
          class: normalizeClass(localProps.class),
        })
      );

      return () =>
        h(
          "div",
          { class: normalizeClass(unitClass.value), style: { transformStyle: "preserve-3d" } },
          [
            // 1. Background Top — new digit, top half, always visible
            h("div", { class: `${commonCardStyle} top-0 rounded-t-lg` }, [
              h(DigitSpan, { position: "top" }, { default: () => localProps.digit }),
            ]),
            // 2. Background Bottom — old digit, bottom half, always visible
            // Using top-1/2 instead of translate-y-full so the transform axis is uncontested
            h("div", { class: `${commonCardStyle} top-1/2 rounded-b-lg` }, [
              h(DigitSpan, { position: "bottom" }, { default: () => prevDigit.value }),
            ]),
            // 3. Top Flap — old digit falling away (0deg → -90deg)
            h(
              "div",
              {
                class: `${commonCardStyle} top-0 z-20 origin-bottom rounded-t-lg ${
                  flipping.value ? "animate-flip-top" : ""
                }`,
                style: backfaceHidden,
              },
              [h(DigitSpan, { position: "top" }, { default: () => prevDigit.value })]
            ),
            // 4. Bottom Flap — new digit arriving (90deg → 0deg)
            // Positioned with top-1/2 so transform is solely the rotation.
            // flip-bottom-initial holds rotateX(90deg) when idle; animation takes over when flipping.
            h(
              "div",
              {
                class: `${commonCardStyle} top-1/2 z-10 origin-top rounded-b-lg ${
                  flipping.value ? "animate-flip-bottom" : "flip-bottom-initial"
                }`,
                style: backfaceHidden,
              },
              [h(DigitSpan, { position: "bottom" }, { default: () => localProps.digit })]
            ),
            // Center divider line
            h("div", {
              class: "absolute top-1/2 left-0 z-30 h-px w-full -translate-y-1/2 bg-background/50",
            }),
          ]
        );
    },
  });

  const ClockSeparator = defineComponent({
    name: "ClockSeparator",
    props: {
      /**
       * Size variant of the clock separator.
       */
      size: {
        type: String as PropType<FlipClockVariants["size"]>,
        default: "md",
      },
    },
    setup(localProps) {
      const separatorClass = computed(
        () =>
          `text-center -translate-y-[8%] ${heightMap[(localProps.size as FlipClockSize) ?? "md"]}`
      );

      return () => h("span", { class: normalizeClass(separatorClass.value) }, ":");
    },
  });

  function getTime(countdown: boolean, targetDate?: Date): TimeLeft {
    const now = new Date();

    if (!countdown) {
      return {
        days: 0,
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      };
    }

    if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const diff = Math.max(0, targetDate.getTime() - now.getTime());

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }
</script>

<style>
  /* Initial resting state for the bottom flap — hidden at 90° until a flip begins.
     Using a CSS class (not an inline style) prevents the transform from conflicting
     with the animation that takes over once flipping is true. */
  .flip-bottom-initial {
    transform: rotateX(90deg);
  }

  .animate-flip-top {
    animation: flip-top-anim 0.6s ease-in forwards;
  }

  .animate-flip-bottom {
    animation: flip-bottom-anim 0.6s ease-out forwards;
  }

  @keyframes flip-top-anim {
    0% {
      transform: rotateX(0deg);
      z-index: 30;
    }
    50%,
    100% {
      transform: rotateX(-90deg);
      z-index: 10;
    }
  }

  @keyframes flip-bottom-anim {
    0%,
    50% {
      transform: rotateX(90deg);
      z-index: 10;
    }
    100% {
      transform: rotateX(0deg);
      z-index: 30;
    }
  }
</style>
