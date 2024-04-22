<template>
  <div class="flex w-full justify-center">
    <UiRadioGroup default-value="comfortable">
      <div class="flex items-center space-x-2">
        <UiRadioGroupItem id="r1" value="default" />
        <UiLabel for="r1">Default</UiLabel>
      </div>
      <div class="flex items-center space-x-2">
        <UiRadioGroupItem id="r2" value="comfortable" />
        <UiLabel for="r2">Comfortable</UiLabel>
      </div>
      <div class="flex items-center space-x-2">
        <UiRadioGroupItem id="r3" value="compact" />
        <UiLabel for="r3">Compact</UiLabel>
      </div>
    </UiRadioGroup>
  </div>
</template>
