<template>
  <NavigationMenuIndicator
    data-slot="navigation-menu-indicator"
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  >
    <slot />
    <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuIndicator>
</template>

<script lang="ts" setup>
  import { NavigationMenuIndicator } from "reka-ui";
  import type { NavigationMenuIndicatorProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    NavigationMenuIndicatorProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
  });
</script>
