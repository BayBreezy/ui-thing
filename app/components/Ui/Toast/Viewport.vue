<template>
  <ToastViewport :class="styles({ class: props.class })" v-bind="forwarded">
    <slot />
  </ToastViewport>
</template>

<script lang="ts" setup>
  import { ToastViewport } from "radix-vue";
  import type { ToastViewportProps } from "radix-vue";

  const props = defineProps<
    ToastViewportProps & {
      /**
       * Custom class names to add to the button.
       */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:bottom-auto sm:right-0 sm:flex-col md:max-w-[420px]",
  });
</script>

<style>
  [aria-label~="Notifications"] {
    display: grid;
  }
</style>
