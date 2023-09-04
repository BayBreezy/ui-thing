<template>
  <AccordionHeader :class="styles({ class: props.class })">
    <slot></slot>
  </AccordionHeader>
</template>

<script lang="ts" setup>
  const styles = tv({
    base: "flex",
  });

  const props = defineProps<{
    class?: any;
  }>();
</script>
