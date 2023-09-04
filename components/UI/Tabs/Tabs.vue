<template>
  <TabsRoot
    :default-value="defaultValue"
    :model-value="modelValue"
    :orientation="orientation"
    :dir="dir"
    :activation-mode="activationMode"
    :as-child="asChild"
    @update:modelValue="($event) => $emit('update:modelValue', $event)"
  >
    <slot></slot>
  </TabsRoot>
</template>

<script lang="ts" setup>
  import { DataOrientation, Direction } from "radix-vue/dist/shared/types";

  const props = withDefaults(
    defineProps<{
      defaultValue?: string;
      modelValue?: string;
      orientation?: DataOrientation;
      dir?: Direction;
      activationMode?: "automatic" | "manual";
      asChild?: boolean;
    }>(),
    {}
  );

  const emits = defineEmits<{
    "update:modelValue": [payload: string];
  }>();
</script>
