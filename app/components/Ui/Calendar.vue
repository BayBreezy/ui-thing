<template>
  <ClientOnly>
    <VCalendar
      v-bind="{ ...forwarded, ...$attrs }"
      ref="calendarRef"
      :attributes="props.attributes"
      :trim-weeks="props.trimWeeks || true"
      :is-dark="$colorMode.value == 'dark'"
    >
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </VCalendar>
  </ClientOnly>
</template>

<script lang="ts">
  import type { Placement } from "@popperjs/core";
  import { reactiveOmit } from "@vueuse/core";
  import { useForwardPropsEmits } from "reka-ui";
  import type { Calendar } from "v-calendar";

  export interface AttributeConfig {
    key?: string | number;
    content?: string | Partial<Content | Profile<Partial<Content>>>;
    highlight?: boolean | string | Partial<Highlight | Profile<Partial<Highlight>>>;
    dot?: boolean | string | Partial<Dot | Profile<Partial<Dot>>>;
    bar?: boolean | string | Partial<Bar | Profile<Partial<Bar>>>;
    popover?: PopoverConfig;
    dates: DateRangeSource[] | DateRangeSource;
    customData?: any;
    order?: number;
  }

  interface Profile<T> {
    start: T;
    base: T;
    end: T;
    startEnd?: T;
  }

  interface Content {
    key: string | number;
    color: string;
    class: string | any[];
    style: Record<string, any>;
  }

  interface Highlight {
    key: string | number;
    color: string;
    class: string | any[];
    style: Record<string, any>;
    contentClass: string | any[];
    contentStyle: Record<string, any>;
    fillMode: "solid" | "light" | "outline";
  }

  interface Dot {
    key: string | number;
    color: string;
    class: string | any[];
    style: Record<string, any>;
  }

  interface Bar {
    key: string | number;
    color: string;
    class: string | any[];
    style: Record<string, any>;
  }

  type PopoverConfig = Partial<{
    label: string;
    customData: any;
    visibility: "click" | "hover" | "hover-focus" | "focus";
    placement: Placement;
    hideIndicator: boolean;
    isInteractive: boolean;
  }>;

  export interface DateRepeatConfig {
    every: RepeatIntervalShort | [number, RepeatInterval];
    until: Date;
    weekdays: SingleOrArray<DayOfWeek>;
    days: SingleOrArray<DayInMonth>;
    weeks: SingleOrArray<WeekInMonth>;
    months: SingleOrArray<MonthInYear>;
    years: SingleOrArray<number>;
    ordinalWeekdays: SingleOrArray<number>;
    on: SingleOrArray<DateRepeatFn | Partial<DateRepeatConfig>>;
  }

  type DateRepeatFn = (dayParts: DayParts) => boolean;

  export interface DayParts {
    dayIndex: number;
    day: number;
    dayFromEnd: number;
    weekday: number;
    weekdayOrdinal: number;
    weekdayOrdinalFromEnd: number;
    week: number;
    weekFromEnd: number;
    weeknumber: number;
    month: number;
    year: number;
    date: Date;
  }

  type SingleOrArray<T> = T | T[];
  type RepeatIntervalShort = "day" | "week" | "month" | "year";
  type RepeatInterval = "days" | "weeks" | "months" | "years";
  type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;
  // -31 to 31
  type DayInMonth =
    | -31
    | -30
    | -29
    | -28
    | -27
    | -26
    | -25
    | -24
    | -23
    | -22
    | -21
    | -20
    | -19
    | -18
    | -17
    | -16
    | -15
    | -14
    | -13
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31;
  type WeekInMonth = -6 | -5 | -4 | -3 | -2 | -1 | 1 | 2 | 3 | 4 | 5 | 6;
  type MonthInYear = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  type DateRangeSource = DateRangeDate | [DateRangeDate, DateRangeDate] | Partial<DateRangeConfig>;

  type DateRangeDate = Date | null | string;

  interface DateRangeConfig {
    start: DateRangeDate;
    end: DateRangeDate;
    span: number;
    repeat?: Partial<DateRepeatConfig>;
  }
