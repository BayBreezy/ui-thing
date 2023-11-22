<template>
  <div class="flex w-full justify-center">
    <UiRadioGroup defaultValue="comfortable">
      <div class="flex items-center space-x-2">
        <UiRadioGroupItem value="default" id="r1" />
        <UiLabel for="r1">Default</UiLabel>
      </div>
      <div class="flex items-center space-x-2">
        <UiRadioGroupItem value="comfortable" id="r2" />
        <UiLabel for="r2">Comfortable</UiLabel>
      </div>
      <div class="flex items-center space-x-2">
        <UiRadioGroupItem value="compact" id="r3" />
        <UiLabel for="r3">Compact</UiLabel>
      </div>
    </UiRadioGroup>
  </div>
</template>
