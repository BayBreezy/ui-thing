<template>
  <ToastAction :asChild="props.asChild" :altText="altText" :class="styles({ class: props.class })">
    <slot></slot>
  </ToastAction>
</template>

<script lang="ts" setup>
  import type { ToastActionProps } from "radix-vue";

  const props = withDefaults(
    defineProps<{
      asChild?: ToastActionProps["asChild"];
      altText?: string;
      class?: any;
    }>(),
    {
      altText: "Action button",
    }
  );

  const styles = tv({
    base: "inline-flex h-8 shrink-0 items-center justify-center rounded-md border  bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.info]:border-blue-400 group-[.success]:border-green-600 group-[.warning]:border-yellow-400 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
  });
</script>
