<template>
  <div class="flex items-center justify-center">
    <ClientOnly>
      <UiSplitter class="max-w-md rounded-lg border">
        <UiSplitterPanel :min-size="35" :default-size="50">
          <div class="flex h-[200px] items-center justify-center p-6">
            <span class="font-semibold">One</span>
          </div>
        </UiSplitterPanel>
        <UiSplitterHandle />
        <UiSplitterPanel :min-size="20" :default-size="50">
          <UiSplitter direction="vertical">
            <UiSplitterPanel>
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Two</span>
              </div>
            </UiSplitterPanel>
            <UiSplitterHandle />
            <UiSplitterPanel>
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Three</span>
              </div>
            </UiSplitterPanel>
          </UiSplitter>
        </UiSplitterPanel>
      </UiSplitter>
    </ClientOnly>
  </div>
</template>
