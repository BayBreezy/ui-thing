<template>
  <ComboboxItemIndicator :as-child="asChild">
    <slot><Icon :name="icon || 'ph:check'" class="h-4 w-4" /></slot>
  </ComboboxItemIndicator>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    icon?: string;
  }>();
</script>
