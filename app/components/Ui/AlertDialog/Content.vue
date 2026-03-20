<template>
  <UiAlertDialogPortal :to="to">
    <slot name="overlay">
      <UiAlertDialogOverlay />
    </slot>
    <AlertDialogContent
      data-slot="alert-dialog-content"
      :data-size="props.size"
      :class="
        styles({
          translucent: props.translucent,
          class: normalizeClass(props.class) || undefined,
        })
      "
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />
    </AlertDialogContent>
  </UiAlertDialogPortal>
</template>

<script lang="ts" setup>
  import { AlertDialogContent, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { AlertDialogContentEmits, AlertDialogContentProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      AlertDialogContentProps & {
        /** Custom class(es) to add to the `AlertDialogContent` */
        class?: HTMLAttributes["class"];
        /** The element to render the portal into */
        to?: string | HTMLElement;
        /** The size of the alert dialog content */
        size?: "default" | "sm" | "lg";
        /** Whether to render the content with a translucent surface */
        translucent?: boolean;
      }
    >(),
    {
      size: "default",
    }
  );
  const emit = defineEmits<AlertDialogContentEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "class", "to", "size", "translucent"),
    emit
  );

  const styles = tv({
    base: [
      "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-4 ring-1 ring-foreground/10 duration-200 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-90 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90 data-[size=default]:sm:max-w-sm",
    ],
    variants: {
      translucent: {
        true: getTranslucentFloatingPanelClasses("background"),
      },
    },
  });
</script>
