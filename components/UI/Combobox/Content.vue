<template>
  <ComboboxContent
    v-bind="$attrs"
    :position="position"
    :bodyLock="bodyLock"
    :disableOutsidePointerEvents="disableOutsidePointerEvents"
    :side="side"
    :sideOffset="sideOffset"
    :align="align"
    :alignOffset="alignOffset"
    :avoidCollisions="avoidCollisions"
    :collisionBoundary="collisionBoundary"
    :collisionPadding="collisionPadding"
    :arrowPadding="arrowPadding"
    :sticky="sticky"
    :hideWhenDetached="hideWhenDetached"
    :asChild="asChild"
    @closeAutoFocus="($event) => emits('closeAutoFocus', $event)"
    @escapeKeyDown="($event) => emits('escapeKeyDown', $event)"
    @pointerDownOutside="($event) => emits('pointerDownOutside', $event)"
    :class="styles({ class: props.class })"
  >
    <UIComboboxViewport>
      <slot></slot>
    </UIComboboxViewport>
  </ComboboxContent>
</template>

<script lang="ts" setup>
  import { ComboboxContentProps, ComboboxContentEmits } from "radix-vue";
  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<{
      position?: ComboboxContentProps["position"];
      bodyLock?: ComboboxContentProps["bodyLock"];
      disableOutsidePointerEvents?: ComboboxContentProps["disableOutsidePointerEvents"];
      side?: ComboboxContentProps["side"];
      sideOffset?: ComboboxContentProps["sideOffset"];
      align?: ComboboxContentProps["align"];
      alignOffset?: ComboboxContentProps["alignOffset"];
      avoidCollisions?: ComboboxContentProps["avoidCollisions"];
      collisionBoundary?: ComboboxContentProps["collisionBoundary"];
      collisionPadding?: ComboboxContentProps["collisionPadding"];
      arrowPadding?: ComboboxContentProps["arrowPadding"];
      sticky?: ComboboxContentProps["sticky"];
      hideWhenDetached?: ComboboxContentProps["hideWhenDetached"];
      asChild?: ComboboxContentProps["asChild"];
      class?: any;
    }>(),
    {
      position: "popper",
      bodyLock: true,
      side: "bottom",
      sideOffset: 8,
    }
  );

  const emits = defineEmits<{
    closeAutoFocus: ComboboxContentEmits["closeAutoFocus"];
    escapeKeyDown: ComboboxContentEmits["escapeKeyDown"];
    pointerDownOutside: ComboboxContentEmits["pointerDownOutside"];
  }>();

  const styles = tv({
    base: "z-50 w-[var(--radix-combobox-trigger-width)] min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
