<template>
  <div class="flex items-center justify-center">
    <UiButton @click="triggerConfetti()">Random Direction</UiButton>
  </div>
</template>

<script lang="ts" setup>
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  const triggerConfetti = () => {
    useConfetti({
      angle: randomInRange(55, 360),
      spread: randomInRange(50, 360),
      particleCount: randomInRange(50, 360),
      origin: { y: 0.6 },
    });
  };
</script>
