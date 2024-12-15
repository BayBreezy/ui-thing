<template>
  <Toaster
    position="top-right"
    :visible-toasts="5"
    rich-colors
    :duration="7000"
    close-button
    :theme="$colorMode.value == 'dark' ? 'dark' : 'light'"
  />
</template>

<script lang="ts" setup>
  import { Toaster } from "vue-sonner";
</script>
<style scoped>
  :deep([data-sonner-toaster][data-theme="dark"]),
  :deep([data-sonner-toaster][data-theme="light"]) {
    --normal-bg: theme("colors.popover.DEFAULT");
    --normal-border: theme("colors.border");
    --normal-text: theme("colors.popover.foreground");
    --border-radius: theme("borderRadius.md");
  }
  :deep([data-sonner-toaster]) {
    @apply font-sans;
  }
  :deep([data-sonner-toast][data-styled="true"]) {
    @apply items-start;
  }
  :deep([data-sonner-toast] [data-icon]) {
    @apply mt-0.5;
  }
  :deep([data-sonner-toast] [data-title]) {
    @apply text-sm font-semibold;
  }
  :deep([data-sonner-toast] [data-description]) {
    @apply text-sm;
  }
  :deep([data-sonner-toast] [data-close-button]) {
    @apply border border-border bg-background text-foreground hover:!border-inherit hover:!bg-inherit hover:!text-accent-foreground;
  }
  :deep([data-sonner-toast] [data-button]) {
    @apply bg-primary text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;
  }
  :deep(.sonner-loading-bar) {
    @apply bg-muted-foreground;
  }
</style>
