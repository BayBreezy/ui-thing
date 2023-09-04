<template>
  <DialogRoot :default-open="defaultOpen" :modal="modal || true" v-model:open="localOpen">
    <slot></slot>
  </DialogRoot>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    modelValue?: boolean;
    defaultOpen?: boolean;
    modal?: boolean;
  }>();

  const emit = defineEmits<{
    "update:modelValue": [boolean];
  }>();

  const localOpen = useVModel(props, "modelValue", emit);
</script>
