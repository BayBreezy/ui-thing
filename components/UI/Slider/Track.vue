<template>
  <SliderTrack :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </SliderTrack>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",
  });
</script>
