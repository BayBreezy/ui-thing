<template>
  <Primitive
    data-slot="sidebar-menu-action"
    data-sidebar="menu-action"
    :class="sideBarMenuAction({ showOnHover, class: normalizeClass(props.class) || undefined })"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import type { VariantProps } from "tailwind-variants";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const sideBarMenuAction = tv({
    base: [
      "text-sidebar-foreground ring-sidebar-ring peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
      "after:absolute after:-inset-2 md:after:hidden",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
    ],
    variants: {
      showOnHover: {
        true: "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
      },
    },
  });

  export type SidebarMenuActionProps = PrimitiveProps & {
    /** Whether the menu should be shown on hover. */
    showOnHover?: VariantProps<typeof sideBarMenuAction>["showOnHover"];
    /** Additional classes to apply to the parent element. */
    class?: HTMLAttributes["class"];
  };
</script>
<script setup lang="ts">
  const props = withDefaults(defineProps<SidebarMenuActionProps>(), {
    as: "button",
  });
</script>
