<template>
  <DialogDescription :as-child="asChild" :class="styles({ class: props.class })">
    <slot>{{ description }}</slot>
  </DialogDescription>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
    asChild?: boolean;
    description?: string;
  }>();

  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
