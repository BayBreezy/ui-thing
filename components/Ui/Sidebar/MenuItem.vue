<template>
  <li data-sidebar="menu-item" :class="sideBarMenuItemStyles({ class: props.class })">
    <slot />
  </li>
</template>
<script lang="ts">
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
