<template>
  <div class="flex justify-center">
    <UiVeeCheckbox
      id="checkbox-10"
      hint="You can use this checkbox with a label and a description."
    >
      <template #label>
        <UiLabel for="checkbox-10" class="justify-start gap-2">
          Label
          <span class="text-muted-foreground text-xs leading-[inherit] font-normal">
            (Sublabel)
          </span>
        </UiLabel>
      </template>
    </UiVeeCheckbox>
  </div>
</template>
