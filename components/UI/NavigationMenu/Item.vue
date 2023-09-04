<template>
  <NavigationMenuItem :as-child="asChild" :value="value">
    <slot></slot>
  </NavigationMenuItem>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    value?: string;
  }>();
</script>
