<template>
  <div class="flex items-center justify-center">
    <UiLabel>
      <p class="mb-3 text-sm font-medium">Enter OTP sent to your email</p>
      <UiPinInput @complete="toast({ title: 'Complete' })" :inputCount="5" type="number" />
    </UiLabel>
  </div>
</template>
