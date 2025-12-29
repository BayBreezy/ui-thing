<template>
  <div class="flex items-center justify-center">
    <UiQRCode
      value="https://example.com"
      size="lg"
      :options="{
        backgroundOptions: { color: 'var(--color-background)', round: 0.1 },
        image: '/icon.png',
        imageOptions: { margin: 4, hideBackgroundDots: true },
        dotsOptions: {
          color: 'var(--color-indigo-500)',
          type: 'dots',
        },
        cornersSquareOptions: {
          color: 'var(--color-green-500)',
          type: 'dot',
          gradient: {
            type: 'linear',
            rotation: 45,
            colorStops: [
              { offset: 0, color: 'var(--color-purple-500)' },
              { offset: 1, color: 'var(--color-pink-500)' },
            ],
          },
        },
        cornersDotOptions: {
          type: 'dot',
          gradient: {
            type: 'radial',
            colorStops: [
              { offset: 0, color: 'var(--color-cyan-50)' },
              { offset: 1, color: 'var(--color-indigo-500)' },
            ],
          },
        },
      }"
    />
  </div>
</template>
