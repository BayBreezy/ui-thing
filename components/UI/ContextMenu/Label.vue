<template>
  <ContextMenuLabel :as-child="asChild" :class="styles({ inset, class: props.class })">
    <slot>{{ label }}</slot>
  </ContextMenuLabel>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
    inset?: boolean;
    label?: string;
  }>();

  const styles = tv({
    base: "inline-block w-full px-2 py-1.5 text-sm font-semibold text-foreground",
    variants: {
      inset: { true: "pl-8" },
    },
  });
</script>
