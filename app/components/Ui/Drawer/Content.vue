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
          <div
            v-if="!hideKnob"
            data-slot="drawer-knob"
            class="mx-auto mt-4 h-1.5 w-[60px] shrink-0 cursor-grab rounded-full bg-muted active:cursor-grabbing"
          />
        </slot>

        <slot />
      </DrawerContent>
    </slot>
  </UiDrawerPortal>
</template>

<script lang="ts" setup>
  import { useForwardPropsEmits } from "reka-ui";
  import type { DialogContentEmits, DialogContentProps } from "reka-ui";
  import { DrawerContent } from "vaul-vue";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });

  const props = defineProps<
    DialogContentProps & {
      class?: HTMLAttributes["class"];
      hideKnob?: boolean;
      translucent?: boolean;
    }
  >();
  const emits = defineEmits<DialogContentEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "class", "hideKnob", "translucent"),
    emits
  );

  const styles = tv({
    base: [
      "group/drawer-content fixed z-50 flex h-auto flex-col bg-background",
      "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
      "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
      "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
      "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
    ],
    variants: {
      translucent: {
        true: getTranslucentFloatingPanelClasses("background"),
      },
    },
  });
</script>
