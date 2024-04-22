<template>
  <AccordionItem v-bind="reactiveOmit(props, 'class')" :class="styles({ class: props.class })">
    <slot />
  </AccordionItem>
</template>

<script setup lang="ts">
  import { AccordionItem } from "radix-vue";
  import type { AccordionItemProps } from "radix-vue";

  const props = defineProps<
    AccordionItemProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "border-b",
  });
</script>
