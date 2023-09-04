<template>
  <DropdownMenuSub
    :default-open="defaultOpen"
    :open="open"
    @update:open="emits('update:open', $event)"
  >
    <slot></slot>
  </DropdownMenuSub>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    defaultOpen?: boolean;
    open?: boolean;
  }>();

  const emits = defineEmits<{
    "update:open": [any];
  }>();
</script>
