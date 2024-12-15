<template>
  <div data-sidebar="group-content" :class="sideBarGroupContentStyles({ class: props.class })">
    <slot />
  </div>
</template>
<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export const sideBarGroupContentStyles = tv({
    base: "w-full text-sm",
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
