<template>
  <ComboboxLabel :as-child="asChild">
    <slot></slot>
  </ComboboxLabel>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
