<template>
  <div class="flex w-full justify-center">
    <div class="border-border w-full max-w-md space-y-4 rounded-lg border p-4">
      <div class="space-y-2">
        <UiSkeleton class="h-4 w-1/4" />
        <UiSkeleton class="h-10 w-full" />
      </div>
      <div class="space-y-2">
        <UiSkeleton class="h-4 w-1/4" />
        <UiSkeleton class="h-10 w-full" />
      </div>
      <div class="space-y-2">
        <UiSkeleton class="h-4 w-1/4" />
        <UiSkeleton class="h-24 w-full" />
      </div>
      <div class="flex gap-2">
        <UiSkeleton class="h-10 flex-1" />
        <UiSkeleton class="h-10 flex-1" />
      </div>
    </div>
  </div>
</template>
