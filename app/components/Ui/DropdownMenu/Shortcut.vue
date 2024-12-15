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
        /** Custom class(es) to add to the parent */
        class?: any;
      }
    >(),
    {
      as: "span",
    }
  );
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "ml-auto text-xs tracking-widest opacity-60",
  });
</script>
