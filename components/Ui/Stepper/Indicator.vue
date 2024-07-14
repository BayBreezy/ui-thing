<template>
  <StepperIndicator v-bind="props">
    <slot />
  </StepperIndicator>
</template>

<script lang="ts" setup>
  import { StepperIndicator } from "radix-vue";
  import type { StepperIndicatorProps } from "radix-vue";

  const props = defineProps<StepperIndicatorProps>();
</script>
