<template>
  <ClientOnly>
    <VDatePicker
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

  // @ts-expect-error - This is a hacky way to get the props from the Calendar and DatePicker components
  interface Props
    extends /* @vue-ignore */ Partial<InstanceType<typeof Calendar>["$props"]>,
      /* @vue-ignore */ Omit<Partial<InstanceType<typeof DatePicker>["$props"]>, "attributes"> {}

  const props = defineProps<Props & { trimWeeks?: boolean }>();
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
    --vc-bg: theme("colors.background");
    --vc-border: theme("colors.border");
    --vc-focus-ring: 0 0 0 3px hsl(var(--primary) / 30%);
    --vc-weekday-color: theme("colors.muted.foreground");
    --vc-popover-content-color: theme("colors.popover.foreground");
    --vc-hover-bg: theme("colors.accent.DEFAULT");
    --vc-popover-content-bg: theme("colors.popover.DEFAULT");
    --vc-popover-content-border: theme("colors.border");
    --vc-header-arrow-hover-bg: theme("colors.accent.DEFAULT");
    --vc-weeknumber-color: theme("colors.muted.foreground");
    --vc-nav-hover-bg: theme("colors.accent.DEFAULT");
    --vc-time-year-color: theme("colors.foreground");
    --vc-time-weekday-color: theme("colors.foreground");
    --vc-time-month-color: theme("colors.foreground");
    --vc-time-day-color: theme("colors.foreground");

    --vc-nav-item-active-color: theme("colors.primary.foreground");
    --vc-nav-item-active-bg: theme("colors.primary.DEFAULT");

    --vc-time-select-group-bg: theme("colors.background");
    --vc-time-select-group-border: theme("colors.border");
    --vc-time-picker-border: theme("colors.border");

    &.vc-attr,
    & .vc-attr {
      --vc-content-color: theme("colors.primary.DEFAULT");
      --vc-highlight-outline-bg: theme("colors.primary.DEFAULT");
      --vc-highlight-outline-border: theme("colors.primary.DEFAULT");
      --vc-highlight-outline-content-color: theme("colors.primary.foreground");
      --vc-highlight-light-bg: var(--vc-accent-200); /* Highlighted color between two dates */
      --vc-highlight-light-content-color: theme("colors.secondary.foreground");
      --vc-highlight-solid-bg: theme("colors.primary.DEFAULT");
      --vc-highlight-solid-content-color: theme("colors.primary.foreground");
    }
  }

  .vc-blue {
    --vc-accent-200: theme("colors.primary.DEFAULT / 20%");
    --vc-accent-400: theme("colors.primary.DEFAULT");
    --vc-accent-500: theme("colors.primary.DEFAULT");
    --vc-accent-600: theme("colors.primary.DEFAULT / 70%");
  }

  .dark {
    .vc-blue {
      --vc-accent-200: theme("colors.primary.DEFAULT / 20%");
      --vc-accent-400: theme("colors.primary.DEFAULT");
      --vc-accent-500: theme("colors.primary.DEFAULT / 70%");
    }
  }
  .vc-header .vc-title {
    @apply font-medium;
  }
  .vc-weekdays {
    @apply my-2 font-normal;
  }
  .vc-day-content,
  .vc-day,
  .vc-highlight {
    @apply h-9 w-9 rounded-md;
  }
  .vc-focus {
    @apply focus-within:shadow-none;
  }
  .vc-day {
    @apply mb-1.5;
  }

  .vc-base-icon {
    @apply h-4 w-4 stroke-1;
  }
  .vc-header .vc-arrow,
  .vc-nav-arrow {
    @apply h-7 w-7 rounded-md;
    border: 1px solid hsl(var(--border));
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
