<template>
  <AccordionItem v-bind="forwarded" :class="styles({ class: props.class })">
    <slot></slot>
  </AccordionItem>
</template>

<script setup lang="ts">
  import { AccordionItem, useForwardProps } from "radix-vue";
  import type { AccordionItemProps } from "radix-vue";

  const props = defineProps<
    AccordionItemProps & {
      class?: any;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["class"]));

  const styles = tv({
    base: "border-b",
  });
</script>
