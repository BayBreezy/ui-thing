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
    <slot></slot>
  </ComboboxContent>
</template>

<script lang="ts" setup>
  import { ComboboxContentProps, ComboboxContentEmits } from "radix-vue";

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<{
      to?: string | HTMLElement;
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
    {}
  );

  const emits = defineEmits<{
    closeAutoFocus: ComboboxContentEmits["closeAutoFocus"];
    escapeKeyDown: ComboboxContentEmits["escapeKeyDown"];
    pointerDownOutside: ComboboxContentEmits["pointerDownOutside"];
  }>();

  const styles = tv({
    base: "max-h-[300px] overflow-y-auto overflow-x-hidden",
  });
</script>
