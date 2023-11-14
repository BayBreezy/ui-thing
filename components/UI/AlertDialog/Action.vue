<template>
  <AlertDialogAction
    v-bind="props"
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
        onClick?: () => void;
        text?: string;
        class?: any;
        disabled?: boolean;
        variant?: VariantProps<typeof buttonStyles>["variant"];
        size?: VariantProps<typeof buttonStyles>["size"];
      }
    >(),
    {
      text: "Continue",
      variant: "default",
    }
  );
</script>
