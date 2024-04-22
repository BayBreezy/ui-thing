<template>
  <ContextMenuGroup v-bind="props">
    <slot />
  </ContextMenuGroup>
</template>

<script lang="ts" setup>
  import { ContextMenuGroup } from "radix-vue";
  import type { ContextMenuGroupProps } from "radix-vue";

  const props = defineProps<ContextMenuGroupProps>();
</script>
