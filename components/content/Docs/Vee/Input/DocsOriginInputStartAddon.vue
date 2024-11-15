<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with start add-on"
      class="peer ps-20"
      placeholder="google.com"
      type="text"
    >
      <template #icon>
        <span
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center border-r px-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          https://
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
