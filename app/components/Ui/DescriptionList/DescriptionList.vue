<template>
  <Primitive
    v-bind="reactiveOmit(props, 'class')"
    :class="descriptionListDetailsStyles({ class: props.class })"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  export type DescriptionDetailsProps = PrimitiveProps & {
    class?: any;
  };

  export const descriptionListDetailsStyles = tv({
    base: "grid grid-cols-1 text-base/6 sm:grid-cols-2 sm:text-sm/6",
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<DescriptionDetailsProps>(), {
    as: "dl",
  });
</script>
