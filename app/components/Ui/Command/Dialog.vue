<template>
  <UiDialog v-bind="forwarded">
    <UiDialogContent class="overflow-hidden p-0 shadow-lg">
      <UiCommand>
        <slot />
      </UiCommand>
    </UiDialogContent>
  </UiDialog>
</template>

<script lang="ts" setup>
  import { useForwardPropsEmits } from "radix-vue";
  import type { DialogRootEmits, DialogRootProps } from "radix-vue";

  const props = defineProps<DialogRootProps>();
  const emits = defineEmits<DialogRootEmits>();

  const forwarded = useForwardPropsEmits(props, emits);
</script>
