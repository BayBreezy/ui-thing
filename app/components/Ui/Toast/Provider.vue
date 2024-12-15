<template>
  <ToastProvider v-bind="props">
    <slot />
  </ToastProvider>
</template>

<script lang="ts" setup>
  import { ToastProvider } from "radix-vue";
  import type { ToastProviderProps } from "radix-vue";

  const props = withDefaults(defineProps<ToastProviderProps>(), {
    label: "Notification",
    swipeDirection: "right",
  });
</script>
