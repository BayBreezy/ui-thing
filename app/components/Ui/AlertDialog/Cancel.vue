<template>
  <AlertDialogCancel
    data-slot="alert-dialog-cancel"
    v-bind="forwarded"
    :class="
      buttonStyles({ variant, size, disabled, class: normalizeClass(props.class) || undefined })
    "
  >
    <slot>{{ text }}</slot>
  </AlertDialogCancel>
</template>

<script lang="ts" setup>
  import { AlertDialogCancel } from "reka-ui";
  import type { AlertDialogCancelProps } from "reka-ui";
  import { normalizeClass } from "vue";

  import { buttonStyles } from "~/components/Ui/Button.vue";

  const props = withDefaults(
    defineProps<
      AlertDialogCancelProps & {
        /** Action to perform when the button is clicked. */
        onClick?: () => void;
        /** Text to display in the button. */
        text?: string;
        /** Custom class(es) to add to the button. */
        class?: any;
        /** Whether the button is disabled. */
        disabled?: boolean;
        /** The button's visual variant. */
        variant?: VariantProps<typeof buttonStyles>["variant"];
        /** The button's visual size. */
        size?: VariantProps<typeof buttonStyles>["size"];
      }
    >(),
    {
      text: "Cancel",
      variant: "outline",
      size: "default",
    }
  );

  const forwarded = reactiveOmit(props, "class", "text", "variant", "size");
</script>
