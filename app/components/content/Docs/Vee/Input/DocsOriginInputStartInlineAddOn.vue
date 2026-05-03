<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Input with start inline add-on" class="peer pl-16" placeholder="google.com">
      <template #icon>
        <span
          class="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50"
        >
          https://
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
