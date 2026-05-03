<template>
  <div class="mx-auto max-w-md">
    <div class="flex w-full flex-col gap-3">
      <UiInput :maxlength="5" placeholder="Enter username" />
      <p class="text-muted-foreground text-sm">No more than 5 characters</p>
    </div>
  </div>
</template>
