<template>
  <component :is="props.as" :class="styles({ size, class: props.class })">
    <slot />
  </component>
</template>
<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      as?: string | Record<string, unknown>;
      size?: VariantProps<typeof styles>["size"];
      class?: any;
    }>(),
    {
      as: "kbd",
      size: "sm",
    }
  );

  const styles = tv({
    base: "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted font-sans font-medium",
    variants: {
      size: {
        xs: "h-4 min-h-[16px] px-1 text-[10px]",
        sm: "h-5 min-h-[20px] px-1 text-[11px]",
        md: "h-6 min-h-[24px] px-1.5 text-[12px]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  });
</script>
