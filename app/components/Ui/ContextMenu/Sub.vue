<template>
  <ContextMenuSub v-bind="forwarded">
    <slot />
  </ContextMenuSub>
</template>

<script lang="ts" setup>
  import { ContextMenuSub, useForwardPropsEmits } from "radix-vue";
  import type { ContextMenuSubEmits, ContextMenuSubProps } from "radix-vue";

  const props = defineProps<ContextMenuSubProps>();
  const emits = defineEmits<ContextMenuSubEmits>();

  const forwarded = useForwardPropsEmits(props, emits);
</script>
