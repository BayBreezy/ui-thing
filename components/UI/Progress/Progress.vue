<template>
  <ProgressRoot
    v-model="localModel"
    :max="max"
    :get-value-label="getValueLabel"
    :as-child="asChild"
    :class="styles({ class: props.class })"
  >
    <slot>
      <UIProgressIndicator :style="{ transform: `translateX(-${100 - (localModel || 0)}%)` }" />
    </slot>
  </ProgressRoot>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    modelValue?: number;
    max?: number;
    getValueLabel?: (value: number, max: number) => string;
    asChild?: boolean;
    class?: any;
  }>();

  const emits = defineEmits<{
    "update:modelValue": [value: number];
  }>();

  const localModel = useVModel(props, "modelValue", emits, { defaultValue: 0 });

  const styles = tv({
    base: "relative h-3 w-full overflow-hidden rounded-full bg-secondary",
  });
</script>
