<template>
  <div class="flex items-center justify-center">
    <UiButton @click="triggerConfetti()">Trigger Snow</UiButton>
  </div>
</template>

<script lang="ts" setup>
  const triggerConfetti = () => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    let skew = 1;

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function frame() {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      useConfetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: Math.random() * skew - 0.2,
        },
        colors: useColorMode().value === "dark" ? ["#ffffff"] : ["#000000"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  };
</script>
