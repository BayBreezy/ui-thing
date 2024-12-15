<template>
  <AccordionHeader v-bind="forwarded" :class="styles({ class: props.class })">
    <slot />
  </AccordionHeader>
</template>

<script lang="ts" setup>
  import { AccordionHeader } from "radix-vue";
  import type { AccordionHeaderProps } from "radix-vue";

  const props = defineProps<
    AccordionHeaderProps & {
      class?: any;
    }
  >();

  const forwarded = reactiveOmit(props, "class");

  const styles = tv({
    base: "flex",
  });
</script>
