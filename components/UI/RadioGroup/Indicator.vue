<template>
  <RadioGroupIndicator
    :as-child="asChild"
    :forceMount="forceMount"
    :class="styles({ class: props.class })"
  >
    <slot>
      <Icon :name="icon || 'ph:circle-fill'" class="h-2.5 w-2.5 fill-current text-current" />
    </slot>
  </RadioGroupIndicator>
</template>

<script lang="ts" setup>
  import { RadioGroupIndicatorProps } from "radix-vue/dist/RadioGroup/RadioGroupIndicator";

  const props = defineProps<{
    asChild?: RadioGroupIndicatorProps["asChild"];
    forceMount?: boolean;
    class?: any;
    icon?: string;
  }>();

  const styles = tv({
    base: "flex items-center justify-center",
  });
</script>
