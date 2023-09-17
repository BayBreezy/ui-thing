<template>
  <ComboboxEmpty :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </ComboboxEmpty>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "py-6 text-center text-sm",
  });
</script>
