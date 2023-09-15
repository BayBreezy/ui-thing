<template>
  <ComboboxRoot
    :defaultValue="defaultValue"
    :modelValue="modelValue"
    :defaultOpen="defaultOpen"
    :open="open"
    :searchTerm="searchTerm"
    :multiple="multiple"
    :dir="dir"
    :name="name"
    :disabled="disabled"
    @update:modelValue="($event) => emits('update:modelValue', $event)"
    @update:open="($event) => emits('update:open', $event)"
    @update:searchTerm="($event) => emits('update:searchTerm', $event)"
  >
    <slot></slot>
  </ComboboxRoot>
</template>

<script lang="ts" setup>
  import { ComboboxRootProps, ComboboxRootEmits } from "radix-vue";
  const props = defineProps<{
    defaultValue?: ComboboxRootProps["defaultValue"];
    modelValue?: ComboboxRootProps["modelValue"];
    defaultOpen?: ComboboxRootProps["defaultOpen"];
    open?: ComboboxRootProps["open"];
    searchTerm?: ComboboxRootProps["searchTerm"];
    multiple?: ComboboxRootProps["multiple"];
    dir?: ComboboxRootProps["dir"];
    name?: ComboboxRootProps["name"];
    disabled?: ComboboxRootProps["disabled"];
  }>();

  const emits = defineEmits<{
    "update:modelValue": ComboboxRootEmits["update:modelValue"];
    "update:open": ComboboxRootEmits["update:open"];
    "update:searchTerm": ComboboxRootEmits["update:searchTerm"];
  }>();
</script>
