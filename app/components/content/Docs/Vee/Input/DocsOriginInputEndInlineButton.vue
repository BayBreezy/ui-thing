<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      label="Input with end inline button"
      class="peer pe-9"
      placeholder="Email"
      type="email"
    >
      <template #trailingIcon>
        <button
          type="button"
          aria-label="Subscribe"
          class="text-muted-foreground/80 ring-offset-background hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:ring-ring/30 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="lucide:send" class="size-4" />
        </button>
      </template>
    </UiVeeInput>
  </div>
</template>
