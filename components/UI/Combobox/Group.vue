<template>
  <ComboboxGroup :as-child="asChild">
    <slot></slot>
  </ComboboxGroup>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
