<template>
  <UiMenubarPortal :to="to">
    <MenubarSubContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">
      <slot />
    </MenubarSubContent>
  </UiMenubarPortal>
</template>

<script lang="ts" setup>
  import { MenubarSubContent, useForwardPropsEmits } from "radix-vue";
  import type { MenubarSubContentEmits, MenubarSubContentProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<
      MenubarSubContentProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
        /** The target element to portal the component to */
        to?: string | HTMLElement;
      }
    >(),
    {
      loop: true,
      sideOffset: 5,
      avoidCollisions: true,
      collisionPadding: 8,
      sticky: "partial",
    }
  );

  const emits = defineEmits<MenubarSubContentEmits>();

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);

  const styles = tv({
    base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
