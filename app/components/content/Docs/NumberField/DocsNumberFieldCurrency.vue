<template>
  <div class="flex w-full items-center justify-center">
    <div class="max-w-[250px]">
      <UiNumberField
        :default-value="20000"
        :min="0"
        :format-options="{
          style: 'currency',
          currency: 'JMD',
        }"
      />
    </div>
  </div>
</template>
