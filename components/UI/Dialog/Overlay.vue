<template>
  <DialogOverlay :class="styles({ class: props.class })" v-bind="forwarded" />
</template>

<script lang="ts" setup>
  import { DialogOverlay, useForwardProps } from "radix-vue";
  import type { DialogOverlayProps } from "radix-vue";

  const props = defineProps<
    DialogOverlayProps & {
      class?: any;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["class"]));
  const styles = tv({
    base: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn",
  });
</script>
