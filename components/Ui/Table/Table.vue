<template>
  <table :class="styles({ class: props.class })">
    <slot />
  </table>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "w-full caption-bottom border-collapse text-sm",
  });
</script>
