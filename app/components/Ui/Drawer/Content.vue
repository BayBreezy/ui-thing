<template>
  <UiDrawerPortal>
    <slot name="overlay">
      <UiDrawerOverlay />
    </slot>
    <slot name="content">
      <DrawerContent
        data-slot="drawer-content"
        v-bind="{ ...forwarded, ...$attrs }"
        :class="
          styles({
            translucent: props.translucent,
            class: normalizeClass(props.class) || undefined,
          })
        "
      >
        <slot name="knob">
          <DrawerHandle
            v-if="!hideKnob"
            data-slot="drawer-knob"
            class="bg-muted mx-auto mt-4 h-1.5 w-[60px] shrink-0 cursor-grab rounded-full active:cursor-grabbing"
          />
        </slot>

        <slot />
      </DrawerContent>
    </slot>
  </UiDrawerPortal>
</template>

<script lang="ts" setup>
  import { DrawerContent, DrawerHandle, useForwardPropsEmits } from "reka-ui";
  import type { DrawerContentEmits, DrawerContentProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });

  const props = defineProps<
    DrawerContentProps & {
      class?: HTMLAttributes["class"];
      hideKnob?: boolean;
      translucent?: boolean;
    }
  >();
  const emits = defineEmits<DrawerContentEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "class", "hideKnob", "translucent"),
    emits
  );

  const styles = tv({
    base: [
      "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
      "transform-[translate3d(var(--drawer-swipe-movement-x,0px),var(--drawer-swipe-movement-y,0px),0)] will-change-transform",
      "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-swiping:select-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[swipe-direction=up]:data-[state=open]:slide-in-from-top data-[swipe-direction=up]:data-[state=closed]:slide-out-to-top data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:mb-24 data-[swipe-direction=up]:max-h-[80vh] data-[swipe-direction=up]:rounded-b-lg data-[swipe-direction=up]:border-b",
      "data-[swipe-direction=down]:data-[state=open]:slide-in-from-bottom data-[swipe-direction=down]:data-[state=closed]:slide-out-to-bottom data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:mt-24 data-[swipe-direction=down]:max-h-[80vh] data-[swipe-direction=down]:rounded-t-lg data-[swipe-direction=down]:border-t",
      "data-[swipe-direction=right]:data-[state=open]:slide-in-from-right data-[swipe-direction=right]:data-[state=closed]:slide-out-to-right data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-3/4 data-[swipe-direction=right]:border-l data-[swipe-direction=right]:sm:max-w-sm",
      "data-[swipe-direction=left]:data-[state=open]:slide-in-from-left data-[swipe-direction=left]:data-[state=closed]:slide-out-to-left data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-3/4 data-[swipe-direction=left]:border-r data-[swipe-direction=left]:sm:max-w-sm",
    ],
    variants: {
      translucent: {
        true: getTranslucentFloatingPanelClasses("background"),
      },
    },
  });
</script>
