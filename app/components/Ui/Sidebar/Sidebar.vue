<template>
  <div
    v-if="collapsible === 'none'"
    data-slot="sidebar"
    :class="sideBarStyles().collapsible({ class: normalizeClass(props.class) || undefined })"
    v-bind="$attrs"
  >
    <slot />
  </div>

  <UiSheet v-else-if="isMobile" :open="openMobile" v-bind="$attrs" @update:open="setOpenMobile">
    <UiSheetContent
      data-sidebar="sidebar"
      data-slot="sidebar"
      data-mobile="true"
      :side="side"
      :class="sideBarStyles().mobileSheet()"
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
      }"
    >
      <VisuallyHidden>
        <UiSheetTitle>Mobile Sidebar</UiSheetTitle>
        <UiSheetDescription>
          This is the mobile sidebar. You can use this to navigate the site.
        </UiSheetDescription>
      </VisuallyHidden>
      <div :class="sideBarStyles().mobileInner()">
        <slot />
      </div>
    </UiSheetContent>
  </UiSheet>

  <div
    v-else
    class="group peer hidden text-sidebar-foreground md:block"
    data-slot="sidebar"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <!-- This is what handles the sidebar gap on desktop  -->
    <div data-slot="sidebar-gap" :class="sideBarStyles().sideBarWrapper({ variant })" />

    <div
      :class="
        sideBarStyles().sideBarWrapper2({
          collapsible,
          side,
          variant,
          class: normalizeClass(props.class) || undefined,
        })
      "
      v-bind="$attrs"
    >
      <div data-sidebar="sidebar" :class="sideBarStyles().sideBarInner()">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { VisuallyHidden } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const sideBarStyles = tv({
    slots: {
      collapsible:
        "flex h-full w-(--sidebar-width) flex-col bg-sidebar-background text-sidebar-foreground",
      mobileSheet:
        "w-(--sidebar-width) bg-sidebar-background p-0 text-sidebar-foreground [&>button]:hidden",
      mobileInner: "flex size-full flex-col",
      sideBarWrapper:
        "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180",
      sideBarWrapper2:
        "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
      sideBarInner:
        "flex h-full w-full flex-col bg-sidebar-background group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm",
    },
    variants: {
      side: {
        left: {
          sideBarWrapper2:
            "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
        },
        right: {
          sideBarWrapper2:
            "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
        },
      },
      variant: {
        sidebar: {
          sideBarWrapper: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          sideBarWrapper2:
            "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
        },
        floating: {
          sideBarWrapper:
            "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",
          sideBarWrapper2:
            "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]",
        },
        inset: {
          sideBarWrapper:
            "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",
          sideBarWrapper2:
            "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]",
        },
      },
      collapsible: {
        offcanvas: {},
        icon: {},
        none: {},
      },
    },
    defaultVariants: {
      side: "left",
      variant: "sidebar",
      collapsible: "offcanvas",
    },
  });

  export type SideBarProps = {
    /**
     * The side that the sidebar is on
     * @default "left"
     */
    side?: VariantProps<typeof sideBarStyles>["side"];
    /**
     * The variant of the sidebar
     * @default "sidebar"
     */
    variant?: VariantProps<typeof sideBarStyles>["variant"];
    /**
     * The collapsible state of the sidebar
     * @default "offcanvas"
     */
    collapsible?: VariantProps<typeof sideBarStyles>["collapsible"];
    /**
     * Additional classes to add to the sidebar
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script setup lang="ts">
  defineOptions({ inheritAttrs: false });

  const props = withDefaults(defineProps<SideBarProps>(), {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  });

  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
</script>
