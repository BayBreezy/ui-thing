<template>
  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Custom class(es) to add to parent element */
        class?: any;
      }
    >(),
    {
      as: "div",
    }
  );
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "flex flex-col space-y-2 text-center sm:text-left",
  });
</script>
