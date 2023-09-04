<template>
  <AccordionContent :as-child="asChild" :class="styles({ class: props.class })">
    <div class="pb-4 pt-0">
      <slot>{{ content }}</slot>
    </div>
  </AccordionContent>
</template>

<script lang="ts" setup>
  const styles = tv({
    base: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
  });

  const props = defineProps<{
    class?: any;
    content?: any;
    asChild?: boolean;
  }>();
</script>
