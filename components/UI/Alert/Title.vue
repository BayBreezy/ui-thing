<template>
  <Primitive v-bind="props" :class="styles({ class: props.class })">
    <slot>{{ title }}</slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        class?: any;
        title?: string;
      }
    >(),
    { as: "h5" }
  );

  const styles = tv({
    base: "mb-1 font-medium leading-none tracking-tight",
  });
</script>
