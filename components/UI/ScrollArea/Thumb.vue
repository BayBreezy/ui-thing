<template>
  <ScrollAreaThumb :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </ScrollAreaThumb>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "relative flex-1 rounded-full bg-border",
  });
</script>
