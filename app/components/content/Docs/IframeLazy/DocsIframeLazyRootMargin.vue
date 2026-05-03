<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <UiBadge variant="outline">Root Margin: 500px</UiBadge>
      <p class="text-muted-foreground text-sm">Loads 500px before entering viewport</p>
    </div>
    <div class="h-[400px] w-full rounded-lg border">
      <UiIframeLazy src="https://tailwindcss.com" root-margin="500px" iframe-class="rounded-lg">
        <template #placeholder>
          <div class="bg-muted flex size-full items-center justify-center">
            <div class="flex flex-col items-center gap-2">
              <Icon name="lucide:clock" class="text-muted-foreground size-6" />
              <p class="text-muted-foreground text-xs">Waiting to load...</p>
            </div>
          </div>
        </template>
      </UiIframeLazy>
    </div>
  </div>
</template>
