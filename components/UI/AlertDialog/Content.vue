<template>
  <UIAlertDialogPortal>
    <UIAlertDialogOverlay />
    <AlertDialogContent
      @close-auto-focus="onCloseAutoFocus"
      @open-auto-focus="onOpenAutoFocus"
      @escape-key-down="onEscapeKeyDown"
      :class="styles({ class: props.class })"
      v-bind="$attrs"
      :as-child="asChild"
    >
      <slot></slot>
    </AlertDialogContent>
  </UIAlertDialogPortal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
    onOpenAutoFocus?: (e: Event) => void;
    onCloseAutoFocus?: (e: Event) => void;
    onEscapeKeyDown?: (e: Event) => void;
  }>();

  defineOptions({ inheritAttrs: false });

  const styles = tv({
    base: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
  });
</script>
