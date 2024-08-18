<template>
  <ToastAction :class="styles({ class: props.class })" v-bind="forwarded">
    <slot />
  </ToastAction>
</template>

<script lang="ts" setup>
  import { ToastAction } from "radix-vue";
  import type { ToastActionProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      ToastActionProps & {
        /**
         * Custom class names to add to the button.
         */
        class?: any;
      }
    >(),
    {
      altText: "Action button",
    }
  );
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
  });
</script>
