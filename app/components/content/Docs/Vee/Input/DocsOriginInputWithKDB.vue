<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Search input with &lt;kbd&gt;"
      class="pr-12"
      placeholder="Search..."
      type="search"
    >
      <template #trailingIcon>
        <div
          class="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2"
        >
          <UiKbd variant="outline"> ⌘K </UiKbd>
        </div>
      </template>
    </UiVeeInput>
  </div>
</template>
