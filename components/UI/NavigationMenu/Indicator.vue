<template>
  <NavigationMenuIndicator
    :as-child="asChild"
    :forceMount="forceMount"
    :class="styles({ class: props.class })"
  >
    <slot></slot>
    <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuIndicator>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    forceMount?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
  });
</script>
