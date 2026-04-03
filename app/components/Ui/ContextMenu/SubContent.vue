<template>
  <UiContextMenuPortal>
    <ContextMenuSubContent
      data-slot="context-menu-sub-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        styles({
          translucent: props.translucent,
          class: normalizeClass(props.class) || undefined,
        })
      "
    >
      <slot />
    </ContextMenuSubContent>
  </UiContextMenuPortal>
</template>

<script lang="ts" setup>
  import { ContextMenuSubContent, useForwardPropsEmits } from "reka-ui";
  import type { ContextMenuSubContentEmits, ContextMenuSubContentProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      ContextMenuSubContentProps & {
        /**Custom class(es) to add to the element */
        class?: HTMLAttributes["class"];
        /** Whether to render the content with a translucent surface */
        translucent?: boolean;
      }
    >(),
    {
      loop: true,
      avoidCollisions: true,
      collisionPadding: 8,
      sticky: "partial",
    }
  );

  const emits = defineEmits<ContextMenuSubContentEmits>();

  const styles = tv({
    base: "z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-visible rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
    variants: {
      translucent: {
        true: getTranslucentFloatingPanelClasses("popover"),
      },
    },
  });

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "translucent"), emits);
</script>
