<template>
  <AlertDialogAction
    v-bind="reactiveOmit(props, 'class', 'text', 'variant', 'size')"
    :class="buttonStyles({ variant, size, disabled, class: props.class })"
  >
    <slot>{{ text }} </slot>
  </AlertDialogAction>
</template>

<script lang="ts" setup>
  import { AlertDialogAction } from "radix-vue";
  import type { AlertDialogActionProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      AlertDialogActionProps & {
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
      text: "Continue",
      variant: "default",
      size: "default",
      class: undefined,
      onClick: undefined,
    }
  );
</script>
