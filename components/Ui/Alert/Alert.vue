<template>
  <div :class="styles({ variant: variant, class: props.class })" v-if="shown">
    <slot :props="props" name="icon">
      <Icon :name="icon" v-if="icon" class="h-4 w-4" />
    </slot>
    <div>
      <slot :props="props">
        <UiAlertTitle :title="title" v-if="title" />
        <UiAlertDescription v-if="description" :description="description" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      /** Custom class to add to the `Alert` parent */
      class?: any;
      /**
       * Whether or not the `Alert` is shown.
       * @default true
       */
      modelValue?: boolean;
      /** The variant of the `Alert` */
      variant?: VariantProps<typeof styles>["variant"];
      /** The title that is passed to the `AlertTitle` component */
      title?: string;
      /** The description that is passed to the `AlertDescription` component */
      description?: string;
      /** The icon that should be displayed*/
      icon?: string;
    }>(),
    {
      modelValue: true,
    }
  );

  const emit = defineEmits(["update:modelValue"]);
  const shown = useVModel(props, "modelValue", emit, { defaultValue: true });

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
</script>
