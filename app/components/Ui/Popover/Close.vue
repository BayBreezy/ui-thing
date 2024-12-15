<template>
  <PopoverClose v-bind="forwarded">
    <slot />
  </PopoverClose>
</template>

<script lang="ts" setup>
  import { PopoverClose, useForwardProps } from "radix-vue";
  import type { PopoverCloseProps } from "radix-vue";

  const props = defineProps<PopoverCloseProps>();
  const forwarded = useForwardProps(props);
</script>
