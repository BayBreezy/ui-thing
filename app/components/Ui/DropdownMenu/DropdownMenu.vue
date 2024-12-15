<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>

<script lang="ts" setup>
  import { DropdownMenuRoot, useForwardPropsEmits } from "radix-vue";
  import type { DropdownMenuRootEmits, DropdownMenuRootProps } from "radix-vue";

  const props = defineProps<DropdownMenuRootProps>();

  const emit = defineEmits<DropdownMenuRootEmits>();
  const forwarded = useForwardPropsEmits(props, emit);
</script>
