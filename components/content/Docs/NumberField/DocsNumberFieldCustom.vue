<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[150px]">
      <UiNumberField :min="0">
        <UiNumberFieldInput placeholder="15" />
        <UiNumberFieldDecrement class="border-l" />
        <UiNumberFieldIncrement class="border-l" />
      </UiNumberField>
    </div>
  </div>
</template>
