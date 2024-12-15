<template>
  <TooltipProvider v-bind="props">
    <slot />
  </TooltipProvider>
</template>

<script lang="ts" setup>
  import { TooltipProvider } from "radix-vue";
  import type { TooltipProviderProps } from "radix-vue";

  const props = defineProps<TooltipProviderProps>();
</script>
