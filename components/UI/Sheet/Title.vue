<template>
  <DialogTitle :as-child="asChild" :class="styles({ class: props.class })">
    <slot>{{ title }}</slot>
  </DialogTitle>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
    asChild?: boolean;
    title?: string;
  }>();

  const styles = tv({
    base: "text-lg font-semibold text-foreground",
  });
</script>
