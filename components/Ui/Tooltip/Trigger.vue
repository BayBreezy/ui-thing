<template>
  <TooltipTrigger v-bind="props">
    <slot />
  </TooltipTrigger>
</template>

<script lang="ts" setup>
  import { TooltipTrigger } from "radix-vue";
  import type { TooltipTriggerProps } from "radix-vue";

  const props = defineProps<TooltipTriggerProps>();
</script>
