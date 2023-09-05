<template>
  <UISelectPortal :to="to">
    <SelectContent
      v-bind="$attrs"
      :position="position"
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
      :class="styles({ position, class: props.class })"
    >
      <UISelectScrollUpButton />
      <UISelectViewport :position="position">
        <slot></slot>
      </UISelectViewport>
      <UISelectScrollDownButton />
    </SelectContent>
  </UISelectPortal>
</template>

<script lang="ts" setup>
  import {
    type SelectContentProps,
    type SelectContentEmits,
  } from "radix-vue/dist/Select/SelectContent";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<{
      position?: SelectContentProps["position"];
      side?: SelectContentProps["side"];
      sideOffset?: SelectContentProps["sideOffset"];
      align?: SelectContentProps["align"];
      alignOffset?: SelectContentProps["alignOffset"];
      avoidCollisions?: SelectContentProps["avoidCollisions"];
      collisionBoundary?: SelectContentProps["collisionBoundary"];
      collisionPadding?: SelectContentProps["collisionPadding"];
      arrowPadding?: SelectContentProps["arrowPadding"];
      sticky?: SelectContentProps["sticky"];
      hideWhenDetached?: SelectContentProps["hideWhenDetached"];
      asChild?: SelectContentProps["asChild"];
      to?: string | HTMLElement;
      class?: any;
    }>(),
    {
      position: "popper",
      side: "bottom",
      sideOffset: 0,
      align: "start",
      alignOffset: 0,
      avoidCollisions: true,
      collisionBoundary: () => [],
      collisionPadding: 0,
      sticky: "partial",
    }
  );

  const emits = defineEmits<{
    closeAutoFocus: SelectContentEmits["closeAutoFocus"];
    escapeKeyDown: SelectContentEmits["escapeKeyDown"];
    pointerDownOutside: SelectContentEmits["pointerDownOutside"];
  }>();

  const styles = tv({
    base: "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    variants: {
      position: {
        popper:
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        "item-aligned": "",
      },
    },
  });
</script>
