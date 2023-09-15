<template>
  <ComboboxCancel :as-child="asChild">
    <slot></slot>
  </ComboboxCancel>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
