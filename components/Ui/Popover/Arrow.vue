<template>
  <PopoverArrow v-bind="forwarded" />
</template>

<script lang="ts" setup>
  import { PopoverArrow, useForwardProps } from "radix-vue";
  import type { PopoverArrowProps } from "radix-vue/dist/Popover/PopoverArrow";

  const props = withDefaults(defineProps<PopoverArrowProps>(), {
    width: 10,
    height: 5,
  });

  const forwarded = useForwardProps(props);
</script>
