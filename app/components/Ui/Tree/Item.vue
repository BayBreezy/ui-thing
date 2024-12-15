<template>
  <TreeItem v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </TreeItem>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
  import { TreeItem, useForwardPropsEmits } from "radix-vue";
  import type { TreeItemEmits, TreeItemProps } from "radix-vue";

  const props = defineProps<TreeItemProps<T>>();
  const emit = defineEmits<TreeItemEmits<T>>();

  const forwarded = useForwardPropsEmits(props, emit);
</script>
