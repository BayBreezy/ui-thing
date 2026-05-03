<template>
  <div class="space-y-4">
    <p class="text-muted-foreground text-sm">No placeholder will be shown</p>
    <div class="h-[450px] w-full rounded-lg border">
      <UiIframeLazy src="https://reka-ui.com" :placeholder="false" iframe-class="rounded-lg" />
    </div>
  </div>
</template>
