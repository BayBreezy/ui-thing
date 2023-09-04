<template>
  <UITooltipProvider
    :delay-duration="delayDuration"
    :skip-delay-duration="skipDelayDuration"
    :disable-hoverable-content="disableHoverableContent"
  >
    <TooltipRoot
      v-model:open="localModel"
      :default-open="defaultOpen"
      :delay-duration="delayDuration"
      :disable-hoverable-content="disableHoverableContent"
    >
      <slot>
        <slot name="trigger"></slot>
        <slot name="content"></slot>
      </slot>
    </TooltipRoot>
  </UITooltipProvider>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      defaultOpen?: boolean;
      modelValue?: boolean;
      delayDuration?: number;
      disableHoverableContent?: boolean;
      skipDelayDuration?: number;
    }>(),
    {
      delayDuration: 200,
    }
  );

  const emits = defineEmits<{
    "update:modelValue": [value: boolean];
  }>();

  const localModel = useVModel(props, "modelValue", emits, { defaultValue: false });
</script>
