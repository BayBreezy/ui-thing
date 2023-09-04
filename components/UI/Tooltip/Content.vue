<template>
  <UITooltipPortal :to="to">
    <TooltipContent
      v-bind="$attrs"
      :aria-label="ariaLabel"
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
      @escapeKeyDown="emits('escapeKeyDown', $event)"
      @pointer-down-outside="emits('pointerDownOutside', $event)"
      :class="styles({ class: props.class })"
    >
      <slot></slot>
    </TooltipContent>
  </UITooltipPortal>
</template>

<script lang="ts" setup>
  import {
    type TooltipContentProps,
    type TooltipContentEmits,
  } from "radix-vue/dist/Tooltip/TooltipContent";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<{
      ariaLabel?: TooltipContentProps["ariaLabel"];
      side?: TooltipContentProps["side"];
      sideOffset?: TooltipContentProps["sideOffset"];
      align?: TooltipContentProps["align"];
      alignOffset?: TooltipContentProps["alignOffset"];
      avoidCollisions?: TooltipContentProps["avoidCollisions"];
      collisionBoundary?: TooltipContentProps["collisionBoundary"];
      collisionPadding?: TooltipContentProps["collisionPadding"];
      arrowPadding?: TooltipContentProps["arrowPadding"];
      sticky?: TooltipContentProps["sticky"];
      hideWhenDetached?: TooltipContentProps["hideWhenDetached"];
      asChild?: TooltipContentProps["asChild"];
      to?: string | HTMLElement;
      class?: any;
    }>(),
    {
      side: "top",
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
    escapeKeyDown: TooltipContentEmits["escapeKeyDown"];
    pointerDownOutside: TooltipContentEmits["pointerDownOutside"];
  }>();

  const styles = tv({
    base: "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
