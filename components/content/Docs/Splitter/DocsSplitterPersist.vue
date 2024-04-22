<template>
  <div class="flex items-center justify-center">
    <ClientOnly>
      <template #fallback>
        <UiSkeleton class="max-w-md rounded-lg" />
      </template>

      <UiSplitter auto-save-id="splitter-persist-1" class="max-w-md rounded-lg border">
        <UiSplitterPanel
          v-slot="{ isCollapsed }"
          collapsible
          :collapsed-size="10"
          :min-size="30"
          :default-size="40"
        >
          <div class="flex h-[200px] items-center justify-center p-6">
            <UiButton
              variant="outline"
              :size="isCollapsed ? 'icon-sm' : 'sm'"
              class="shrink-0 whitespace-nowrap"
              @click="$router.go(0)"
            >
              <span v-if="!isCollapsed">Reload page</span>
              <Icon v-else name="lucide:rotate-ccw" class="size-4" />
            </UiButton>
          </div>
        </UiSplitterPanel>
        <UiSplitterHandle />
        <UiSplitterPanel :min-size="20" :default-size="50">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Main</span>
          </div>
        </UiSplitterPanel>
      </UiSplitter>
    </ClientOnly>
  </div>
</template>
