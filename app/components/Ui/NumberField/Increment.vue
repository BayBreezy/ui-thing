<template>
  <NumberFieldIncrement
    data-slot="number-field-increment"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <Icon :name="props.icon" />
    </slot>
  </NumberFieldIncrement>
</template>

<script lang="ts" setup>
  import { NumberFieldIncrement, useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { NumberFieldIncrementProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      NumberFieldIncrementProps & {
        class?: HTMLAttributes["class"];
        icon?: string;
      }
    >(),
    { icon: "lucide:plus" }
  );

  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({
    base: "flex h-full shrink-0 items-center justify-center bg-transparent p-3 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  });
</script>
