<template>
  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">
    <slot></slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive, useForwardProps } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue/dist/Primitive/Primitive";

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

  const forwarded = useForwardProps(useOmit(props, ["class"]));

  const styles = tv({
    base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2",
  });
</script>
