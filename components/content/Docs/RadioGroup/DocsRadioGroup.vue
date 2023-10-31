<template>
  <div class="flex w-full justify-center">
    <UIRadioGroup defaultValue="comfortable">
      <div class="flex items-center space-x-2">
        <UIRadioGroupItem value="default" id="r1" />
        <UILabel for="r1">Default</UILabel>
      </div>
      <div class="flex items-center space-x-2">
        <UIRadioGroupItem value="comfortable" id="r2" />
        <UILabel for="r2">Comfortable</UILabel>
      </div>
      <div class="flex items-center space-x-2">
        <UIRadioGroupItem value="compact" id="r3" />
        <UILabel for="r3">Compact</UILabel>
      </div>
    </UIRadioGroup>
  </div>
</template>
