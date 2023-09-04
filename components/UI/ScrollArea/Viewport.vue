<template>
  <ScrollAreaViewport :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </ScrollAreaViewport>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "h-full w-full rounded-[inherit]",
  });
</script>
