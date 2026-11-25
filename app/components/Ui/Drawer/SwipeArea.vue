<template>
  <DrawerSwipeArea
    data-slot="drawer-swipe-area"
    v-bind="props"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </DrawerSwipeArea>
</template>

<script lang="ts" setup>
  import { DrawerSwipeArea } from "reka-ui";
  import type { DrawerSwipeAreaProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DrawerSwipeAreaProps & {
      /** Custom class(es) to add to the parent. */
      class?: HTMLAttributes["class"];
    }
  >();

  const styles = tv({
    base: "fixed z-40 touch-none select-none data-[state=open]:pointer-events-none data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:top-0 data-[swipe-direction=down]:h-6 data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-6 data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-6 data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:bottom-0 data-[swipe-direction=up]:h-6",
  });
</script>
