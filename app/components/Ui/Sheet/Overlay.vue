<template>
  <DialogOverlay
    data-slot="sheet-overlay"
    :class="styles({ isBlurred, class: props.class })"
    v-bind="forwarded"
  />
</template>

<script lang="ts" setup>
  import { DialogOverlay } from "reka-ui";
  import type { DialogOverlayProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      DialogOverlayProps & {
        /** Custom class(es) to add to parent element */
        class?: HTMLAttributes["class"];
        /**
         * Whether or not to apply a backdrop blur to the overlay
         *
         * @default true
         */
        isBlurred?: boolean;
      }
    >(),
    {
      isBlurred: true,
    }
  );

  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "fixed inset-0 z-50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
    variants: {
      isBlurred: {
        true: "bg-background/50 backdrop-blur-sm",
        false: "backdrop-blur-none",
      },
    },
  });
</script>
