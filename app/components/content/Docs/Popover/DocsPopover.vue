<template>
  <div class="flex w-full justify-center">
    <UiPopover>
      <UiPopoverTrigger as-child>
        <UiButton variant="outline">Open popover</UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-80 p-6">
        <div class="flex h-full flex-col gap-1.5">
          <p class="font-semibold leading-none">Dimensions</p>
          <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          <div class="mt-5 grid gap-3">
            <div class="grid grid-cols-3 items-center gap-4">
              <UiLabel for="width">Width</UiLabel>
              <UiInput id="width" type="text" value="100%" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <UiLabel for="maxWidth">Max. width</UiLabel>
              <UiInput id="maxWidth" type="text" value="300px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <UiLabel for="height">Height</UiLabel>
              <UiInput id="height" type="text" value="25px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <UiLabel for="maxHeight">Max. height</UiLabel>
              <UiInput id="maxHeight" type="text" value="none" class="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>
