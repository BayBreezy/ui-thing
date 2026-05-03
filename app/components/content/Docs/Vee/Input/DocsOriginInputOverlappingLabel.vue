<template>
  <div class="relative flex items-center justify-center">
    <UiLabel
      for="input-overlapping-label"
      class="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-[:disabled]:opacity-50"
    >
      Input with overlapping label
    </UiLabel>

    <UiVeeInput id="input-overlapping-label" placeholder="Email" type="email" />
  </div>
</template>
