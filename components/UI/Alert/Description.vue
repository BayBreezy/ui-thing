<template>
  <Primitive v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>{{ description }}</slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive, useForwardProps } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        class?: any;
        description?: string;
      }
    >(),
    { as: "div" }
  );
  const forwarded = useForwardProps(useOmit(props, ["class", "description"]));

  const styles = tv({
    base: "text-sm [&_p]:leading-relaxed",
  });
</script>
