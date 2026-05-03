<template>
  <div class="flex items-center justify-center">
    <UiVeeInput label="Input with end select" class="peer pr-20" placeholder="google">
      <template #trailingIcon>
        <select
          aria-label="Protocol"
          class="form-select border-input bg-background text-muted-foreground focus:border-input focus:border-primary focus:ring-ring/50 absolute inset-y-0 end-0 flex rounded-e-md border pe-7 text-sm peer-disabled:opacity-50 focus:ring-[3px]"
        >
          <option>.com</option>
          <option>.org</option>
          <option>.net</option>
        </select>
      </template>
    </UiVeeInput>
  </div>
</template>
