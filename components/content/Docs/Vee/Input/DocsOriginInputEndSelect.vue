<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Input with end select" class="peer pe-20" placeholder="google">
      <template #trailingIcon>
        <select
          aria-label="Protocol"
          class="form-select absolute inset-y-0 end-0 flex items-center justify-center rounded-e-md border border-input bg-background pe-7 text-sm text-muted-foreground ring-offset-background focus:border-input focus:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer-disabled:opacity-50"
        >
          <option>.com</option>
          <option>.org</option>
          <option>.net</option>
        </select>
      </template>
    </UiVeeInput>
  </div>
</template>
