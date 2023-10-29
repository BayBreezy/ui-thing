<template>
  <AlertDialogOverlay v-bind="forwarded" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { AlertDialogOverlay, useForwardProps } from "radix-vue";
  import type { AlertDialogOverlayProps } from "radix-vue";

  const props = defineProps<
    AlertDialogOverlayProps & {
      class?: any;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["class"]));

  const styles = tv({
    base: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn",
  });
</script>
