<template>
  <TooltipPortal v-bind="props">
    <slot />
  </TooltipPortal>
</template>

<script lang="ts" setup>
  import { TooltipPortal } from "radix-vue";
  import type { TooltipPortalProps } from "radix-vue";

  const props = defineProps<TooltipPortalProps>();
</script>
