<template>
  <TreeItem v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </TreeItem>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
  import { TreeItem, useForwardPropsEmits } from "radix-vue";
  import type { TreeItemProps } from "radix-vue";

  // Remove this when the type is properly exported from radix-vue
  type TreeItemEmits = {
    /**
     * Event handler called when the selecting item.
     *
     * It can be prevented by calling `event.preventDefault`.
     */
    select: [event: any];
    /**
     * Event handler called when the selecting item.
     *
     * It can be prevented by calling `event.preventDefault`.
     */
    toggle: [event: any];
  };

  const props = defineProps<TreeItemProps<T>>();

  const emit = defineEmits<TreeItemEmits>();

  const forwarded = useForwardPropsEmits(props, emit);
</script>
