<template>
  <Primitive :class="styles({ class: props.class })" v-bind="props">
    <slot></slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        class?: any;
      }
    >(),
    {
      as: "div",
    }
  );

  const styles = tv({
    base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
  });
</script>
