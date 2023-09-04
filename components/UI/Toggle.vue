<template>
  <ToggleRoot
    v-model:pressed="localModel"
    :as-child="asChild"
    :default-value="defaultValue"
    :disabled="disabled"
    :class="styles({ variant, size, class: props.class })"
  >
    <slot></slot>
  </ToggleRoot>
</template>

<script lang="ts" setup>
  import { Toggle as ToggleRoot } from "radix-vue";

  const props = defineProps<{
    defaultValue?: boolean;
    pressed?: boolean;
    disabled?: boolean;
    modelValue?: boolean;
    asChild?: boolean;
    class?: any;
    variant?: Props["variant"];
    size?: Props["size"];
  }>();

  const emits = defineEmits<{
    "update:modelValue": [value: boolean];
  }>();

  const localModel = useVModel(props, "modelValue", emits);

  type Props = VariantProps<typeof styles>;

  const styles = tv({
    base: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  });
</script>
