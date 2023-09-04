<template>
  <AlertDialogRoot v-model:open="open" :default-open="defaultOpen">
    <slot>
      <slot name="trigger">
        <UIAlertDialogTrigger as-child>
          <UIButton variant="outline">{{ triggerText }}</UIButton>
        </UIAlertDialogTrigger>
      </slot>
      <slot name="content">
        <UIAlertDialogContent>
          <slot name="header">
            <UIAlertDialogHeader>
              <slot name="title">
                <UIAlertDialogTitle :title="title" />
              </slot>
              <slot name="description">
                <UIAlertDialogDescription v-if="description" :description="description" />
              </slot>
            </UIAlertDialogHeader>
          </slot>
          <slot name="footer">
            <UIAlertDialogFooter>
              <slot name="cancel">
                <UIAlertDialogCancel />
              </slot>
              <slot name="action">
                <UIAlertDialogAction />
              </slot>
            </UIAlertDialogFooter>
          </slot>
        </UIAlertDialogContent>
      </slot>
    </slot>
  </AlertDialogRoot>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      defaultOpen?: boolean;
      modelValue?: boolean;
      triggerText?: string;
      title?: string;
      description?: string;
    }>(),
    {
      triggerText: "Show Dialog",
      title: "Are you absolutely sure?",
    }
  );

  const emits = defineEmits<{
    "update:modelValue": [boolean];
  }>();

  const open = useVModel(props, "modelValue", emits);
</script>
