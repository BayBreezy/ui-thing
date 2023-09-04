<template>
  <UIHoverCardPortal>
    <HoverCardContent
      v-bind="$attrs"
      :as-child="asChild"
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
      :collision-boundary="collisionBoundary"
      :collision-padding="collisionPadding"
      :arrow-padding="arrowPadding"
      :sticky="sticky"
      :hide-when-detached="hideWhenDetached"
      :class="styles({ class: props.class })"
    >
      <slot></slot>
    </HoverCardContent>
  </UIHoverCardPortal>
</template>

<script lang="ts" setup>
  import { type HoverCardContentProps } from "radix-vue/dist/HoverCard/HoverCardContent.vue";
  const styles = tv({
    base: "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<{
      asChild?: boolean;
      side?: HoverCardContentProps["side"];
      sideOffset?: HoverCardContentProps["sideOffset"];
      align?: HoverCardContentProps["align"];
      alignOffset?: HoverCardContentProps["alignOffset"];
      avoidCollisions?: HoverCardContentProps["avoidCollisions"];
      collisionBoundary?: HoverCardContentProps["collisionBoundary"];
      collisionPadding?: HoverCardContentProps["collisionPadding"];
      arrowPadding?: HoverCardContentProps["arrowPadding"];
      sticky?: HoverCardContentProps["sticky"];
      hideWhenDetached?: HoverCardContentProps["hideWhenDetached"];
      class?: any;
    }>(),
    {
      side: "bottom",
      sideOffset: 5,
      align: "center",
      alignOffset: 0,
      avoidCollisions: true,
      collisionBoundary: () => [],
      collisionPadding: 0,
      arrowPadding: 0,
      sticky: "partial",
    }
  );
</script>
