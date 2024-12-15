<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[150px]">
      <UiNumberField
        :default-value="0.1"
        :min="0"
        :max="1"
        :step="0.01"
        :format-options="{
          style: 'percent',
        }"
      />
    </div>
  </div>
</template>
