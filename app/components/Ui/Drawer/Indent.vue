<template>
  <DrawerIndent
    data-slot="drawer-indent"
    v-bind="props"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </DrawerIndent>
</template>

<script lang="ts" setup>
  import { DrawerIndent } from "reka-ui";
  import type { DrawerIndentProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DrawerIndentProps & {
      /** Custom class(es) to add to the parent. */
      class?: HTMLAttributes["class"];
    }
  >();

  // `--drawer-swipe-progress` goes from 0 (open) to 1 (dismissed), so the page grows back to full size while the drawer is swiped away. The transition stays short so it can follow the swipe.
  const styles = tv({
    base: [
      "bg-background relative origin-top transition-[scale,translate,border-radius] duration-200 ease-out motion-reduce:transition-none",
      "data-active:translate-y-2 data-active:scale-[calc(0.94+0.06*var(--drawer-swipe-progress,0))] data-active:overflow-hidden data-active:rounded-xl",
    ],
  });
</script>
