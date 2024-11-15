<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with end icon button"
      class="peer pe-9"
      placeholder="Email"
      type="email"
    >
      <template #trailingIcon>
        <button
          type="button"
          aria-label="Subscribe"
          class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent border-l-input text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-muted/50 hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="lucide:download" class="size-4" />
        </button>
      </template>
    </UiVeeInput>
  </div>
</template>
