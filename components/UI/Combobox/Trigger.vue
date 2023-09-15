<template>
  <ComboboxTrigger :as-child="asChild">
    <slot></slot>
  </ComboboxTrigger>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
  }>();
</script>
