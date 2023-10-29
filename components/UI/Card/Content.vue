<template>
  <Primitive :as="as" :as-child="asChild" :class="styles({ class: props.class })">
    <slot>
      {{ content }}
    </slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue/dist/Primitive/Primitive";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        content?: string;
        class?: any;
      }
    >(),
    { as: "div" }
  );
  const styles = tv({
    base: "p-6 pt-0",
  });
</script>
