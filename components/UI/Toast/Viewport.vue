<template>
  <ToastViewport
    :class="styles({ class: props.class })"
    :asChild="props.asChild"
    :hotkey="props.hotkey"
    :label="props.label"
  >
    <slot></slot>
  </ToastViewport>
</template>

<script lang="ts" setup>
  import { ToastViewportProps } from "radix-vue";

  const props = withDefaults(
    defineProps<{
      asChild?: ToastViewportProps["asChild"];
      hotkey?: ToastViewportProps["hotkey"];
      label?: ToastViewportProps["label"];
      class?: any;
    }>(),
    {}
  );

  const styles = tv({
    base: "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-4 p-4 focus-visible:outline-none sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
  });
</script>
