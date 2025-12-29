<template>
  <div class="flex items-center justify-center">
    <UiQRCode value="https://uithing.com" size="lg">
      <template #top-left>
        <UiQRCodeFrameHandle class="absolute top-0 left-0 border-blue-500" />
      </template>
      <template #top-right>
        <UiQRCodeFrameHandle class="absolute top-0 right-0 rotate-90 border-emerald-500" />
      </template>
      <template #bottom-right>
        <UiQRCodeFrameHandle class="absolute right-0 bottom-0 rotate-180 border-red-500" />
      </template>
      <template #bottom-left>
        <UiQRCodeFrameHandle class="absolute bottom-0 left-0 -rotate-90 border-yellow-500" />
      </template>
    </UiQRCode>
  </div>
</template>
