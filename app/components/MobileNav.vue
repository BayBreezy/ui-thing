<template>
  <UiSheet v-model:open="localModel">
    <UiSheetContent class="p-1">
      <template #content>
        <UiSheetTitle title="Mobile menu" class="sr-only" />
        <UiSheetDescription description="A list of navigation items for mobile" class="sr-only" />
        <UiScrollArea class="h-[calc(100dvh-20px)] w-full p-5">
          <div class="sticky top-0 mb-3 w-full bg-background">
            <div class="flex items-center gap-3.5">
              <div class="flex h-8 w-8 items-center justify-center rounded bg-foreground/10">
                <DocsLogo />
              </div>
              <p class="text-xl font-bold">UI Thing</p>
              <UiSheetClose class="ml-auto">
                <Icon name="lucide:x" />
              </UiSheetClose>
            </div>
            <UiSeparator class="mt-4" />
          </div>
          <DocsNavlink :links="navigation" />
        </UiScrollArea>
      </template>
    </UiSheetContent>
  </UiSheet>
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
