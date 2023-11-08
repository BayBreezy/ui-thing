<template>
  <p :class="styles({ class: props.class })">
    <slot>{{ title }}</slot>
  </p>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
    title?: string;
  }>();
  const styles = tv({
    base: "font-semibold",
  });
</script>
