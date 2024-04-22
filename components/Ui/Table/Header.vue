<template>
  <thead :class="styles({ class: props.class })">
    <slot />
  </thead>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "[&_tr]:border-b",
  });
</script>
