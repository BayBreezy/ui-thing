<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <UiBadge variant="outline">Root Margin: 500px</UiBadge>
      <p class="text-sm text-muted-foreground">Loads 500px before entering viewport</p>
    </div>
    <div class="h-[400px] w-full rounded-lg border">
      <UiIframeLazy src="https://tailwindcss.com" root-margin="500px" iframe-class="rounded-lg">
        <template #placeholder>
          <div class="flex size-full items-center justify-center bg-muted">
            <div class="flex flex-col items-center gap-2">
              <Icon name="lucide:clock" class="size-6 text-muted-foreground" />
              <p class="text-xs text-muted-foreground">Waiting to load...</p>
            </div>
          </div>
        </template>
      </UiIframeLazy>
    </div>
  </div>
</template>
