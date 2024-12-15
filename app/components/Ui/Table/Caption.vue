<template>
  <caption :class="styles({ class: props.class })">
    <slot />
  </caption>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "mt-4 text-sm text-muted-foreground",
  });
</script>
