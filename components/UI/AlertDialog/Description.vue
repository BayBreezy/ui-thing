<template>
  <AlertDialogDescription :as-child="asChild" :class="styles({ class: props.class })">
    <slot>{{ description }}</slot>
  </AlertDialogDescription>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    description?: string;
    class?: any;
    asChild?: boolean;
  }>();

  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
