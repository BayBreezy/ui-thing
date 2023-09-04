<template>
  <SelectScrollDownButton :as-child="asChild">
    <slot> <Icon :name="icon || 'lucide:chevron-down'" class="h-5 w-5" /></slot>
  </SelectScrollDownButton>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    icon?: string;
  }>();
</script>
