<template>
  <ComboboxSeparator :as-child="asChild">
    <slot></slot>
  </ComboboxSeparator>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
