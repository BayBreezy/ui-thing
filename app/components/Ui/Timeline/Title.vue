<template>
  <Primitive
    data-slot="timeline-title"
    aria-hidden="true"
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive, useForwardProps } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const styles = tv({
    base: "text-sm font-medium",
  });
  const props = defineProps<
    PrimitiveProps & {
      class?: any;
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));
</script>
