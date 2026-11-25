<template>
  <DrawerViewport
    data-slot="drawer-viewport"
    v-bind="props"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </DrawerViewport>
</template>

<script lang="ts" setup>
  import { DrawerViewport } from "reka-ui";
  import type { DrawerViewportProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DrawerViewportProps & {
      /** Custom class(es) to add to the parent. */
      class?: HTMLAttributes["class"];
    }
  >();

  const styles = tv({
    base: "pointer-events-none fixed inset-x-0 top-0 bottom-(--drawer-keyboard-inset,0px) z-50 flex items-end",
  });
</script>
