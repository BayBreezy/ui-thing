<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <UiBadge variant="secondary">Eager Loading</UiBadge>
      <p class="text-muted-foreground text-sm">Loads immediately</p>
    </div>
    <div class="h-[400px] w-full rounded-lg border">
      <UiIframeLazy src="https://ui.shadcn.com" loading="eager" iframe-class="rounded-lg" />
    </div>
  </div>
</template>
