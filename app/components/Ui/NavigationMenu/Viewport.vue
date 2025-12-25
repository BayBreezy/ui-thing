<template>
  <div class="absolute top-full left-0 isolate z-50 flex justify-center">
    <NavigationMenuViewport
      data-slot="navigation-menu-viewport"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="styles({ class: props.class })"
    />
  </div>
</template>

<script lang="ts" setup>
  import { NavigationMenuViewport } from "reka-ui";
  import type { NavigationMenuViewportProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });
  const props = defineProps<
    NavigationMenuViewportProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "origin-top-center relative mt-1.5 h-(--reka-navigation-menu-viewport-height) w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-(--reka-navigation-menu-viewport-width)",
  });
</script>
