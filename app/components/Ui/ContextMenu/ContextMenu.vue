<template>
  <ContextMenuRoot v-bind="forwarded">
    <slot />
  </ContextMenuRoot>
</template>

<script lang="ts" setup>
  import { ContextMenuRoot, useForwardPropsEmits } from "radix-vue";
  import type { ContextMenuRootEmits, ContextMenuRootProps } from "radix-vue";

  const props = defineProps<ContextMenuRootProps>();
  const emit = defineEmits<ContextMenuRootEmits>();
  const forwarded = useForwardPropsEmits(props, emit);
</script>
