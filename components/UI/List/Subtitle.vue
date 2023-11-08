<template>
  <p :class="styles({ class: props.class })">
    <slot>{{ subtitle }}</slot>
  </p>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
    subtitle?: string;
  }>();

  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
