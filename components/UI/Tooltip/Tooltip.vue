<template>
  <UITooltipProvider v-bind="props">
    <TooltipRoot v-bind="forwarded">
      <slot>
        <slot name="trigger"></slot>
        <slot name="content"></slot>
      </slot>
    </TooltipRoot>
  </UITooltipProvider>
</template>

<script lang="ts" setup>
  import { TooltipRoot, useForwardPropsEmits } from "radix-vue";
  import type { TooltipProviderProps, TooltipRootEmits, TooltipRootProps } from "radix-vue";

  const props = withDefaults(defineProps<TooltipRootProps & TooltipProviderProps>(), {
    delayDuration: 200,
  });

  const emits = defineEmits<TooltipRootEmits>();

  const forwarded = useForwardPropsEmits(props, emits);
</script>
