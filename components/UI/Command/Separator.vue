<template>
  <ComboboxSeparator :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </ComboboxSeparator>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();
  const styles = tv({
    base: "-mx-1 h-px bg-border",
  });
</script>
