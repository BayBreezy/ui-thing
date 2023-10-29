<template>
  <DropdownMenuSub v-bind="forwarded">
    <slot></slot>
  </DropdownMenuSub>
</template>

<script lang="ts" setup>
  import { DropdownMenuSub, useForwardPropsEmits } from "radix-vue";
  import type { DropdownMenuSubEmits, DropdownMenuSubProps } from "radix-vue";

  const props = defineProps<DropdownMenuSubProps>();
  const emits = defineEmits<DropdownMenuSubEmits>();
  const forwarded = useForwardPropsEmits(props, emits);
</script>
