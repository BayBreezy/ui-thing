<template>
  <div class="flex w-full justify-center">
    <UIPopover>
      <UIPopoverTrigger as-child>
        <UIButton variant="outline">Open popover</UIButton>
      </UIPopoverTrigger>
      <UIPopoverContent class="w-80 p-6">
        <div class="flex h-full flex-col gap-1.5">
          <p class="font-semibold leading-none">Dimensions</p>
          <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          <div class="mt-5 grid gap-3">
            <div class="grid grid-cols-3 items-center gap-4">
              <UILabel for="width">Width</UILabel>
              <UIInput id="width" type="text" value="100%" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <UILabel for="maxWidth">Max. width</UILabel>
              <UIInput id="maxWidth" type="text" value="300px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <UILabel for="height">Height</UILabel>
              <UIInput id="height" type="text" value="25px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <UILabel for="maxHeight">Max. height</UILabel>
              <UIInput id="maxHeight" type="text" value="none" class="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </UIPopoverContent>
    </UIPopover>
  </div>
</template>
