<template>
  <RadioGroupItem
    :as-child="props.asChild"
    :value="props.value"
    :disabled="props.disabled"
    :required="props.required"
    :class="styles({ class: props.class })"
  >
    <slot>
      <UIRadioGroupIndicator :icon="props.icon" />
    </slot>
  </RadioGroupItem>
</template>

<script lang="ts" setup>
  import { type RadioGroupItemProps } from "radix-vue/dist/RadioGroup/RadioGroupItem";

  const props = defineProps<{
    asChild?: RadioGroupItemProps["asChild"];
    value?: RadioGroupItemProps["value"];
    disabled?: RadioGroupItemProps["disabled"];
    required?: RadioGroupItemProps["required"];
    class?: any;
    icon?: string;
  }>();

  const styles = tv({
    base: "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  });
</script>
