<template>
  <div class="mx-auto flex max-w-sm items-start gap-2">
    <div class="grid grow gap-2">
      <UiLabel for="checkbox-12" class="justify-start gap-2">
        Label
        <span class="text-xs font-normal leading-[inherit] text-muted-foreground">
          (Sublabel)
        </span>
      </UiLabel>
      <p id="checkbox-12-description" class="text-xs text-muted-foreground">
        You can use this checkbox with a label and a description.
      </p>
    </div>
    <UiVeeCheckbox id="checkbox-12" aria-describedby="checkbox-12-description" />
  </div>
</template>
