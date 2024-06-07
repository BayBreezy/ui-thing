<template>
  <NumberFieldRoot
    v-slot="rootSlotProps"
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  >
    <slot v-bind="rootSlotProps">
      <slot name="decrement">
        <UiNumberFieldDecrement />
      </slot>
      <slot name="input">
        <UiNumberFieldInput />
      </slot>
      <slot name="increment">
        <UiNumberFieldIncrement />
      </slot>
    </slot>
  </NumberFieldRoot>
</template>

<script lang="ts" setup>
  import { NumberFieldRoot, useForwardPropsEmits } from "radix-vue";
  import type { NumberFieldRootEmits, NumberFieldRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      NumberFieldRootProps & {
        class?: any;
      }
    >(),
    {}
  );

  const emit = defineEmits<NumberFieldRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit);

  const styles = tv({
    base: "flex h-10 w-full items-center gap-1 rounded-md border border-input bg-background text-base focus-within:border-input focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
  });
</script>
