<template>
  <Primitive :class="styles({ class: props.class })" :as="as" :as-child="asChild">
    <slot> </slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue/dist/Primitive/Primitive";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        class?: any;
      }
    >(),
    { as: "div" }
  );

  const styles = tv({
    base: "flex items-center p-6 pt-0",
  });
</script>
