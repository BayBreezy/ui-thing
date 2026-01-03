<template>
  <UiSheetPortal :to="to">
    <slot name="overlay">
      <UiSheetOverlay :is-blurred />
    </slot>
    <DialogContent
      data-slot="sheet-content"
      :class="styles({ side, isBlurred, variant, class: props.class })"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot>
        <slot name="header">
          <UiSheetHeader>
            <slot name="title">
              <UiSheetTitle v-if="title" :title="title" />
            </slot>
            <slot name="description">
              <UiSheetDescription v-if="description" :description="description" />
            </slot>
          </UiSheetHeader>
        </slot>
        <slot name="content" />
        <slot name="footer" />
      </slot>
      <slot name="close">
        <UiSheetClose :icon="icon" />
      </slot>
    </DialogContent>
  </UiSheetPortal>
</template>

<script lang="ts" setup>
  import { DialogContent, useForwardPropsEmits } from "reka-ui";
  import type { DialogContentEmits, DialogContentProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });

  const styles = tv({
    base: "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500",
    variants: {
      side: {
        top: "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
      isBlurred: {
        true: "backdrop-blur-sm",
        false: "backdrop-blur-none",
      },
      variant: {
        default: "",
        floating: "rounded-lg border",
      },
    },
    compoundVariants: [
      {
        side: "top",
        variant: "floating",
        class: "inset-x-4 top-4",
      },
      {
        side: "bottom",
        variant: "floating",
        class: "inset-x-4 bottom-4",
      },
      {
        side: "left",
        variant: "floating",
        class: "inset-y-4 left-4 h-[calc(100%-2rem)]",
      },
      {
        side: "right",
        variant: "floating",
        class: "inset-y-4 right-4 h-[calc(100%-2rem)]",
      },
    ],
    defaultVariants: {
      side: "left",
      variant: "default",
    },
  });

  const props = withDefaults(
    defineProps<
      DialogContentProps & {
        /**
         * Custom icon for the close button
         */
        icon?: string;
        /**
         * Title text for the sheet header
         */
        title?: string;
        /**
         * Description text for the sheet header
         */
        description?: string;
        /**
         * Custom class for the sheet content element
         */
        class?: HTMLAttributes["class"];
        /**
         * Side from which the sheet will appear
         *
         * @default "left"
         */

        side?: VariantProps<typeof styles>["side"];
        /**
         * Visual variant of the sheet
         *
         * @default "default"
         */
        variant?: VariantProps<typeof styles>["variant"];
        /**
         * Target element or selector for the sheet portal
         */
        to?: string | HTMLElement;
        /**
         * Whether the overlay should have a blur effect
         *
         * @default true
         */
        isBlurred?: boolean;
      }
    >(),
    { isBlurred: true }
  );
  const emits = defineEmits<DialogContentEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, [
      "class",
      "icon",
      "title",
      "description",
      "to",
      "side",
      "variant",
      "isBlurred",
    ]),
    emits
  );

  defineSlots<{
    /**
     * Default slot for custom sheet structure
     */
    default: () => any;
    /**
     * Slot for custom overlay content
     */
    overlay: () => any;
    /**
     * Slot for custom close button
     */
    close: () => any;
    /**
     * Slot for header content (title and description)
     */
    header: () => any;
    /**
     * Slot for title content
     */
    title: () => any;
    /**
     * Slot for description content
     */
    description: () => any;
    /**
     * Slot for main content of the sheet
     */
    content: () => any;
    /**
     * Slot for footer content of the sheet
     */
    footer: () => any;
  }>();
</script>
