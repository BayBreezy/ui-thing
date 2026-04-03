<template>
  <PopoverClose
    data-slot="popover-x"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <Icon :name="icon" class="size-4" />
      <span class="sr-only">{{ srText }}</span>
    </slot>
  </PopoverClose>
</template>

<script lang="ts" setup>
  import { PopoverClose, useForwardProps } from "reka-ui";
  import type { PopoverCloseProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      PopoverCloseProps & {
        class?: HTMLAttributes["class"];
        icon?: string;
        srText?: string;
      }
    >(),
    {
      icon: "heroicons:x-mark",
      srText: "Close",
    }
  );
  const forwarded = useForwardProps(reactiveOmit(props, "icon", "srText", "class"));

  const styles = tv({
    base: "absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
  });
</script>
