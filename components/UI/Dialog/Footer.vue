<template>
  <div :class="styles({ class: props.class })">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
  });
</script>
