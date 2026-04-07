<template>
  <UiDialog v-bind="forwarded">
    <UiDialogContent
      :hide-close="showCloseButton"
      :translucent="translucent"
      class="overflow-hidden rounded-xl! p-0 shadow-lg"
    >
      <UiDialogHeader class="sr-only">
        <UiDialogTitle :title />
        <UiDialogDescription :description />
      </UiDialogHeader>
      <UiCommand :highlight-on-hover>
        <slot />
      </UiCommand>
    </UiDialogContent>
  </UiDialog>
</template>

<script lang="ts" setup>
  import { useForwardPropsEmits } from "reka-ui";
  import type { DialogRootEmits, DialogRootProps } from "reka-ui";

  const props = withDefaults(
    defineProps<
      DialogRootProps & {
        /**
         * The title of the command dialog.
         *
         * @default "Command Palette"
         */
        title?: string;
        /**
         * The description of the command dialog.
         *
         * @default "Search for a command to run...".
         */
        description?: string;
        /**
         * Whether to show the close button in the dialog header.
         *
         * @default true
         */
        showCloseButton?: boolean;
        /**
         * Whether to render the dialog content with a translucent surface.
         */
        translucent?: boolean;
        /**
         * When `true`, hover over item will trigger highlight
         */
        highlightOnHover?: boolean;
      }
    >(),
    {
      title: "Command Palette",
      description: "Search for a command to run...",
    }
  );
  const emits = defineEmits<DialogRootEmits>();

  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "translucent", "highlightOnHover"),
    emits
  );
</script>
