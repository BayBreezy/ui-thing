<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with inline start and end add-on"
      class="peer pe-16 ps-7"
      placeholder="0.00"
      type="text"
    >
      <template #icon>
        <span
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          €
        </span>
      </template>
      <template #trailingIcon>
        <span
          class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center border-l px-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          EUR
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
