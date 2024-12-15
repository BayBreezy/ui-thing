<template>
  <Primitive :class="styles({ sticky, class: props.class })" v-bind="forwarded">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive, useForwardProps } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
        /** Whether the navbar should be sticky */
        sticky?: boolean;
      }
    >(),
    {
      as: "header",
    }
  );

  const forwarded = useForwardProps(reactiveOmit(props, "class", "sticky"));

  const styles = tv({
    base: "z-20 border-b bg-background/90 backdrop-blur",
    variants: {
      sticky: {
        true: "sticky top-0",
      },
    },
  });
</script>
