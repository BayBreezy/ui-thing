<template>
  <StepperRoot v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </StepperRoot>
</template>

<script lang="ts" setup>
  import { StepperRoot, useForwardPropsEmits } from "radix-vue";
  import type { StepperRootEmits, StepperRootProps } from "radix-vue";

  const props = defineProps<StepperRootProps>();
  const emit = defineEmits<StepperRootEmits>();
  const forwarded = useForwardPropsEmits(props, emit);
</script>
