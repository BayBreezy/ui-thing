<template>
  <UIMenubarPortal :to="to">
    <MenubarContent
      v-bind="$attrs"
      :loop="loop"
      :forceMount="forceMount"
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :avoidCollisions="avoidCollisions"
      :collisionBoundary="collisionBoundary"
      :collisionPadding="collisionPadding"
      :arrowPadding="arrowPadding"
      :sticky="sticky"
      :hideWhenDetached="hideWhenDetached"
      :as-child="asChild"
      @closeAutoFocus="emits('closeAutoFocus', $event)"
      @escapeKeyDown="emits('escapeKeyDown', $event)"
      @pointerDownOutside="emits('pointerDownOutside', $event)"
      @focusOutside="emits('focusOutside', $event)"
      @interactOutside="emits('interactOutside', $event)"
      :class="styles({ class: props.class })"
    >
      <slot></slot>
    </MenubarContent>
  </UIMenubarPortal>
</template>

<script lang="ts" setup>
  import {
    FocusOutsideEvent,
    PointerDownOutsideEvent,
  } from "radix-vue/dist/DismissableLayer/utils";
  import { type MenubarContentProps } from "radix-vue/dist/Menubar/MenubarContent";
  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<{
      loop?: MenubarContentProps["loop"];
      forceMount?: boolean;
      side?: MenubarContentProps["side"];
      sideOffset?: MenubarContentProps["sideOffset"];
      align?: MenubarContentProps["align"];
      alignOffset?: MenubarContentProps["alignOffset"];
      avoidCollisions?: MenubarContentProps["avoidCollisions"];
      collisionBoundary?: MenubarContentProps["collisionBoundary"];
      collisionPadding?: MenubarContentProps["collisionPadding"];
      arrowPadding?: MenubarContentProps["arrowPadding"];
      sticky?: MenubarContentProps["sticky"];
      hideWhenDetached?: MenubarContentProps["hideWhenDetached"];
      asChild?: MenubarContentProps["asChild"];
      to?: string | HTMLElement;
      class?: any;
    }>(),
    {
      loop: true,
      side: "bottom",
      sideOffset: 8,
      align: "start",
      alignOffset: -4,
      avoidCollisions: true,
      collisionBoundary: () => [],
      collisionPadding: 0,
      sticky: "partial",
    }
  );

  const emits = defineEmits<{
    closeAutoFocus: [event: Event];
    escapeKeyDown: [event: KeyboardEvent];
    pointerDownOutside: [event: PointerDownOutsideEvent];
    focusOutside: [event: FocusOutsideEvent];
    interactOutside: [event: FocusEvent | MouseEvent | TouchEvent];
  }>();

  const styles = tv({
    base: "z-50 min-w-[220px] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
