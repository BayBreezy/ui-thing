<template>
  <UIMenubarPortal>
    <MenubarSubContent
      v-bind="$attrs"
      :class="styles({ class: props.class })"
      :loop="loop"
      :force-mount="forceMount"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
      :collision-boundary="collisionBoundary"
      :collision-padding="collisionPadding"
      :sticky="sticky"
      :hide-when-detached="hideWhenDetached"
      :as-child="asChild"
      :on-close-auto-focus="onCloseAutoFocus"
      :on-escape-key-down="onEscapeKeyDown"
      :on-pointer-down-outside="onPointerDownOutside"
      :on-focus-outside="onFocusOutside"
      :on-interact-outside="onInteractOutside"
    >
      <slot></slot>
    </MenubarSubContent>
  </UIMenubarPortal>
</template>

<script lang="ts" setup>
  import type { MenubarSubContentProps } from "radix-vue";
  import {
    FocusOutsideEvent,
    PointerDownOutsideEvent,
  } from "radix-vue/dist/DismissableLayer/utils";

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<{
      loop?: boolean;
      forceMount?: boolean;
      sideOffset?: MenubarSubContentProps["sideOffset"];
      alignOffset?: number;
      avoidCollisions?: boolean;
      collisionBoundary?: MenubarSubContentProps["collisionBoundary"];
      collisionPadding?: MenubarSubContentProps["collisionPadding"];
      sticky?: MenubarSubContentProps["sticky"];
      hideWhenDetached?: MenubarSubContentProps["hideWhenDetached"];
      asChild?: MenubarSubContentProps["asChild"];
      onCloseAutoFocus?: (event: Event) => void;
      onEscapeKeyDown?: (event: KeyboardEvent) => void;
      onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
      onFocusOutside?: (event: FocusOutsideEvent) => void;
      onInteractOutside?: (event: Event) => void;
      class?: any;
    }>(),
    {
      loop: true,
      sideOffset: 50,
      alignOffset: 0,
      avoidCollisions: true,
      collisionBoundary: () => [],
      collisionPadding: 8,
      sticky: "partial",
    }
  );

  const styles = tv({
    base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
