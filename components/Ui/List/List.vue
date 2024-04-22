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
      as: "ul",
    }
  );

  const styles = tv({
    base: "w-full py-2",
  });
</script>
