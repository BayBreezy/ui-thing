<template>
  <Primitive v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>{{ title }}</slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive, useForwardProps } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue/dist/Primitive/Primitive";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        class?: any;
        title?: string;
      }
    >(),
    { as: "h5" }
  );
  const forwarded = useForwardProps(useOmit(props, ["class", "title"]));

  const styles = tv({
    base: "mb-1 font-medium leading-none tracking-tight",
  });
</script>
