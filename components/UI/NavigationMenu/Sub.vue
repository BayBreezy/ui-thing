<template>
  <NavigationMenuSub
    :default-value="defaultValue"
    :model-value="modelValue"
    :orientation="orientation"
    @update:modelValue="emits('update:modelValue', $event)"
  >
    <slot></slot>
  </NavigationMenuSub>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    modelValue?: string;
    defaultValue?: string;
    orientation?: "horizontal" | "vertical";
  }>();

  const emits = defineEmits<{
    "update:modelValue": [value: string];
  }>();
</script>
