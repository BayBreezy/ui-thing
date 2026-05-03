<template>
  <UiSeparator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    :class="sideBarSeparatorStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </UiSeparator>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const sideBarSeparatorStyles = tv({
    base: "bg-sidebar-border mx-2 w-auto",
  });
</script>

<script setup lang="ts">
  const props = defineProps<{
    /** Additional classes to apply to the parent element. */
    class?: HTMLAttributes["class"];
  }>();
</script>
