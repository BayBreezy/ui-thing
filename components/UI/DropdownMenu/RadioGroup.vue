<template>
  <DropdownMenuRadioGroup :as-child="asChild" v-model="localModel">
    <slot></slot>
  </DropdownMenuRadioGroup>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    modelValue?: any;
  }>();

  const emits = defineEmits<{
    "update:modelValue": [v: any];
  }>();

  const localModel = useVModel(props, "modelValue", emits);
</script>
