<template>
  <UiTooltipPortal :to="to">
    <TooltipContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">
      <slot />
    </TooltipContent>
  </UiTooltipPortal>
</template>

<script lang="ts" setup>
  import { TooltipContent, useForwardPropsEmits } from "radix-vue";
  import type { TooltipContentEmits, TooltipContentProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      TooltipContentProps & {
        to?: string | HTMLElement;
        class?: any;
      }
    >(),
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

  const emits = defineEmits<TooltipContentEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);

  const styles = tv({
    base: "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
