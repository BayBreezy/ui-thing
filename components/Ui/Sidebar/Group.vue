<template>
  <div data-sidebar="group" :class="sideBarGroupStyles({ class: props.class })">
    <slot />
  </div>
</template>
<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export const sideBarGroupStyles = tv({
    base: "relative flex w-full min-w-0 flex-col p-2",
  });
</script>
<script setup lang="ts">
  const props = defineProps<{
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  }>();
</script>
