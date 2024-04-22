<template>
  <UiTooltipProvider v-bind="props">
    <TooltipRoot v-bind="{ ...forwarded, ...$attrs }">
      <slot>
        <slot name="trigger" />
        <slot name="content" />
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
