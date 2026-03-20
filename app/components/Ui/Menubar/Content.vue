<template>
  <UiMenubarPortal :to="to">
    <MenubarContent
      data-slot="menubar-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        styles({
          translucent: props.translucent,
          class: normalizeClass(props.class) || undefined,
        })
      "
    >
      <slot />
    </MenubarContent>
  </UiMenubarPortal>
</template>

<script lang="ts" setup>
  import { MenubarContent, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { MenubarContentProps, MenubarSubContentEmits } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      MenubarContentProps & {
        to?: string | HTMLElement;
        class?: HTMLAttributes["class"];
        translucent?: boolean;
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

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to", "translucent"), emits);

  const styles = tv({
    base: "z-50 min-w-[12rem] origin-(--reka-menubar-content-transform-origin) overflow-visible rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
    variants: {
      translucent: {
        true: getTranslucentFloatingPanelClasses("popover"),
      },
    },
  });
</script>
