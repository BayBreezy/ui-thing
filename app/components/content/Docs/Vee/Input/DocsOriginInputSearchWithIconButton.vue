<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Search input with icon and button"
      class="peer pe-9"
      placeholder="Search..."
      type="search"
      icon="lucide:search"
    >
      <template #trailingIcon>
        <button
          type="button"
          aria-label="Subscribe"
          class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="lucide:arrow-right" class="size-4" />
        </button>
      </template>
    </UiVeeInput>
  </div>
</template>
