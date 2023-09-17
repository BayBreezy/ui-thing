<template>
  <ComboboxLabel :as-child="asChild" :class="styles({ class: props.class })">
    <slot>{{ label }}</slot>
  </ComboboxLabel>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
    label?: any;
  }>();

  const styles = tv({
    base: "px-2 py-1.5 text-xs font-medium text-muted-foreground",
  });
</script>
