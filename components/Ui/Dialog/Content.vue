<template>
  <UiDialogPortal :to="to">
    <UiDialogOverlay />
    <DialogContent :class="styles({ class: props.class })" v-bind="{ ...forwarded, ...$attrs }">
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
      <slot name="close">
        <UiDialogClose />
      </slot>
      <UiDialogClose
        v-if="!hideClose"
        class="absolute right-4 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <Icon name="lucide:x" class="h-4 w-4" />
        <span class="sr-only">Close</span>
      </UiDialogClose>
    </DialogContent>
  </UiDialogPortal>
</template>

<script lang="ts" setup>
  import { DialogContent, useForwardPropsEmits } from "radix-vue";
  import type { DialogContentEmits, DialogContentProps } from "radix-vue";

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
      class?: any;
      /** Whether to hide the close button */
      hideClose?: boolean;
      /** Where to render the dialog */
      to?: string | HTMLElement;
    }
  >();
  const emits = defineEmits<DialogContentEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "icon", "title", "description", "class", "hideClose", "to"),
    emits
  );

  const styles = tv({
    base: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
  });
</script>
