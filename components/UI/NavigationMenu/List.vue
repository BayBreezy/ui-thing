<template>
  <NavigationMenuList :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </NavigationMenuList>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "group flex flex-1 list-none items-center justify-center space-x-1",
  });
</script>
