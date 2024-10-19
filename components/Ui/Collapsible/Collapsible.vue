<template>
  <CollapsibleRoot v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </CollapsibleRoot>
</template>

<script lang="ts" setup>
  import { CollapsibleRoot, useForwardPropsEmits } from "radix-vue";
  import type { CollapsibleRootEmits, CollapsibleRootProps } from "radix-vue";

  const props = defineProps<CollapsibleRootProps>();

  const emit = defineEmits<CollapsibleRootEmits>();

  const forwarded = useForwardPropsEmits(props, emit);
</script>
