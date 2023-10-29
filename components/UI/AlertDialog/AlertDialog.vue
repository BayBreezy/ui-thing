<template>
  <AlertDialogRoot v-bind="forwarded">
    <slot>
      <slot name="trigger">
        <UIAlertDialogTrigger v-if="triggerText" as-child>
          <UIButton variant="outline">{{ triggerText }}</UIButton>
        </UIAlertDialogTrigger>
      </slot>
      <slot name="content">
        <UIAlertDialogContent>
          <slot name="header">
            <UIAlertDialogHeader>
              <slot name="title">
                <UIAlertDialogTitle v-if="title" :title="title" />
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
  import { AlertDialogRoot, useForwardPropsEmits } from "radix-vue";
  import type { AlertDialogEmits, AlertDialogProps } from "radix-vue";

  const props = defineProps<
    AlertDialogProps & {
      triggerText?: string;
      title?: string;
      description?: string;
    }
  >();

  const emits = defineEmits<AlertDialogEmits>();

  const forwarded = useForwardPropsEmits(
    useOmit(props, ["description", "title", "triggerText"]),
    emits
  );
</script>
