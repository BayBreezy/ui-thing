<template>
  <PopoverRoot v-model:open="localModel" :default-open="defaultOpen" :modal="modal">
    <slot></slot>
  </PopoverRoot>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    defaultOpen?: boolean;
    modelValue?: boolean;
    modal?: boolean;
  }>();

  const emits = defineEmits<{
    "update:modelValue": [boolean];
  }>();

  const localModel = useVModel(props, "modelValue", emits);
</script>
