<template>
  <div class="space-y-6">
    <UiVeeInput v-model="url" label="Enter URL" placeholder="https://..." />

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- Medium QR Code -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Medium Size</h3>
        <div class="flex justify-center rounded-lg border border-border p-4">
          <UiQRCode :value="url" size="md" />
        </div>
      </div>

      <!-- Large QR Code with Gradient -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Large with Gradient</h3>
        <div class="relative flex justify-center rounded-lg border border-border p-4">
          <UiQRCode :value="url" size="lg"> </UiQRCode>
          <UiQRCodeGradientScan />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const url = ref("https://example.com");
</script>
