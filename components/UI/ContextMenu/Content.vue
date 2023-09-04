<template>
  <UIContextMenuPortal>
    <ContextMenuContent v-bind="(props, $attrs)" :class="styles({ class: props.class })">
      <slot></slot>
    </ContextMenuContent>
  </UIContextMenuPortal>
</template>

<script lang="ts" setup>
  import type { ContextMenuContentProps } from "radix-vue";
  import {
    FocusOutsideEvent,
    PointerDownOutsideEvent,
  } from "radix-vue/dist/DismissableLayer/utils";

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<{
      loop?: boolean;
      forceMount?: boolean;
      alignOffset?: number;
      avoidCollisions?: boolean;
      collisionBoundary?: ContextMenuContentProps["collisionBoundary"];
      collisionPadding?: ContextMenuContentProps["collisionPadding"];
      sticky?: ContextMenuContentProps["sticky"];
      hideWhenDetached?: ContextMenuContentProps["hideWhenDetached"];
      asChild?: ContextMenuContentProps["asChild"];
      onCloseAutoFocus?: (event: Event) => void;
      onEscapeKeyDown?: (event: KeyboardEvent) => void;
      onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
      onFocusOutside?: (event: FocusOutsideEvent) => void;
      onInteractOutside?: (event: Event) => void;
      class?: any;
    }>(),
    {
      loop: true,
      alignOffset: 0,
      avoidCollisions: true,
      collisionBoundary: () => [],
      collisionPadding: 8,
      sticky: "partial",
    }
  );

  const styles = tv({
    base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
