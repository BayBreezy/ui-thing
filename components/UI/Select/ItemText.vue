<template>
  <SelectItemText :as-child="asChild">
    <slot></slot>
  </SelectItemText>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
