<template>
  <RadioGroupRoot
    :as-child="asChild"
    :default-value="defaultValue"
    :disabled="disabled"
    :dir="dir"
    :loop="loop || true"
    :name="name"
    :orientation="orientation"
    :required="required"
    :model-value="modelValue"
    @update:model-value="emits('update:modelValue', $event)"
    :class="styles({ class: props.class })"
  >
    <slot></slot>
  </RadioGroupRoot>
</template>

<script lang="ts" setup>
  import { type RadioGroupRootEmits, type RadioGroupRootProps } from "radix-vue/dist/RadioGroup";

  const props = withDefaults(
    defineProps<{
      modelValue?: RadioGroupRootProps["modelValue"];
      defaultValue?: RadioGroupRootProps["defaultValue"];
      disabled?: RadioGroupRootProps["disabled"];
      name?: RadioGroupRootProps["name"];
      required?: RadioGroupRootProps["required"];
      orientation?: RadioGroupRootProps["orientation"];
      dir?: RadioGroupRootProps["dir"];
      loop?: RadioGroupRootProps["loop"];
      asChild?: RadioGroupRootProps["asChild"];
      class?: any;
    }>(),
    {
      orientation: "vertical",
    }
  );

  const emits = defineEmits<{
    "update:modelValue": RadioGroupRootEmits["update:modelValue"];
  }>();

  const styles = tv({ base: "grid gap-3" });
</script>
