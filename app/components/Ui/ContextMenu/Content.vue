<template>
  <UiContextMenuPortal>
    <ContextMenuContent
      data-slot="context-menu-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        styles({
          translucent: props.translucent,
          class: normalizeClass(props.class) || undefined,
        })
      "
    >
      <slot />
    </ContextMenuContent>
  </UiContextMenuPortal>
</template>

<script lang="ts" setup>
  import { ContextMenuContent, useForwardPropsEmits } from "reka-ui";
  import type { ContextMenuContentEmits, ContextMenuContentProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<
      ContextMenuContentProps & {
        /** Custom class(es) to add to the element */
        class?: HTMLAttributes["class"];
        /** Whether to render the content with a translucent surface */
        translucent?: boolean;
      }
    >(),
    {
      loop: true,
      avoidCollisions: true,
      collisionPadding: 5,
      sticky: "partial",
    }
  );

  const emits = defineEmits<ContextMenuContentEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "translucent"), emits);

  const styles = tv({
    base: "z-50 max-h-(--reka-context-menu-content-available-height) min-w-[8rem] origin-(--reka-context-menu-content-transform-origin) overflow-visible rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
    variants: {
      translucent: {
        true: getTranslucentFloatingPanelClasses("popover"),
      },
    },
  });
</script>
