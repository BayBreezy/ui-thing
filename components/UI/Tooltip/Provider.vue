<template>
  <TooltipProvider
    :delay-duration="delayDuration"
    :skip-delay-duration="skipDelayDuration"
    :disable-hoverable-content="disableHoverableContent"
  >
    <slot></slot>
  </TooltipProvider>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    delayDuration?: number;
    skipDelayDuration?: number;
    disableHoverableContent?: boolean;
  }>();
</script>
