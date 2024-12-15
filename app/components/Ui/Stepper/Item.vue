<template>
  <StepperItem v-slot="slotProps" v-bind="props">
    <slot v-bind="slotProps" />
  </StepperItem>
</template>

<script lang="ts" setup>
  import { StepperItem } from "radix-vue";
  import type { StepperItemProps } from "radix-vue";

  const props = defineProps<StepperItemProps>();
</script>
