<template>
  <TreeVirtualizer v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </TreeVirtualizer>
</template>

<script lang="ts" setup>
  import { TreeVirtualizer, useForwardPropsEmits } from "radix-vue";
  import type { TreeVirtualizerProps } from "radix-vue";

  const props = defineProps<TreeVirtualizerProps>();
  const forwarded = useForwardPropsEmits(props);
</script>
