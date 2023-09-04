<template>
  <table :class="styles({ class: props.class })">
    <slot></slot>
  </table>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "w-full caption-bottom text-sm",
  });
</script>
