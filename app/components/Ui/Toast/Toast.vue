<template>
  <ToastRoot
    v-slot="slotProps"
    v-bind="forwarded"
    :class="styles({ variant, class: props.class })"
    @update:open="onOpenChange"
  >
    <slot v-bind="slotProps" />
  </ToastRoot>
</template>

<script lang="ts" setup>
  import { ToastRoot, useForwardPropsEmits } from "radix-vue";
  import type { ToastRootEmits, ToastRootProps } from "radix-vue";

  export interface ToastProps extends ToastRootProps {
    /**
     * Custom class names to add to the toast.
     */
    class?: any;
    /**
     * The variant of the toast.
     */
    variant?: VariantProps<typeof styles>["variant"];
    /**
     * Callback that fires when the toast is closed.
     */
    onOpenChange?: ((value: boolean) => void) | undefined;
  }

  const props = withDefaults(defineProps<ToastProps>(), {});

  const emits = defineEmits<ToastRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
  provide("ToastRootProps", readonly(toRef(() => props)));

  const styles = tv({
    base: "group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-md border p-4 pr-9 shadow-sm transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success:
          "success group border-[var(--success-border)] bg-[--success-bg] text-[--success-text]",
        info: "info group border-[var(--info-border)] bg-[--info-bg] text-[--info-text]",
        warning:
          "warning group border-[var(--warning-border)] bg-[--warning-bg] text-[--warning-text]",
        destructive:
          "destructive group border-[var(--error-border)] bg-[--error-bg] text-[--error-text]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });
</script>
