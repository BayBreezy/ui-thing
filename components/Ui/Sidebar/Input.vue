<template>
  <UiInput data-sidebar="input" :class="sideBarInputStyles({ class: props.class })">
    <slot />
  </UiInput>
</template>

<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export const sideBarInputStyles = tv({
    base: "focus-visible:ring-sidebar-ring h-8 w-full bg-background shadow-none focus-visible:ring-2",
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
