<template>
  <ul :class="styles({ class: props.class })">
    <slot></slot>
  </ul>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "w-full py-2",
  });
</script>
