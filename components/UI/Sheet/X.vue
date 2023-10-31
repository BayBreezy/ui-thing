<template>
  <DialogClose :class="styles({ class: props.class })" v-bind="props">
    <slot>
      <Icon :name="icon" class="h-4 w-4" />
      <span class="sr-only">{{ srText }}</span>
    </slot>
  </DialogClose>
</template>

<script lang="ts" setup>
  import { DialogClose } from "radix-vue";
  import type { DialogCloseProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      DialogCloseProps & {
        class?: any;
        icon?: string;
        srText?: string;
      }
    >(),
    {
      icon: "heroicons:x-mark",
      srText: "Close",
    }
  );

  const styles = tv({
    base: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
  });
</script>
