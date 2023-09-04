<template>
  <MenubarRadioGroup :as-child="asChild" v-model="localModel">
    <slot></slot>
  </MenubarRadioGroup>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    modelValue?: string;
  }>();

  const emits = defineEmits<{
    "update:modelValue": [value: string];
  }>();

  const localModel = useVModel(props, "modelValue", emits);
</script>
