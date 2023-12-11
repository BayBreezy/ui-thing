<template>
  <AccordionContent
    v-bind="reactiveOmit(props, 'content', 'class')"
    :class="styles({ class: props.class })"
  >
    <div class="pb-4 pt-0">
      <slot>{{ content }}</slot>
    </div>
  </AccordionContent>
</template>

<script lang="ts" setup>
  import { AccordionContent } from "radix-vue";
  import type { AccordionContentProps } from "radix-vue";

  const props = defineProps<
    AccordionContentProps & {
      class?: any;
      content?: any;
    }
  >();

  const styles = tv({
    base: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
  });
</script>
