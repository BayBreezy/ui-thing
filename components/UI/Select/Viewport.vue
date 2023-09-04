<template>
  <SelectViewport :as-child="asChild" :class="styles({ position, class: props.class })">
    <slot></slot>
  </SelectViewport>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    position?: "item-aligned" | "popper";
    class?: any;
  }>();

  const styles = tv({
    base: "p-1",
    variants: {
      position: {
        popper:
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        "item-aligned": "",
      },
    },
  });
</script>
