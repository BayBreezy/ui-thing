<template>
  <UiHoverCardPortal :to="to">
    <HoverCardContent
      data-slot="hover-card-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        styles({
          translucent: props.translucent,
          class: normalizeClass(props.class) || undefined,
        })
      "
    >
      <slot />
    </HoverCardContent>
  </UiHoverCardPortal>
</template>

<script lang="ts" setup>
  import { HoverCardContent } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HoverCardContentProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      HoverCardContentProps & {
        /** Custom class(es) to add to the content */
        class?: HTMLAttributes["class"];
        /** The element or selector the content should be positioned relative to */
        to?: string | HTMLElement;
        /** Whether to render the content with a translucent surface */
        translucent?: boolean;
      }
    >(),
    {
      side: "bottom",
      sideOffset: 5,
      align: "center",
      avoidCollisions: true,
      sticky: "partial",
    }
  );
  const forwarded = reactiveOmit(props, "class", "to", "translucent");
  const styles = tv({
    base: "z-50 w-64 origin-(--reka-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
    variants: {
      translucent: {
        true: getTranslucentFloatingPanelClasses("popover"),
      },
    },
  });
</script>
