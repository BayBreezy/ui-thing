<template>
  <div
    class="relative mx-auto flex w-full max-w-sm items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[div_button[data-state=checked]]:border-ring"
  >
    <div class="grid grow gap-2">
      <UiLabel for="checkbox-13" class="justify-start gap-2">
        Label
        <span class="text-xs font-normal leading-[inherit] text-muted-foreground">
          (Sublabel)
        </span>
      </UiLabel>
      <p id="checkbox-13-description" class="text-xs text-muted-foreground">
        A short description goes here.
      </p>
    </div>
    <UiVeeCheckbox id="checkbox-13" aria-describedby="checkbox-13-description" />
  </div>
</template>
