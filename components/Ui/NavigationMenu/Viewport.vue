<template>
  <div class="absolute left-0 top-full flex justify-center">
    <NavigationMenuViewport
      v-bind="{ ...reactiveOmit(props, 'class'), ...$attrs }"
      :class="styles({ class: props.class })"
    />
  </div>
</template>

<script lang="ts" setup>
  import { NavigationMenuViewport } from "radix-vue";
  import type { NavigationMenuViewportProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });
  const props = defineProps<
    NavigationMenuViewportProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();
  const styles = tv({
    base: "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
  });
</script>
