<template>
  <Primitive :class="styles({ class: props.class })" v-bind="props">
    <slot></slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const styles = tv({
    base: "animate-pulse rounded-md bg-muted",
  });

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
</script>
