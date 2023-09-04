<template>
  <SelectScrollUpButton :as-child="asChild">
    <slot>
      <Icon :name="icon || 'lucide:chevron-up'" class="h-5 w-5" />
    </slot>
  </SelectScrollUpButton>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    icon?: string;
  }>();
</script>
