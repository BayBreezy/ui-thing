<template>
  <Primitive
    data-sidebar="menu-sub-button"
    :as="as"
    :as-child="asChild"
    :data-size="size"
    :data-active="isActive"
    :class="sideBarMenuSubButtonStyles({ size, class: props.class })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";
  import type { VariantProps } from "tailwind-variants";
  import type { HTMLAttributes } from "vue";

  export const sideBarMenuSubButtonStyles = tv({
    base: [
      "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
      "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
      "group-data-[collapsible=icon]:hidden",
    ],
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
    },
  });

  export type SideBarMenuSubButtonProps = PrimitiveProps & {
    /**
     * The size of the button.
     * @default "md"
     */
    size?: VariantProps<typeof sideBarMenuSubButtonStyles>["size"];
    /**
     * Whether the button is active.
     */
    isActive?: boolean;
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<SideBarMenuSubButtonProps>(), {
    as: "a",
    size: "md",
  });
</script>
