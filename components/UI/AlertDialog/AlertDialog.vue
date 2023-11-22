<template>
  <AlertDialogRoot v-bind="forwarded">
    <slot>
      <slot name="trigger">
        <UiAlertDialogTrigger v-if="triggerText" as-child>
          <UiButton variant="outline">{{ triggerText }}</UiButton>
        </UiAlertDialogTrigger>
      </slot>
      <slot name="content">
        <UiAlertDialogContent>
          <slot name="header">
            <UiAlertDialogHeader>
              <slot name="title">
                <UiAlertDialogTitle v-if="title" :title="title" />
              </slot>
              <slot name="description">
                <UiAlertDialogDescription v-if="description" :description="description" />
              </slot>
            </UiAlertDialogHeader>
          </slot>
          <slot name="footer">
            <UiAlertDialogFooter>
              <slot name="cancel">
                <UiAlertDialogCancel />
              </slot>
              <slot name="action">
                <UiAlertDialogAction />
              </slot>
            </UiAlertDialogFooter>
          </slot>
        </UiAlertDialogContent>
      </slot>
    </slot>
  </AlertDialogRoot>
</template>

<script lang="ts" setup>
  import { AlertDialogRoot, useForwardPropsEmits } from "radix-vue";
  import type { AlertDialogEmits, AlertDialogProps } from "radix-vue";

  const props = defineProps<
    AlertDialogProps & {
      /** Text to display in the trigger button */
      triggerText?: string;
      /** Text to be passed to the `AlertDialogTitle` */
      title?: string;
      /** Text to be passed to the `AlertDialogDescription` */
      description?: string;
    }
  >();

  const emits = defineEmits<AlertDialogEmits>();

  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "description", "title", "triggerText"),
    emits
  );
</script>
