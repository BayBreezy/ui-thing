<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Input with inline add-ons" class="peer pe-12 ps-6" placeholder="0.00">
      <template #trailingIcon>
        <span
          class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          EUR
        </span>
      </template>
      <template #icon>
        <span
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
        >
          €
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
