<template>
  <UiSheetPortal :to="to">
    <slot name="overlay">
      <UiSheetOverlay />
    </slot>
    <DialogContent
      :class="styles({ side, class: props.class })"
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
  import { DialogContent, useForwardPropsEmits } from "radix-vue";
  import type { DialogContentEmits, DialogContentProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });

  const props = defineProps<
    DialogContentProps & {
      icon?: string;
      title?: string;
      description?: string;
      class?: any;
      side?: VariantProps<typeof styles>["side"];
      to?: string | HTMLElement;
    }
  >();
  const emits = defineEmits<DialogContentEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "icon", "title", "description", "class", "to", "side"),
    emits
  );

  const styles = tv({
    base: "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "left",
    },
  });
</script>
