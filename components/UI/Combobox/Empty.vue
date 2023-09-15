<template>
  <ComboboxEmpty :as-child="asChild">
    <slot></slot>
  </ComboboxEmpty>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
