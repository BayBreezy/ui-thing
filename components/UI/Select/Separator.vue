<template>
  <SelectSeparator :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </SelectSeparator>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "-mx-1 my-1 h-px bg-muted",
  });
</script>
