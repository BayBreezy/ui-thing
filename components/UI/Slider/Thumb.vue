<template>
  <SliderThumb :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </SliderThumb>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  });
</script>
