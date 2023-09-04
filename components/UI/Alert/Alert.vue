<template>
  <div :class="styles({ variant: variant, class: props.class })" v-if="shown">
    <slot name="icon">
      <Icon :name="icon" v-if="icon" class="h-4 w-4" />
    </slot>
    <div>
      <slot>
        <UIAlertTitle :title="title" v-if="title" />
        <UIAlertDescription v-if="description" :description="description" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const styles = tv({
    base: "relative flex w-full gap-3 rounded-lg border p-4",
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });
  type AlertProps = VariantProps<typeof styles>;
  const props = withDefaults(
    defineProps<{
      class?: any;
      modelValue?: boolean;
      variant?: AlertProps["variant"];
      title?: string;
      description?: string;
      icon?: string;
    }>(),
    {
      modelValue: true,
    }
  );

  const emit = defineEmits(["update:modelValue"]);
  const shown = useVModel(props, "modelValue", emit, { defaultValue: true });
</script>
