<template>
  <div class="absolute left-0 top-full flex justify-center">
    <NavigationMenuViewport
      v-bind="$attrs"
      :as-child="asChild"
      :forceMount="forceMount"
      :class="styles({ class: props.class })"
    />
  </div>
</template>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  const props = defineProps<{
    asChild?: boolean;
    forceMount?: boolean;
    class?: any;
  }>();
  const styles = tv({
    base: "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
  });
</script>
