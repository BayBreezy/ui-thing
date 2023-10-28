<template>
  <AccordionItem v-bind="forwarded" :class="styles({ class: props.class })">
    <slot></slot>
  </AccordionItem>
</template>

<script setup lang="ts">
  import { useForwardProps } from "radix-vue";
  import type { AccordionItemProps } from "radix-vue";

  const props = defineProps<
    AccordionItemProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "border-b",
  });

  const forwarded = useForwardProps(useOmit(props, ["class"]));
</script>
