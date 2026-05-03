<template>
  <div class="flex items-center justify-center">
    <UiVeeCheckbox
      id="checkbox-06"
      class="peer [&_button]:border-border [&_[data-state=checked]]:border-emerald-500 [&_[data-state=checked]]:bg-emerald-500 [&_button]:rounded-full [&_button_span]:rounded-full"
      :model-value="true"
    />
    <UiLabel
      for="checkbox-06"
      class="peer-has-[button[data-state=checked]]:text-muted-foreground after:bg-muted-foreground relative peer-has-[button[data-state=checked]]:line-through after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:transition-transform after:ease-in-out peer-has-[button[data-state=checked]]:after:scale-x-100"
    >
      Fancy todo item
    </UiLabel>
  </div>
</template>
