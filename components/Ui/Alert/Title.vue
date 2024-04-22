<template>
  <Primitive v-bind="reactiveOmit(props, 'class', 'title')" :class="styles({ class: props.class })">
    <slot>{{ title }}</slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Custom class to add to the parent */
        class?: any;
        /** The title text that should be displayed */
        title?: string;
      }
    >(),
    { as: "h5", class: undefined, title: undefined }
  );

  const styles = tv({
    base: "mb-1 font-medium leading-none tracking-tight",
  });
</script>
