<template>
  <div class="flex w-full justify-center">
    <div class="w-full max-w-md space-y-3">
      <div v-for="i in 4" :key="i" class="flex items-center space-x-3">
        <UiSkeleton class="h-12 w-12 shrink-0 rounded-full" />
        <div class="flex-1 space-y-2">
          <UiSkeleton class="h-4 w-3/4" />
          <UiSkeleton class="h-3 w-1/2" />
        </div>
      </div>
    </div>
  </div>
</template>
