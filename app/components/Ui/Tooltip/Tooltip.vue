<template>
  <UiTooltipProvider v-bind="props">
    <TooltipRoot v-slot="slotProps" v-bind="{ ...forwarded, ...$attrs }">
      <slot v-bind="slotProps">
        <slot v-bind="slotProps" name="trigger" />
        <slot v-bind="slotProps" name="content" />
      </slot>
    </TooltipRoot>
  </UiTooltipProvider>
</template>

<script lang="ts" setup>
  import { TooltipRoot, useForwardPropsEmits } from "radix-vue";
  import type { TooltipProviderProps, TooltipRootEmits, TooltipRootProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(defineProps<TooltipRootProps & TooltipProviderProps>(), {
    delayDuration: 200,
  });

  const emits = defineEmits<TooltipRootEmits>();

  const forwarded = useForwardPropsEmits(props, emits);
</script>
