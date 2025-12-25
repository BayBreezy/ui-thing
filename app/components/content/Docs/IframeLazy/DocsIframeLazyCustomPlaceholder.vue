<template>
  <div class="space-y-4">
    <p class="text-sm text-muted-foreground">Scroll down to see custom placeholder</p>
    <div class="h-[500px] w-full rounded-lg border">
      <UiIframeLazy src="https://originui.com" iframe-class="h-full w-full rounded-lg">
        <template #placeholder>
          <div
            class="flex size-full items-center justify-center bg-linear-to-br from-primary/10 to-primary/5"
          >
            <div class="flex flex-col items-center gap-3">
              <Icon name="lucide:loader-2" class="size-8 animate-spin text-primary" />
              <p class="text-sm font-medium">Loading content...</p>
            </div>
          </div>
        </template>
      </UiIframeLazy>
    </div>
  </div>
</template>
