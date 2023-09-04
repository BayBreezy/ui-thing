<template>
  <AlertDialogTitle :as-child="asChild" :class="styles({ class: props.class })">
    <slot>{{ title }}</slot>
  </AlertDialogTitle>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    title?: string;
    class?: any;
    asChild?: boolean;
  }>();

  const styles = tv({
    base: "text-lg font-semibold",
  });
</script>
