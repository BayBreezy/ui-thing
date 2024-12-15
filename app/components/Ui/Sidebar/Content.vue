<template>
  <div data-sidebar="content" :class="sideBarContentStyles({ class: props.class })">
    <slot />
  </div>
</template>
<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export const sideBarContentStyles = tv({
    base: "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
  });
</script>
<script setup lang="ts">
  const props = defineProps<{
    /**
     * Additional classes to apply to the sidebar content.
     */
    class?: HTMLAttributes["class"];
  }>();
</script>
