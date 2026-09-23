<template>
  <TreeItem
    v-slot="slotProps"
    data-slot="tree-item"
    v-bind="forwarded"
    :value="props.value"
    :level="props.level"
  >
    <slot v-bind="slotProps" />
  </TreeItem>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
  import { TreeItem, useForwardPropsEmits } from "reka-ui";
  import type { TreeItemEmits, TreeItemProps } from "reka-ui";

  const props = defineProps<TreeItemProps<T>>();
  const emit = defineEmits<TreeItemEmits<T>>();

  const forwarded = useForwardPropsEmits(props, emit);
</script>
