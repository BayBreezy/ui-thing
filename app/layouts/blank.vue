<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  const { data: navigation } = await useAsyncData(
    "navigation",
    () => queryCollectionNavigation("content", ["icon", "label", "links", "layout"]),
    { default: () => [] }
  );

  provide("navigation", navigation);
</script>
