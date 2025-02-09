<template>
  <Primitive
    v-bind="reactiveOmit(props, 'class', 'text')"
    :class="descriptionListDetailsStyles({ class: props.class })"
  >
    <slot>{{ text }}</slot>
  </Primitive>
</template>
<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  export type DescriptionDetailsProps = PrimitiveProps & {
    text?: string;
    class?: any;
  };

  export const descriptionListDetailsStyles = tv({
    base: "pb-3 pt-1 text-foreground sm:border-t sm:py-3 sm:[&:nth-child(2)]:border-none",
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<DescriptionDetailsProps>(), {
    as: "dd",
  });
</script>
