<template>
  <ul data-sidebar="menu-badge" :class="sideBarMenuSubStyles({ class: props.class })">
    <slot />
  </ul>
</template>

<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export const sideBarMenuSubStyles = tv({
    base: [
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
    ],
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
