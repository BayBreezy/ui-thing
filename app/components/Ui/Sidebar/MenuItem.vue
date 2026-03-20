<template>
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    :class="sideBarMenuItemStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </li>
</template>
<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const sideBarMenuItemStyles = tv({
    base: "group/menu-item relative",
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
