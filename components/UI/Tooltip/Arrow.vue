<template>
  <TooltipArrow v-bind="props" />
</template>

<script lang="ts" setup>
  import { TooltipArrow } from "radix-vue";
  import type { TooltipArrowProps } from "radix-vue";

  const props = withDefaults(defineProps<TooltipArrowProps>(), {
    width: 10,
    height: 5,
  });
</script>
