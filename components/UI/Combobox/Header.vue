<template>
  <ComboboxHeader :as-child="asChild">
    <slot></slot>
  </ComboboxHeader>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
