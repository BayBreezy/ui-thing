<template>
  <div class="flex items-center justify-center">
    <UiButton @click="triggerConfetti()">Trigger Emojis</UiButton>
  </div>
</template>

<script lang="ts" setup>
  const triggerConfetti = () => {
    const scalar = 2;
    const unicorn = useConfetti.shapeFromText({ text: "🦄", scalar });
    const stars = useConfetti.shapeFromText({ text: "✨", scalar });
    const sparkles = useConfetti.shapeFromText({ text: "🌟", scalar });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [unicorn, stars, sparkles],
      scalar,
    };

    function shoot() {
      useConfetti({
        ...defaults,
        particleCount: 30,
      });

      useConfetti({
        ...defaults,
        particleCount: 5,
      });

      useConfetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };
</script>
