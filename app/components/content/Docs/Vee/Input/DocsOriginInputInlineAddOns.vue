<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Input with inline add-ons" class="peer ps-6 pe-12" placeholder="0.00">
      <template #trailingIcon>
        <span
          class="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50"
        >
          EUR
        </span>
      </template>
      <template #icon>
        <span
          class="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50"
        >
          €
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
