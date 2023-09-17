<template>
  <UIPopoverPortal :to="to">
    <PopoverContent
      v-bind="$attrs"
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
      @interactOutside="emits('interactOutside', $event)"
      :class="styles({ class: props.class })"
    >
      <slot></slot>
    </PopoverContent>
  </UIPopoverPortal>
</template>

<script lang="ts" setup>
  import {
    type PopoverContentProps,
    type PopoverContentEmits,
  } from "radix-vue/dist/Popover/PopoverContent";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<{
      side?: PopoverContentProps["side"];
      sideOffset?: PopoverContentProps["sideOffset"];
      align?: PopoverContentProps["align"];
      alignOffset?: PopoverContentProps["alignOffset"];
      avoidCollisions?: PopoverContentProps["avoidCollisions"];
      collisionBoundary?: PopoverContentProps["collisionBoundary"];
      collisionPadding?: PopoverContentProps["collisionPadding"];
      arrowPadding?: PopoverContentProps["arrowPadding"];
      sticky?: PopoverContentProps["sticky"];
      hideWhenDetached?: PopoverContentProps["hideWhenDetached"];
      asChild?: PopoverContentProps["asChild"];
      to?: string | HTMLElement;
      class?: any;
    }>(),
    {
      side: "bottom",
      sideOffset: 8,
      align: "start",
      alignOffset: 0,
      avoidCollisions: true,
      collisionBoundary: () => [],
      collisionPadding: 0,
      sticky: "partial",
    }
  );

  const emits = defineEmits<{
    openAutoFocus: PopoverContentEmits["openAutoFocus"];
    closeAutoFocus: PopoverContentEmits["closeAutoFocus"];
    escapeKeyDown: PopoverContentEmits["escapeKeyDown"];
    pointerDownOutside: PopoverContentEmits["pointerDownOutside"];
    interactOutside: PopoverContentEmits["interactOutside"];
  }>();

  const styles = tv({
    base: "z-50 w-72 rounded-md border bg-popover p-4 text-accent-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
