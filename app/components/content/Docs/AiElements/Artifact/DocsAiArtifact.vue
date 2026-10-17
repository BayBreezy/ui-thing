<template>
  <div class="mx-auto w-full max-w-lg py-6">
    <UiCard v-if="open" class="gap-0 overflow-hidden py-0">
      <UiCardHeader class="flex flex-row items-center gap-3 border-b px-4 py-3">
        <div class="min-w-0 flex-1">
          <UiCardTitle class="flex items-center gap-2 text-sm">
            <Icon name="lucide:file-code" class="text-muted-foreground size-4 shrink-0" />
            <span class="truncate">useDebounce.ts</span>
            <UiBadge variant="secondary" class="shrink-0">v2</UiBadge>
          </UiCardTitle>
          <UiCardDescription class="text-xs">Generated 2 minutes ago</UiCardDescription>
        </div>
        <div class="-me-1 flex items-center gap-1">
          <UiCodeBlockCopyButton :value="code" />
          <UiCodeBlockDownloadButton :value="code" filename="useDebounce.ts" />
          <UiButton variant="ghost" size="icon-xs" aria-label="Close" @click="open = false">
            <Icon name="lucide:x" class="size-4" />
          </UiButton>
        </div>
      </UiCardHeader>
      <UiCardContent class="p-0">
        <UiCodeBlock :code="code" language="ts" class="rounded-none border-0">
          <UiCodeBlockContent line-numbers class="max-h-72" />
        </UiCodeBlock>
      </UiCardContent>
    </UiCard>

    <UiButton v-else variant="outline" size="sm" @click="open = true">
      <Icon name="lucide:file-code" class="size-4" />
      Reopen useDebounce.ts
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(true);

  const code = `export function useDebounce<T>(value: Ref<T>, delay = 300) {
  const debounced = shallowRef(value.value);

  watch(value, (next, _, onCleanup) => {
    const timeout = setTimeout(() => (debounced.value = next), delay);
    onCleanup(() => clearTimeout(timeout));
  });

  return debounced;
}`;
</script>
