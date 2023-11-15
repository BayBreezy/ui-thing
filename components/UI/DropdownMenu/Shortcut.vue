<template>
  <Primitive :class="styles({ class: props.class })" v-bind="props">
    <slot />
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
      as: "span",
    }
  );

  const styles = tv({
    base: "ml-auto text-xs tracking-widest opacity-60",
  });
</script>
