<template>
  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">
    <slot>{{ title }}</slot>
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
        /** The title of the component */
        title?: string;
      }
    >(),
    {
      as: "p",
    }
  );
  const forwarded = reactiveOmit(props, "class", "title");
  const styles = tv({
    base: "font-semibold",
  });
</script>
