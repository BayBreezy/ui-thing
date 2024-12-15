<template>
  <AccordionItem v-slot="slotProps" v-bind="forwarded" :class="styles({ class: props.class })">
    <slot v-bind="slotProps" />
  </AccordionItem>
</template>

<script setup lang="ts">
  import { AccordionItem } from "radix-vue";
  import type { AccordionItemProps } from "radix-vue";

  const props = defineProps<
    AccordionItemProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();

  const forwarded = reactiveOmit(props, "class");

  const styles = tv({
    base: "border-b",
  });
</script>
