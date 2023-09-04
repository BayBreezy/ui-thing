<template>
  <SelectRoot
    :open="open"
    :defaultOpen="defaultOpen"
    :defaultValue="defaultValue"
    :modelValue="modelValue"
    :orientation="orientation"
    :dir="dir"
    :name="name"
    :autocomplete="autocomplete"
    :disabled="disabled"
    :required="required"
    @update:modelValue="($event) => $emit('update:modelValue', $event)"
    @update:open="($event) => $emit('update:open', $event)"
  >
    <slot></slot>
  </SelectRoot>
</template>

<script lang="ts" setup>
  import { DataOrientation, Direction } from "radix-vue/dist/shared/types";

  const props = withDefaults(
    defineProps<{
      open?: boolean;
      defaultOpen?: boolean;
      defaultValue?: string;
      modelValue?: string;
      orientation?: DataOrientation;
      dir?: Direction;
      name?: string;
      autocomplete?: string;
      disabled?: boolean;
      required?: boolean;
    }>(),
    {}
  );

  const emits = defineEmits<{
    "update:modelValue": [value: string];
    "update:open": [value: boolean];
  }>();
</script>
