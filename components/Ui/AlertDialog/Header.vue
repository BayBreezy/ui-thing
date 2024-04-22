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
        /** Custom class(es) to add to the element */
        class?: any;
      }
    >(),
    {
      as: "div",
      class: undefined,
    }
  );

  const styles = tv({
    base: "flex flex-col gap-2 text-center sm:text-left",
  });
</script>
