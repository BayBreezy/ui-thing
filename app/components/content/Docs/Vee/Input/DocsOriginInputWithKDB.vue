<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Search input with &lt;kbd&gt;"
      class="pe-11"
      placeholder="Search..."
      type="search"
    >
      <template #trailingIcon>
        <div
          class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground"
        >
          <UiKbd variant="outline"> ⌘K </UiKbd>
        </div>
      </template>
    </UiVeeInput>
  </div>
</template>
