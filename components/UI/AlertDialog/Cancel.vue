<template>
  <AlertDialogCancel
    :disabled="disabled"
    @click="onClick"
    :class="
      buttonStyles({
        variant: variant,
        size: size,
        disabled: disabled,
        class: [props.class, 'mt-2 sm:mt-0'],
      })
    "
  >
    <slot>
      {{ text }}
    </slot>
  </AlertDialogCancel>
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
      text: "Cancel",
      variant: "outline",
    }
  );
</script>
