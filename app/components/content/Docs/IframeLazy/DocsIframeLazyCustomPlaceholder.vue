<template>
  <div class="space-y-4">
    <p class="text-muted-foreground text-sm">Scroll down to see custom placeholder</p>
    <div class="h-[500px] w-full rounded-lg border">
      <UiIframeLazy src="https://originui.com" iframe-class="h-full w-full rounded-lg">
        <template #placeholder>
          <div
            class="from-primary/10 to-primary/5 flex size-full items-center justify-center bg-linear-to-br"
          >
            <div class="flex flex-col items-center gap-3">
              <Icon name="lucide:loader-2" class="text-primary size-8 animate-spin" />
              <p class="text-sm font-medium">Loading content...</p>
            </div>
          </div>
        </template>
      </UiIframeLazy>
    </div>
  </div>
</template>
