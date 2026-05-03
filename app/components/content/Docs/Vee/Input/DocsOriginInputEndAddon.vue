<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with end add-on"
      class="peer pr-16"
      placeholder="google.com"
      type="text"
    >
      <template #trailingIcon>
        <span
          class="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center border-l px-3 text-sm peer-disabled:opacity-50"
        >
          .com
        </span>
      </template>
    </UiVeeInput>
  </div>
</template>
