<template>
  <NumberFieldDecrement v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>
      <Icon :name="props.icon" />
    </slot>
  </NumberFieldDecrement>
</template>

<script lang="ts" setup>
  import { NumberFieldDecrement, useForwardProps } from "radix-vue";
  import type { NumberFieldDecrementProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      NumberFieldDecrementProps & {
        class?: any;
        icon?: string;
      }
    >(),
    { icon: "lucide:minus" }
  );

  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({
    base: "flex h-full shrink-0 items-center justify-center bg-transparent p-3 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  });
</script>
