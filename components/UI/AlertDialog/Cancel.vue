<template>
  <AlertDialogCancel
    v-bind="props"
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
        onClick?: () => void;
        text?: string;
        class?: any;
        disabled?: boolean;
        variant?: VariantProps<typeof buttonStyles>["variant"];
        size?: VariantProps<typeof buttonStyles>["size"];
      }
    >(),
    {
      text: "Cancel",
      variant: "outline",
    }
  );
</script>
