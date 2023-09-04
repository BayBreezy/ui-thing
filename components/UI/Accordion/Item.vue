<template>
  <AccordionItem
    :value="value"
    :as="as"
    :disabled="disabled"
    :asChild="asChild"
    :class="styles({ class: props.class })"
  >
    <slot></slot>
  </AccordionItem>
</template>

<script setup lang="ts">
  import { type AccordionItemProps } from "radix-vue";

  const props = defineProps<{
    value: AccordionItemProps["value"];
    disabled?: AccordionItemProps["disabled"];
    as?: AccordionItemProps["as"];
    asChild?: AccordionItemProps["asChild"];
    class?: any;
  }>();

  const styles = tv({
    base: "border-b",
  });
</script>
