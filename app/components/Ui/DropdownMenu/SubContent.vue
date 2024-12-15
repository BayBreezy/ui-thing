<template>
  <UiDropdownMenuPortal :to="to">
    <DropdownMenuSubContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="styles({ class: props.class })"
    >
      <slot />
    </DropdownMenuSubContent>
  </UiDropdownMenuPortal>
</template>

<script lang="ts" setup>
  import { DropdownMenuSubContent, useForwardPropsEmits } from "radix-vue";
  import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<
      DropdownMenuSubContentProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
        /** The element to render the portal into */
        to?: string | HTMLElement;
      }
    >(),
    {
      loop: true,
      sideOffset: 8,
      avoidCollisions: true,
      collisionPadding: 5,
      sticky: "partial",
    }
  );

  const emits = defineEmits<DropdownMenuSubContentEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);

  const styles = tv({
    base: "z-50 min-w-[180px] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
