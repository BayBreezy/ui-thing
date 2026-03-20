<template>
  <li
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </li>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const styles = tv({
    base: "group/menu-sub-item relative",
  });

  const props = defineProps<{
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  }>();
</script>
