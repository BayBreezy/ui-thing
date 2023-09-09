<template>
  <ClientOnly>
    <VCalendar :is-dark="isDark" v-bind="$attrs">
      <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
    </VCalendar>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { Calendar } from "v-calendar";

  const isDark = useDark();

  defineOptions({ inheritAttrs: false });

  interface Props extends /* @vue-ignore */ Partial<InstanceType<typeof Calendar>["$props"]> {}

  defineProps<Props>();
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
    --vc-popover-content-color: theme("colors.muted.foreground");
    --vc-popover-content-bg: theme("colors.background");
    --vc-popover-content-border: theme("colors.border");

    --vc-nav-item-active-color: theme("colors.primary.foreground");
    --vc-nav-item-active-bg: theme("colors.primary.DEFAULT");

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
</style>
