<template>
  <Primitive
    data-slot="timeline-content"
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
    base: "text-sm text-muted-foreground",
  });
  const props = defineProps<
    PrimitiveProps & {
      class?: any;
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));
</script>
