<template>
  <AccordionHeader v-bind="forwarded" :class="styles({ class: props.class })">
    <slot></slot>
  </AccordionHeader>
</template>

<script lang="ts" setup>
  import { AccordionHeader, useForwardProps } from "radix-vue";
  import type { AccordionHeaderProps } from "radix-vue";

  const styles = tv({
    base: "flex",
  });

  const props = defineProps<
    AccordionHeaderProps & {
      class?: any;
    }
  >();

  const forwarded = useForwardProps(useOmit(props, ["class"]));
</script>
