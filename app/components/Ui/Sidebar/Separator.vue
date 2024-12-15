<template>
  <UiSeparator data-sidebar="separator" :class="sideBarSeparatorStyles({ class: props.class })">
    <slot />
  </UiSeparator>
</template>

<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export const sideBarSeparatorStyles = tv({
    base: "mx-2 w-auto bg-sidebar-border",
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
