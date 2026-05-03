<template>
  <div class="mx-auto flex max-w-sm items-start gap-2">
    <div class="grid grow gap-2">
      <UiLabel for="checkbox-12" class="justify-start gap-2">
        Label
        <span class="text-muted-foreground text-xs leading-[inherit] font-normal">
          (Sublabel)
        </span>
      </UiLabel>
      <p id="checkbox-12-description" class="text-muted-foreground text-xs">
        You can use this checkbox with a label and a description.
      </p>
    </div>
    <UiVeeCheckbox id="checkbox-12" aria-describedby="checkbox-12-description" />
  </div>
</template>
