<template>
  <CollapsibleRoot
    :as-child="asChild"
    :disabled="disabled"
    :default-open="defaultOpen"
    v-model:open="open"
  >
    <slot></slot>
  </CollapsibleRoot>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    defaultOpen?: boolean;
    open?: boolean;
    disabled?: boolean;
    modelValue?: boolean;
  }>();

  const emit = defineEmits<{
    "update:modelValue": [boolean];
  }>();

  const open = useVModel(props, "modelValue", emit);
</script>
