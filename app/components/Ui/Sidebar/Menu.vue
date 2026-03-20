<template>
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    :class="sideBarMenuStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </ul>
</template>
<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const sideBarMenuStyles = tv({
    base: "flex w-full min-w-0 flex-col gap-1",
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
