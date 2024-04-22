<template>
  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, 'class')">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
      }
    >(),
    {
      as: "div",
    }
  );

  const styles = tv({
    base: "flex flex-col space-y-1.5 text-center sm:text-left",
  });
</script>
