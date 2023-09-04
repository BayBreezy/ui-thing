<template>
  <SelectLabel :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </SelectLabel>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "py-1.5 pl-8 pr-2 text-sm font-semibold",
  });
</script>
