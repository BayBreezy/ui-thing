<template>
  <UiTooltipProvider :delay-duration="0">
    <div
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH,
        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
      }"
      :class="sideBarProviderStyles({ class: props.class })"
    >
      <slot v-bind="{ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }" />
    </div>
  </UiTooltipProvider>
</template>

<script lang="ts">
  import type { HTMLAttributes, Ref } from "vue";

  export const sideBarProviderStyles = tv({
    base: "group/sidebar-wrapper flex min-h-svh w-full text-sidebar-foreground has-[[data-variant=inset]]:bg-sidebar",
  });
</script>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      /**
       * Default open state of the sidebar.
       * @default true
       */
      defaultOpen?: boolean;
      /**
       * Open state of the sidebar (controlled).
       * @default undefined
       */
      open?: boolean;
      /**
       * Additional classes to apply to the parent element.
       */
      class?: HTMLAttributes["class"];
    }>(),
    {
      defaultOpen: true,
      open: undefined,
    }
  );

  // This sets the cookie to keep the sidebar state.
  const SIDEBAR_COOKIE = useCookie<boolean>(SIDEBAR_COOKIE_NAME, {
    path: "/",
    maxAge: SIDEBAR_COOKIE_MAX_AGE,
    default: () => false,
  });

  const emits = defineEmits<{
    "update:open": [open: boolean];
  }>();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const openMobile = ref(false);

  const open = useVModel(props, "open", emits, {
    defaultValue: props.defaultOpen ? props.defaultOpen : SIDEBAR_COOKIE.value,
    passive: (props.open === undefined) as false,
  }) as Ref<boolean>;

  function setOpen(value: boolean) {
    open.value = value; // emits('update:open', value)
    SIDEBAR_COOKIE.value = value;
  }

  function setOpenMobile(value: boolean) {
    openMobile.value = value;
  }

  // Helper to toggle the sidebar.
  function toggleSidebar() {
    return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value);
  }

  useEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      toggleSidebar();
    }
  });

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = computed(() => (open.value ? "expanded" : "collapsed"));

  provideSidebarContext({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  });
</script>
