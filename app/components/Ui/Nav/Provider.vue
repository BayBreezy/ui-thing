<template>
  <Primitive
    data-slot="nav-provider"
    :data-state="open ? 'open' : 'closed'"
    v-bind="forwarded"
    :class="navProviderStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes, ModelRef } from "vue";

  export interface NavContextProps {
    open: Ref<boolean>;
    isMobile: Ref<boolean>;
    toggleNavbar: () => void;
  }

  export type NavProviderProps = PrimitiveProps & {
    /** Custom class(es) to add to the element */
    class?: HTMLAttributes["class"];
    /**
     * The controlled open state of the nav component.
     */
    modelValue?: boolean;
    /**
     * A function to call when the nav is opened
     */
    onOpenChange?: (open: boolean) => void;
  };

  /**
   * Injection key for the NavProvider.
   *
   * This key is used to provide and inject the navigation state
   * and methods throughout the application.
   */
  export const navProviderKey = Symbol() as InjectionKey<{
    open: ModelRef<boolean, string, boolean, boolean>;
    isMobile: ComputedRef<boolean>;
    toggleNav: () => void;
  }>;

  export const navProviderStyles = tv({
    base: [
      "peer/navbar group/navbar @container/nav-provider relative isolate z-10 flex w-full flex-col",
      "has-data-navbar-inset:min-h-svh has-data-navbar-inset:bg-background dark:has-data-navbar-inset:bg-background",
    ],
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<NavProviderProps>(), {
    as: "div",
    onOpenChange: () => {},
  });

  const forwarded = reactiveOmit(props, "class", "modelValue", "onOpenChange");
  /** Open state for the navigation */
  const open = defineModel<boolean>({ default: false });
  /** Mobile state for the navigation */
  const isMobile = useMediaQuery("(max-width: 767px)"); /** Toggle the navigation state */
  const toggleNav = () => (open.value = !open.value);
  // Watch for changes in the open state and emit the model change event
  // if the onOpenChange prop is provided.
  watch(open, (v) => {
    if (props.onOpenChange) {
      props.onOpenChange(v);
    }
  });

  provide(navProviderKey, {
    open,
    isMobile,
    toggleNav,
  });
</script>
