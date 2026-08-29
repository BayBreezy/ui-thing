<template>
  <DrawerOverlay
    data-slot="drawer-overlay"
    v-bind="props"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { DrawerOverlay } from "reka-ui";
  import type { DrawerOverlayProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<DrawerOverlayProps & { class?: HTMLAttributes["class"] }>();

  const styles = tv({
    base: "bg-background/40 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur",
  });
</script>
