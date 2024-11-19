<template>
  <div data-sidebar="header" :class="sideBarHeaderStyles({ class: props.class })">
    <slot />
  </div>
</template>
<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export const sideBarHeaderStyles = tv({
    base: "flex flex-col gap-2 p-2",
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
