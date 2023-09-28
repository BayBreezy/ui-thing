<template>
  <ToastProvider
    :duration="props.duration"
    :label="props.label"
    :swipeDirection="props.swipeDirection"
    :swipeThreshold="props.swipeThreshold"
  >
    <slot></slot>
  </ToastProvider>
</template>

<script lang="ts" setup>
  import { ToastProviderProps } from "radix-vue";

  const props = withDefaults(
    defineProps<{
      duration?: ToastProviderProps["duration"];
      label?: ToastProviderProps["label"];
      swipeDirection?: ToastProviderProps["swipeDirection"];
      swipeThreshold?: ToastProviderProps["swipeThreshold"];
    }>(),
    {
      label: "Notification",
      swipeDirection: "right",
    }
  );
</script>
