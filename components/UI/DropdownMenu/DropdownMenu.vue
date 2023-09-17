<template>
  <DropdownMenuRoot
    :open="open"
    :default-open="defaultOpen"
    @update:open="emit('update:open', $event)"
    :modal="modal || true"
    :dir="dir"
  >
    <slot></slot>
  </DropdownMenuRoot>
</template>

<script lang="ts" setup>
  import type { DropdownMenuRootProps } from "radix-vue";
  const props = defineProps<{
    modal?: boolean;
    dir?: DropdownMenuRootProps["dir"];
    defaultOpen?: DropdownMenuRootProps["defaultOpen"];
    open?: DropdownMenuRootProps["open"];
  }>();

  const emit = defineEmits<{
    "update:open": [v: boolean];
  }>();
</script>
