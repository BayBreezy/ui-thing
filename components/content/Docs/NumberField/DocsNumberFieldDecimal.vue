<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[150px]">
      <UiNumberField
        :default-value="5"
        :min="0"
        :format-options="{
          signDisplay: 'exceptZero',
          minimumFractionDigits: 1,
        }"
      />
    </div>
  </div>
</template>
