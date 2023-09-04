<template>
  <ClientOnly>
    <Command v-bind="$attrs" @select-item="emits('select-item', $event)">
      <slot></slot>
    </Command>
  </ClientOnly>
</template>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  import { Command } from "vue-command-palette";
  const emits = defineEmits<{
    "select-item": [any];
  }>();
</script>

<style>
  [command-root=""] {
    @apply flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground;
  }
</style>
