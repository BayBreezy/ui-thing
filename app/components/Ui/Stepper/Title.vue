<template>
  <StepperTitle v-bind="props">
    <slot />
  </StepperTitle>
</template>

<script lang="ts" setup>
  import { StepperTitle } from "radix-vue";
  import type { StepperTitleProps } from "radix-vue";

  const props = defineProps<StepperTitleProps>();
</script>
