<template>
  <UiPopoverPortal :to="to">
    <PopoverContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">
      <slot />
    </PopoverContent>
  </UiPopoverPortal>
</template>

<script lang="ts" setup>
  import { PopoverContent, useForwardPropsEmits } from "radix-vue";
  import type { PopoverContentEmits, PopoverContentProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      PopoverContentProps & {
        to?: string | HTMLElement;
        class?: any;
      }
    >(),
    {
      side: "bottom",
      sideOffset: 8,
      align: "start",
      avoidCollisions: true,
      collisionPadding: 0,
      sticky: "partial",
    }
  );

  const emits = defineEmits<PopoverContentEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "to", "class"), emits);

  const styles = tv({
    base: "z-50 w-72 rounded-md border bg-popover p-4 text-accent-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
