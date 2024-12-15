<template>
  <div class="flex items-center justify-center">
    <UiButton @click="triggerConfetti()">Trigger Basic Cannon</UiButton>
  </div>
</template>

<script lang="ts" setup>
  const triggerConfetti = () => {
    useConfetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };
</script>
