<template>
  <CollapsibleRoot v-bind="forwarded">
    <slot />
  </CollapsibleRoot>
</template>

<script lang="ts" setup>
  import { CollapsibleRoot, useForwardPropsEmits } from "radix-vue";
  import type { CollapsibleRootEmits, CollapsibleRootProps } from "radix-vue";

  const props = defineProps<CollapsibleRootProps>();

  const emit = defineEmits<CollapsibleRootEmits>();

  const forwarded = useForwardPropsEmits(props, emit);
</script>
