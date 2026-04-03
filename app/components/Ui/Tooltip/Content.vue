<template>
  <UiTooltipPortal :to="to">
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="styles({ class: normalizeClass(props.class) || undefined })"
    >
      <slot />
      <slot name="arrow">
        <UiTooltipArrow v-if="showArrow" />
      </slot>
    </TooltipContent>
  </UiTooltipPortal>
</template>

<script lang="ts" setup>
  import { TooltipContent, useForwardPropsEmits } from "reka-ui";
  import type { TooltipContentEmits, TooltipContentProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      TooltipContentProps & {
        to?: string | HTMLElement;
        class?: HTMLAttributes["class"];
        showArrow?: boolean;
      }
    >(),
    {
      side: "top",
      sideOffset: 4,
      align: "center",
      alignOffset: -4,
      avoidCollisions: true,
      collisionBoundary: () => [],
      collisionPadding: 0,
      sticky: "partial",
    }
  );

  const emits = defineEmits<TooltipContentEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);

  const styles = tv({
    base: "relative z-50 max-w-70 animate-in rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  });
</script>
