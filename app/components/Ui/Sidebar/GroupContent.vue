<template>
  <div
    data-slot="sidebar-group-content"
    data-sidebar="group-content"
    :class="sideBarGroupContentStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </div>
</template>
<script lang="ts">
  import { normalizeClass } from "vue";
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
