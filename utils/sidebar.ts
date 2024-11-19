import { createContext } from "radix-vue";
import type { ComputedRef, Ref } from "vue";

export const SIDEBAR_COOKIE_NAME = "sidebar:state";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";

// This sets the cookie to keep the sidebar state.
export const SIDEBAR_COOKIE = useCookie<boolean>(SIDEBAR_COOKIE_NAME, {
  path: "/",
  maxAge: SIDEBAR_COOKIE_MAX_AGE,
  default: () => false,
});

export const sidebarMenuButtonVariants = tv({
  base: "peer/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",

  variants: {
    variant: {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline:
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
    },
    size: {
      default: "h-8 text-sm",
      sm: "h-7 text-xs",
      lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>;

export const [useSidebar, provideSidebarContext] = createContext<{
  state: ComputedRef<"expanded" | "collapsed">;
  open: Ref<boolean>;
  setOpen: (value: boolean) => void;
  isMobile: Ref<boolean>;
  openMobile: Ref<boolean>;
  setOpenMobile: (value: boolean) => void;
  toggleSidebar: () => void;
}>("Sidebar");
