<template>
  <RadioGroupItem v-bind="props" :class="styles({ class: props.class })">
    <slot>
      <UIRadioGroupIndicator :icon="props.icon" />
    </slot>
  </RadioGroupItem>
</template>

<script lang="ts" setup>
  import { RadioGroupItem } from "radix-vue";
  import type { RadioGroupItemProps } from "radix-vue";

  const props = defineProps<
    RadioGroupItemProps & {
      class?: any;
      icon?: string;
    }
  >();

  const styles = tv({
    base: "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  });
</script>
