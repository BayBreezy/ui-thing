<template>
  <MenubarSub :default-open="defaultOpen" :open="open" @update:open="emits('update:open', $event)">
    <slot></slot>
  </MenubarSub>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    defaultOpen?: boolean;
    open?: boolean;
  }>();

  const emits = defineEmits<{
    "update:open": [value: boolean];
  }>();
</script>
