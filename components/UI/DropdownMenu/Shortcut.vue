<template>
  <span :class="styles({ class: props.class })">
    <slot />
  </span>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "ml-auto text-xs tracking-widest opacity-60",
  });
</script>
