<template>
  <AlertDialogAction
    :disabled="disabled"
    @click="onClick"
    :class="buttonStyles({ variant: variant, size: size, disabled: disabled, class: props.class })"
  >
    <slot>
      {{ text }}
    </slot>
  </AlertDialogAction>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      onClick?: () => void;
      text?: string;
      class?: any;
      disabled?: boolean;
      variant?: VariantProps<typeof buttonStyles>["variant"];
      size?: VariantProps<typeof buttonStyles>["size"];
    }>(),
    {
      text: "Continue",
      variant: "default",
    }
  );
</script>
