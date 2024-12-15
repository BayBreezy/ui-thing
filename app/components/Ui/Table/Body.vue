<template>
  <tbody :class="styles({ class: props.class })">
    <slot />
  </tbody>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "[&_tr:last-child]:border-0",
  });
</script>
