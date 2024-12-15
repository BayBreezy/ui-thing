<template>
  <div class="flex items-center justify-center">
    <UiButton @click="triggerConfetti()">Side Cannon</UiButton>
  </div>
</template>

<script lang="ts" setup>
  const triggerConfetti = () => {
    const colors = ["#bb0000", "#0000ee"];
    const end = Date.now() + 5 * 1000;
    function frame() {
      useConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      useConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  };
</script>
