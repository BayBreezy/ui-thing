<template>
  <Primitive
    data-slot="timeline-indicator"
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
    base: "absolute size-4 rounded-full border-2 border-primary/20 group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=horizontal]/timeline:left-0 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:top-0 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-[orientation=vertical]/timeline:-translate-x-1/2 group-data-[completed=true]/timeline-item:border-primary",
  });
  const props = defineProps<
    PrimitiveProps & {
      class?: any;
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));
</script>
