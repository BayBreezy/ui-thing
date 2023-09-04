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
    base: "flex flex-col space-y-1.5 p-6",
  });
</script>
