<template>
  <RadioGroupIndicator v-bind="props" :class="styles({ class: props.class })">
    <slot>
      <Icon :name="icon || 'ph:circle-fill'" class="h-2.5 w-2.5 fill-current text-current" />
    </slot>
  </RadioGroupIndicator>
</template>

<script lang="ts" setup>
  import { RadioGroupIndicator } from "radix-vue";
  import type { RadioGroupIndicatorProps } from "radix-vue";

  const props = defineProps<
    RadioGroupIndicatorProps & {
      class?: any;
      icon?: string;
    }
  >();

  const styles = tv({
    base: "flex items-center justify-center",
  });
</script>
