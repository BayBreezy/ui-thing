<template>
  <StepperTrigger v-bind="props">
    <slot />
  </StepperTrigger>
</template>

<script lang="ts" setup>
  import { StepperTrigger } from "radix-vue";
  import type { StepperTriggerProps } from "radix-vue";

  const props = defineProps<StepperTriggerProps>();
</script>
