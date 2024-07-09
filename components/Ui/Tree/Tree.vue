<template>
  <TreeRoot v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </TreeRoot>
</template>

<script lang="ts" setup>
  import { TreeRoot, useForwardPropsEmits } from "radix-vue";
  import type { TreeRootEmits, TreeRootProps } from "radix-vue";

  const props = defineProps<TreeRootProps>();
  const emit = defineEmits<TreeRootEmits>();

  const forwarded = useForwardPropsEmits(props, emit);
</script>
