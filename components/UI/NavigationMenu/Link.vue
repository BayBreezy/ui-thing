<template>
  <NavigationMenuLink :as-child="asChild" :active="active" @select="emits('select', $event)">
    <slot></slot>
  </NavigationMenuLink>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    active?: boolean;
  }>();

  const emits = defineEmits<{
    select: [e: Event];
  }>();
</script>
