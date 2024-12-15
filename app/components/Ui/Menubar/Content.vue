<template>
  <UiMenubarPortal :to="to">
    <MenubarContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">
      <slot />
    </MenubarContent>
  </UiMenubarPortal>
</template>

<script lang="ts" setup>
  import { MenubarContent, useForwardPropsEmits } from "radix-vue";
  import type { MenubarContentProps, MenubarSubContentEmits } from "radix-vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      MenubarContentProps & {
        to?: string | HTMLElement;
        class?: any;
      }
    >(),
    {
      loop: true,
      side: "bottom",
      sideOffset: 8,
      align: "start",
      alignOffset: -4,
      avoidCollisions: true,
      sticky: "partial",
    }
  );

  const emits = defineEmits<MenubarSubContentEmits>();

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);

  const styles = tv({
    base: "z-50 min-w-[220px] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  });
</script>
