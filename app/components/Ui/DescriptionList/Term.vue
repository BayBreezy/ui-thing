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
    base: "border-t pt-3 text-muted-foreground first:border-none sm:py-3",
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<DescriptionDetailsProps>(), {
    as: "dt",
  });
</script>
