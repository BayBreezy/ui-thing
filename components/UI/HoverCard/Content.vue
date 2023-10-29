<template>
  <UIHoverCardPortal>
    <HoverCardContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">
      <slot></slot>
    </HoverCardContent>
  </UIHoverCardPortal>
</template>

<script lang="ts" setup>
  import { HoverCardContent, useForwardProps } from "radix-vue";
  import type { HoverCardContentProps } from "radix-vue";

  const styles = tv({
    base: "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      HoverCardContentProps & {
        class?: any;
      }
    >(),
    {
      side: "bottom",
      sideOffset: 5,
      align: "center",
      avoidCollisions: true,
      sticky: "partial",
    }
  );

  const forwarded = useForwardProps(props);
</script>
