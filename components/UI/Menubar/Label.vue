<template>
  <MenubarLabel :as-child="asChild" :class="styles({ inset, class: props.class })">
    <slot></slot>
  </MenubarLabel>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
    inset?: boolean;
  }>();

  const styles = tv({
    base: "px-2 py-1.5 text-sm font-semibold",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
