<template>
  <div :class="styles({ class: props.class })">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  const styles = tv({
    base: "animate-pulse rounded-md bg-muted",
  });
  const props = defineProps<{
    class?: any;
  }>();
</script>
