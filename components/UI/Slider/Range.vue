<template>
  <SliderRange :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </SliderRange>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();
  const styles = tv({
    base: "absolute h-full bg-primary",
  });
</script>
