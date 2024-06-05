<template>
  <div class="flex items-center justify-center">
    <UiLabel class="flex flex-col items-start">
      <p class="mb-3 text-sm font-medium">Enter OTP sent to your email</p>
      <UiPinInput :input-count="5" type="number" @complete="toast({ title: 'Complete' })" />
    </UiLabel>
  </div>
</template>
