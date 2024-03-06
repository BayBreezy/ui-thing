<template>
  <div class="flex items-center justify-center">
    <ClientOnly>
      <template #fallback>
        <UiSkeleton class="max-w-md rounded-lg" />
      </template>

      <UiSplitter autoSaveId="splitter-persist-1" class="max-w-md rounded-lg border">
        <UiSplitterPanel
          v-slot="{ isCollapsed }"
          collapsible
          :collapsedSize="10"
          :minSize="30"
          :defaultSize="40"
        >
          <div class="flex h-[200px] items-center justify-center p-6">
            <UiButton
              @click="$router.go(0)"
              variant="outline"
              :size="isCollapsed ? 'icon-sm' : 'sm'"
              class="shrink-0 whitespace-nowrap"
            >
              <span v-if="!isCollapsed">Reload page</span>
              <Icon v-else name="lucide:rotate-ccw" class="size-4" />
            </UiButton>
          </div>
        </UiSplitterPanel>
        <UiSplitterHandle />
        <UiSplitterPanel :minSize="20" :defaultSize="50">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Main</span>
          </div>
        </UiSplitterPanel>
      </UiSplitter>
    </ClientOnly>
  </div>
</template>
