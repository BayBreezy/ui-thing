<template>
  <UIDialog v-bind="forwarded">
    <UIDialogContent class="overflow-hidden p-0 shadow-lg">
      <UICommand>
        <slot />
      </UICommand>
    </UIDialogContent>
  </UIDialog>
</template>

<script lang="ts" setup>
  import { useForwardPropsEmits } from "radix-vue";
  import type { DialogRootEmits, DialogRootProps } from "radix-vue";

  const props = defineProps<DialogRootProps>();
  const emits = defineEmits<DialogRootEmits>();

  const forwarded = useForwardPropsEmits(props, emits);
</script>
