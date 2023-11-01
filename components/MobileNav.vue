<template>
  <UISheet v-model:open="localModel">
    <UISheetContent>
      <template #content>
        <UIScrollArea class="h-[calc(100dvh-57px)] w-full">
          <DocsNavlink :links="navigation" />
        </UIScrollArea>
      </template>
    </UISheetContent>
  </UISheet>
</template>

<script lang="ts" setup>
  const { navigation } = useContent();

  const props = defineProps<{
    modelValue?: boolean;
  }>();
  const emits = defineEmits<{
    "update:modelValue": [value: boolean];
  }>();

  const localModel = useVModel(props, "modelValue", emits, { passive: true });
</script>
