<template>
  <DialogOverlay
    data-slot="dialog-overlay"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  />
</template>

<script lang="ts" setup>
  import { DialogOverlay } from "reka-ui";
  import type { DialogOverlayProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DialogOverlayProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "fixed inset-0 z-50 bg-background/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
  });
</script>
