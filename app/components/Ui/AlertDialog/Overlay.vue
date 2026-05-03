<template>
  <AlertDialogOverlay
    data-slot="alert-dialog-overlay"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { AlertDialogOverlay } from "reka-ui";
  import type { AlertDialogOverlayProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    AlertDialogOverlayProps & {
      /** Custom class(es) to add to the overlay. */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: [
      "bg-background/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 supports-backdrop-filter:backdrop-blur-sm",
    ],
  });
</script>
