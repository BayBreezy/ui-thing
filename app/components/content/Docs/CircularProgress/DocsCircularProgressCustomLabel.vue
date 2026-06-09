<template>
  <div class="flex flex-wrap items-center justify-center gap-8">
    <UiCircularProgress :progress="0.8" size="xl">
      <Icon name="lucide:check" class="text-primary size-5" />
    </UiCircularProgress>
    <UiCircularProgress :progress="0.45" size="xl" color="warning">
      <Icon name="lucide:zap" class="size-5 text-yellow-500 dark:text-yellow-400" />
    </UiCircularProgress>
    <UiCircularProgress :progress="0.2" size="xl" color="destructive">
      <Icon name="lucide:x" class="text-destructive size-5" />
    </UiCircularProgress>
    <UiCircularProgress :progress="1" size="xl" color="success">
      <Icon name="lucide:badge-check" class="size-5 text-green-500 dark:text-green-400" />
    </UiCircularProgress>
  </div>
</template>
