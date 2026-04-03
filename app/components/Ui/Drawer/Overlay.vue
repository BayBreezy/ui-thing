<template>
  <DrawerOverlay
    data-slot="drawer-overlay"
    v-bind="props"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import type { DialogOverlayProps } from "reka-ui";
  import { DrawerOverlay } from "vaul-vue";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes["class"] }>();

  const styles = tv({
    base: "fixed inset-0 z-50 bg-background/40 backdrop-blur",
  });
</script>
