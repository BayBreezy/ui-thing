<template>
  <Primitive data-slot="timeline-date" v-bind="forwarded" :class="styles({ class: props.class })">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive, useForwardProps } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const styles = tv({
    base: "mb-1 block text-xs font-medium text-muted-foreground sm:max-sm:group-data-[orientation=vertical]/timeline:h-4",
  });
  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        class?: any;
      }
    >(),
    {
      as: "time",
    }
  );

  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));
</script>
