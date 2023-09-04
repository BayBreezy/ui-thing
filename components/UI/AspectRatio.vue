<template>
  <AspectRatio :as-child="asChild" :ratio="ratio">
    <slot />
  </AspectRatio>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      ratio?: number;
      asChild?: boolean;
    }>(),
    {
      ratio: 1,
      asChild: false,
    }
  );
</script>
