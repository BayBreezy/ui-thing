<template>
  <StepperSeparator v-bind="props">
    <slot />
  </StepperSeparator>
</template>

<script lang="ts" setup>
  import { StepperSeparator } from "radix-vue";
  import type { StepperSeparatorProps } from "radix-vue";

  const props = defineProps<StepperSeparatorProps>();
</script>
