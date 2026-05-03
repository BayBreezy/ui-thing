<template>
  <ClientOnly>
    <VDatePicker
      ref="datepickerRef"
      :trim-weeks="props.trimWeeks || true"
      :is-dark="$colorMode.value == 'dark'"
      v-bind="$attrs"
    >
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </VDatePicker>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import type { Calendar, DatePicker } from "v-calendar";

  defineOptions({ inheritAttrs: false });

  const datepickerRef = useTemplateRef("datepickerRef");

  // @ts-expect-error - This is a hacky way to get the props from the Calendar and DatePicker components
  // prettier-ignore
  interface Props
    extends 
     /* @vue-ignore */ Partial<InstanceType<typeof Calendar>["$props"]>,
      /* @vue-ignore */ Omit<Partial<InstanceType<typeof DatePicker>["$props"]>, "attributes"> {}

  const props = defineProps<Props & { trimWeeks?: boolean }>();
  defineExpose({ datepickerRef });
</script>

<style>
  :root {
    --vc-font-family: var(--font-sans);
    --vc-rounded-full: var(--radius);
    --vc-font-bold: 500;
    --vc-font-semibold: 500;
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
    --vc-time-year-color: var(--color-foreground);
    --vc-time-weekday-color: var(--color-foreground);
    --vc-time-month-color: var(--color-foreground);
    --vc-time-day-color: var(--color-foreground);

    --vc-nav-item-active-color: var(--color-primary-foreground);
    --vc-nav-item-active-bg: var(--color-primary);

    --vc-time-select-group-bg: var(--color-background);
    --vc-time-select-group-border: var(--color-border);
    --vc-time-picker-border: var(--color-border);
    --vc-select-hover-bg: var(--vc-hover-bg);

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
  .vc-weekdays {
    margin: calc(var(--spacing) * 2) 0;
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
  .vc-focus:focus-visible {
    box-shadow: 0 0 0 2px color-mix(in oklch, var(--color-ring) 40%, transparent);
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
  .vc-time-header,
  .vc-time-select-group {
    text-transform: capitalize;
    font-variant-numeric: lining-nums slashed-zero tabular-nums;
  }
  .vc-expanded {
    .vc-day {
      height: 50px;
      width: 100%;
      .vc-day-content,
      .vc-highlight,
      .vc-highlights {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
