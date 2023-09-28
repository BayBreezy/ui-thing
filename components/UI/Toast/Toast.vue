<template>
  <ToastRoot
    :asChild="asChild"
    :type="type"
    :duration="duration"
    :defaultOpen="defaultOpen"
    v-model:open="localModel"
    :forceMount="forceMount"
    :class="styles({ variant, class: props.class })"
    @escapeKeyDown="emits('escapeKeyDown', $event)"
    @pause="emits('pause')"
    @resume="emits('resume')"
    @swipeStart="emits('swipeStart', $event)"
    @swipeMove="emits('swipeMove', $event)"
    @swipeEnd="emits('swipeEnd', $event)"
  >
    <slot></slot>
  </ToastRoot>
</template>

<script lang="ts" setup>
  import { ToastRootProps, ToastRootEmits } from "radix-vue";

  const props = withDefaults(
    defineProps<{
      asChild?: ToastRootProps["asChild"];
      type?: ToastRootProps["type"];
      duration?: ToastRootProps["duration"];
      defaultOpen?: ToastRootProps["defaultOpen"];
      modelValue?: ToastRootProps["open"];
      forceMount?: ToastRootProps["forceMount"];
      class?: any;
      variant?: VariantProps<typeof styles>["variant"];
    }>(),
    {}
  );

  const emits = defineEmits<{
    "update:modelValue": ToastRootEmits["update:open"];
    escapeKeyDown: ToastRootEmits["escapeKeyDown"];
    pause: ToastRootEmits["pause"];
    resume: ToastRootEmits["resume"];
    swipeStart: ToastRootEmits["swipeStart"];
    swipeMove: ToastRootEmits["swipeMove"];
    swipeEnd: ToastRootEmits["swipeEnd"];
  }>();

  const localModel = useVModel(props, "modelValue", emits);

  const styles = tv({
    base: "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success: "success group border-green-500 bg-green-500 text-green-50",
        info: "info group border-blue-500 bg-blue-500 text-blue-50",
        warning: "warning group border-yellow-600 bg-yellow-600 text-white",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });
</script>
