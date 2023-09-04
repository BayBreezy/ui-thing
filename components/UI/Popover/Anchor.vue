<template>
  <PopoverAnchor :as-child="asChild">
    <slot></slot>
  </PopoverAnchor>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
