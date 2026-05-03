<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Input with end inline add-on" class="peer pr-14" placeholder="google.com">
      <template #trailingIcon>
        <span
          class="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50"
        >
          .com
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
