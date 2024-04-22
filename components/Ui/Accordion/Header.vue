<template>
  <AccordionHeader v-bind="reactiveOmit(props, 'class')" :class="styles({ class: props.class })">
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

  const styles = tv({
    base: "flex",
  });
</script>
