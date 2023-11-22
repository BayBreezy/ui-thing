<template>
  <Primitive :class="styles({ class: props.class })" :as="as" :as-child="asChild">
    <slot>
      {{ title }}
    </slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Title to display in the card */
        title?: string;
        /** Custom class(es) to add to the element */
        class?: any;
      }
    >(),
    {
      as: "h3",
    }
  );

  const styles = tv({
    base: "text-xl font-semibold leading-none tracking-tight",
  });
</script>
