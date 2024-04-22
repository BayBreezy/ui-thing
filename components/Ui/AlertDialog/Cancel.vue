<template>
  <AlertDialogCancel
    v-bind="reactiveOmit(props, 'class', 'text', 'variant', 'size')"
    :class="buttonStyles({ variant, size, disabled, class: props.class })"
  >
    <slot>{{ text }}</slot>
  </AlertDialogCancel>
</template>

<script lang="ts" setup>
  import { AlertDialogCancel } from "radix-vue";
  import type { AlertDialogCancelProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      AlertDialogCancelProps & {
        /** Action to perform when the button is clicked */
        onClick?: () => void;
        /** Text to display in the button */
        text?: string;
        /** Custom class(es) to add to the button */
        class?: any;
        /** Whether the button is disabled */
        disabled?: boolean;
        /** The button's visual variant */
        variant?: VariantProps<typeof buttonStyles>["variant"];
        /** The button's visual size */
        size?: VariantProps<typeof buttonStyles>["size"];
      }
    >(),
    {
      text: "Cancel",
      variant: "outline",
      size: "default",
      class: undefined,
      onClick: undefined,
    }
  );
</script>
