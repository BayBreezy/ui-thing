<template>
  <UiDialogPortal :to="to">
    <UiDialogOverlay />
    <DialogContent
      data-slot="dialog-content"
      :class="
        styles({
          translucent: props.translucent,
          class: normalizeClass(props.class) || undefined,
        })
      "
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot>
        <slot name="header">
          <UiDialogHeader>
            <slot name="title">
              <UiDialogTitle v-if="title" :title="title" />
            </slot>
            <slot name="description">
              <UiDialogDescription v-if="description" :description="description" />
            </slot>
          </UiDialogHeader>
        </slot>
        <slot name="content" />
        <slot name="footer" />
      </slot>
      <slot name="close" />
      <UiDialogClose
        v-if="!hideClose"
        class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        <Icon name="lucide:x" class="size-4" />
        <span class="sr-only">Close</span>
      </UiDialogClose>
    </DialogContent>
  </UiDialogPortal>
</template>

<script lang="ts" setup>
  import { DialogContent, useForwardPropsEmits } from "reka-ui";
  import type { DialogContentEmits, DialogContentProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });
  const props = defineProps<
    DialogContentProps & {
      /** Icon to display in the close button */
      icon?: string;
      /** Title text */
      title?: string;
      /** Description text */
      description?: string;
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
      /** Whether to hide the close button */
      hideClose?: boolean;
      /** Where to render the dialog */
      to?: string | HTMLElement;
      /** Whether to render the content with a translucent surface */
      translucent?: boolean;
    }
  >();
  const emits = defineEmits<DialogContentEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "icon", "title", "description", "class", "hideClose", "to", "translucent"),
    emits
  );

  const styles = tv({
    base: "fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-xl border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-100",
    variants: {
      translucent: {
        true: getTranslucentFloatingPanelClasses("background"),
      },
    },
  });
</script>
