<template>
  <div class="mx-auto flex max-w-100 flex-col items-center gap-8">
    <UiVeeInput v-model="qrValue" label="QR Code Value" placeholder="Enter URL or text" />

    <UiQRCode :value="qrValue" size="lg" />
  </div>
</template>

<script lang="ts" setup>
  const qrValue = ref("https://uithing.com");
</script>
