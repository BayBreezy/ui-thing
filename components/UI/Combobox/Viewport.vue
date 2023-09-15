<template>
  <ComboboxViewport :as-child="asChild">
    <slot></slot>
  </ComboboxViewport>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
