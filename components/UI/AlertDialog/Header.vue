<template>
  <div :class="styles({ class: props.class })">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  const styles = tv({
    base: "flex flex-col space-y-2 text-center sm:text-left",
  });

  const props = defineProps<{
    class?: any;
  }>();
</script>
