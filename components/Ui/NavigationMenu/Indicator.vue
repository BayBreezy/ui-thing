<template>
  <NavigationMenuIndicator
    v-bind="reactiveOmit(props, 'class')"
    :class="styles({ class: props.class })"
  >
    <slot />
    <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuIndicator>
</template>

<script lang="ts" setup>
  import { NavigationMenuIndicator } from "radix-vue";
  import type { NavigationMenuIndicatorProps } from "radix-vue";

  const props = defineProps<
    NavigationMenuIndicatorProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();

  const styles = tv({
    base: "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
  });
</script>
