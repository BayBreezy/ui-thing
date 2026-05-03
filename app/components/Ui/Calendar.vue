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
    pointer-events: none;
    text-decoration-line: line-through;
  }
  .vc-header .vc-title {
    font-size: var(--text-sm);
    line-height: var(--text-sm--line-height);
    font-weight: var(--font-weight-medium);
  }
  .vc-weekday {
    border-radius: var(--radius-md);
    font-size: 0.8rem;
    font-weight: var(--font-weight-normal);
    color: var(--color-muted-foreground);
  }
  .vc-weekdays {
    margin-top: calc(var(--spacing) * 2);
    margin-bottom: calc(var(--spacing) * 2);
    font-weight: var(--font-weight-normal);
  }
  .vc-day-content,
  .vc-day,
  .vc-highlight {
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing) * 9);
    border-radius: var(--radius-md);
  }
  .vc-focus:focus-within {
    box-shadow: none;
  }
  .vc-day {
    margin-bottom: calc(var(--spacing) * 0.5);
  }
  .vc-base-icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    stroke-width: 1;
  }
  .vc-header .vc-arrow,
  .vc-nav-arrow {
    width: calc(var(--spacing) * 7);
    height: calc(var(--spacing) * 7);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
  }
  .vc-header .vc-prev,
  .vc-header .vc-next {
    border: 1px solid var(--color-border);
  }
  .weekday-position-1 .vc-highlights {
    border-top-left-radius: var(--radius-md);
    border-bottom-left-radius: var(--radius-md);
  }
  .weekday-position-7 .vc-highlights {
    border-top-right-radius: var(--radius-md);
    border-bottom-right-radius: var(--radius-md);
  }
  .vc-highlight-bg-light {
    background-color: var(--color-accent);
  }
  .vc-nav-item {
    font-weight: var(--font-weight-medium);
  }
  .vc-header .vc-title-wrapper {
    text-decoration-color: color-mix(in oklch, var(--color-accent-foreground) 60%, transparent);
    text-underline-offset: 2px;
  }
  .vc-header .vc-title-wrapper:hover {
    text-decoration-line: underline;
  }
  .vc-highlights + .vc-day-content:hover {
    background-color: color-mix(in oklch, var(--color-accent) 5%, transparent);
  }
</style>
