<template>
  <Primitive
    data-slot="timeline-separator"
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
    base: "absolute self-start bg-primary/10 group-last/timeline-item:hidden group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=horizontal]/timeline:h-0.5 group-data-[orientation=vertical]/timeline:h-[calc(100%-1rem-0.25rem)] group-data-[orientation=horizontal]/timeline:w-[calc(100%-1rem-0.25rem)] group-data-[orientation=vertical]/timeline:w-0.5 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-[orientation=horizontal]/timeline:translate-x-[1.125rem] group-data-[orientation=vertical]/timeline:-translate-x-1/2 group-data-[orientation=vertical]/timeline:translate-y-[1.125rem]",
  });
  const props = defineProps<
    PrimitiveProps & {
      class?: any;
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));
</script>
