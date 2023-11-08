<template>
  <Primitive :class="styles({ class: props.class })" v-bind="props">
    <slot>{{ title }}</slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue/dist/Primitive/Primitive";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        class?: any;
        title?: string;
      }
    >(),
    {
      as: "p",
    }
  );

  const styles = tv({
    base: "font-semibold",
  });
</script>
