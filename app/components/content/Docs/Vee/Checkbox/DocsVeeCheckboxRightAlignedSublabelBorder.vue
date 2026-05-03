<template>
  <div
    class="border-input has-[div_button[data-state=checked]]:border-ring relative mx-auto flex w-full max-w-sm items-start gap-2 rounded-lg border p-4 shadow-xs shadow-black/5"
  >
    <div class="grid grow gap-2">
      <UiLabel for="checkbox-13" class="justify-start gap-2">
        Label
        <span class="text-muted-foreground text-xs leading-[inherit] font-normal">
          (Sublabel)
        </span>
      </UiLabel>
      <p id="checkbox-13-description" class="text-muted-foreground text-xs">
        A short description goes here.
      </p>
    </div>
    <UiVeeCheckbox id="checkbox-13" aria-describedby="checkbox-13-description" />
  </div>
</template>
