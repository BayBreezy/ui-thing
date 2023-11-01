<template>
  <ToastClose :class="styles({ class: props.class })" v-bind="props">
    <slot>
      <Icon :name="icon || 'lucide:x'" class="h-4 w-4" />
    </slot>
  </ToastClose>
</template>

<script lang="ts" setup>
  import { ToastClose } from "radix-vue";
  import type { ToastCloseProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      ToastCloseProps & {
        class?: any;
        icon?: string;
      }
    >(),
    {}
  );

  const styles = tv({
    base: "absolute right-2 top-2 inline-flex items-center justify-center rounded-md p-1 text-current opacity-40 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
  });
</script>
