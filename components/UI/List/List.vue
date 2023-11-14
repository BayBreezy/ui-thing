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
      as: "ul",
    }
  );

  const styles = tv({
    base: "w-full py-2",
  });
</script>
