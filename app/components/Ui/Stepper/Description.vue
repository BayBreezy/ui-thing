<template>
  <StepperDescription v-slot="slotProps" v-bind="props">
    <slot v-bind="slotProps" />
  </StepperDescription>
</template>

<script lang="ts" setup>
  import { StepperDescription } from "radix-vue";
  import type { StepperDescriptionProps } from "radix-vue";

  const props = defineProps<StepperDescriptionProps>();
</script>