</script>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });

  const calendarRef = useTemplateRef("calendarRef");

  interface Props extends /* @vue-ignore */ Partial<InstanceType<typeof Calendar>["$props"]> {}

  const props = defineProps<
    Props & { trimWeeks?: boolean; attributes?: Partial<AttributeConfig> }
  >();

  const forwarded = useForwardPropsEmits(reactiveOmit(props, ["trimWeeks", "attributes"]));
  defineExpose({ calendarRef });
</script>

<style>
  @reference "~/assets/css/tailwind.css";

  :root {
    --vc-font-family: var(--font-sans);
    --vc-rounded-full: var(--radius);
    --vc-font-bold: 500;
    --vc-font-semibold: 600;
    --vc-text-lg: 16px;
  }

  .vc-light,
  .vc-dark {
    --vc-bg: var(--color-background);
    --vc-border: var(--color-border);
    --vc-focus-ring: 0 0 0 3px --alpha(var(--color-primary) / 30%);
    --vc-weekday-color: var(--color-muted-foreground);
    --vc-popover-content-color: var(--color-popover-foreground);
    --vc-hover-bg: var(--color-accent);
    --vc-popover-content-bg: var(--color-popover);
    --vc-popover-content-border: var(--color-border);
    --vc-header-arrow-hover-bg: var(--color-accent);
    --vc-weeknumber-color: var(--color-muted-foreground);
    --vc-nav-hover-bg: var(--color-accent);

    --vc-day-content-disabled-color: --alpha(var(--color-muted-foreground) / 80%);

    --vc-nav-item-active-color: var(--color-primary-foreground);
    --vc-nav-item-active-bg: var(--color-primary);

    &.vc-attr,
    & .vc-attr {
      --vc-content-color: var(--color-primary);
      --vc-highlight-outline-bg: var(--color-primary);
      --vc-highlight-outline-border: var(--color-primary);
      --vc-highlight-outline-content-color: var(--color-primary-foreground);
      --vc-highlight-light-bg: var(--vc-accent-200); /* Highlighted color between two dates */
      --vc-highlight-light-content-color: var(--color-secondary-foreground);
      --vc-highlight-solid-bg: var(--color-primary);
      --vc-highlight-solid-content-color: var(--color-primary-foreground);
    }
  }

  .vc-blue {
    --vc-accent-200: --alpha(var(--color-primary) / 20%);
    --vc-accent-400: var(--color-primary);
    --vc-accent-500: var(--color-primary);
    --vc-accent-600: --alpha(var(--color-primary) / 70%);
  }

  .dark {
    .vc-blue {
      --vc-accent-200: --alpha(var(--color-primary) / 20%);
      --vc-accent-400: var(--color-primary);
      --vc-accent-500: --alpha(var(--color-primary) / 70%);
    }
  }
  .vc-disabled {
    @apply pointer-events-none line-through;
  }
  .vc-header .vc-title {
    @apply text-sm font-medium;
  }
  .vc-weekday {
    @apply rounded-md text-[0.8rem] font-normal text-muted-foreground;
  }
  .vc-weekdays {
    @apply my-2 font-normal;
  }
  .vc-day-content,
  .vc-day,
  .vc-highlight {
    @apply size-9 rounded-md;
  }
  .vc-focus {
    @apply focus-within:shadow-none;
  }
  .vc-day {
    @apply mb-0.5;
  }

  .vc-base-icon {
    @apply size-4 stroke-1;
  }
  .vc-header .vc-arrow,
  .vc-nav-arrow {
    @apply size-7 rounded-md;
    border: 1px solid var(--color-border);
  }
  .vc-header .vc-prev,
  .vc-header .vc-next {
    @apply border;
  }
  .weekday-position-1 .vc-highlights {
    @apply rounded-l-md;
  }
  .weekday-position-7 .vc-highlights {
    @apply rounded-r-md;
  }
  .vc-highlight-bg-light {
    @apply bg-accent;
  }
  .vc-nav-item {
    @apply font-medium;
  }
  .vc-header .vc-title-wrapper {
    @apply decoration-accent-foreground/60 underline-offset-2 hover:underline;
  }
  .vc-highlights + .vc-day-content {
    @apply hover:bg-accent/5;
  }
</style>
