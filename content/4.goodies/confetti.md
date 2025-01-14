---
title: Confetti
description: Display some confetti effect in your nuxt app.
---

## Credits

Shout out to [Magic UI](https://magicui.design/docs/components/confetti) for the inspiration. I actually discovered this package while browsing their website.

## Getting Started

:::Steps

::Step

### Installation

To get started, you will need to install the package. You can visit the [Canvas Confetti](https://github.com/catdad/canvas-confetti) page for more details... All the details 🙂.

```bash
npm install canvas-confetti
```

::

::Step

### Create Composable

Create a composable in your `composables` directory. You can name it `useConfetti.ts`.

Add this to the file:

```ts
/**
 * Easily add confetti effects to your Nuxt application
 *
 * @see https://github.com/catdad/canvas-confetti
 */
import useConfetti from "canvas-confetti";

export default useConfetti;
```

::

:::

## Usage

### Basic

We can just call the `useConfetti` method to trigger the confetti.

::ShowCase

:DocsConfetti

#code

<!-- automd:file src="../../app/components/content/Docs/Confetti/DocsConfetti.vue" code lang="vue" -->

```vue [DocsConfetti.vue]
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
```

<!-- /automd -->

::

### Random Direction

This is how you can shoot confetti off in a random direction.

::ShowCase

:DocsConfettiRandomDirection

#code

<!-- automd:file src="../../app/components/content/Docs/Confetti/DocsConfettiRandomDirection.vue" code lang="vue" -->

```vue [DocsConfettiRandomDirection.vue]
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
```

<!-- /automd -->

::

### Fireworks

::ShowCase

:DocsConfettiFireworks

#code

<!-- automd:file src="../../app/components/content/Docs/Confetti/DocsConfettiFireworks.vue" code lang="vue" -->

```vue [DocsConfettiFireworks.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButton @click="triggerConfetti()">Fireworks</UiButton>
  </div>
</template>

<script lang="ts" setup>
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      useConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      useConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };
</script>
```

<!-- /automd -->

::

### Stars

::ShowCase

:DocsConfettiStars

#code

<!-- automd:file src="../../app/components/content/Docs/Confetti/DocsConfettiStars.vue" code lang="vue" -->

```vue [DocsConfettiStars.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButton @click="triggerConfetti()">Trigger Stars</UiButton>
  </div>
</template>

<script lang="ts" setup>
  const triggerConfetti = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    };

    function shoot() {
      useConfetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });

      useConfetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };
</script>
```

<!-- /automd -->

::

### Snow

::ShowCase

:DocsConfettiSnow

#code

<!-- automd:file src="../../app/components/content/Docs/Confetti/DocsConfettiSnow.vue" code lang="vue" -->

```vue [DocsConfettiSnow.vue]
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
```

<!-- /automd -->

::

### Side Cannon

::ShowCase

:DocsConfettiSideCannon

#code

<!-- automd:file src="../../app/components/content/Docs/Confetti/DocsConfettiSideCannon.vue" code lang="vue" -->

```vue [DocsConfettiSideCannon.vue]
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
```

<!-- /automd -->

::

### Emoji

::ShowCase

:DocsConfettiEmoji

#code

<!-- automd:file src="../../app/components/content/Docs/Confetti/DocsConfettiEmoji.vue" code lang="vue" -->

```vue [DocsConfettiEmoji.vue]
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
```

<!-- /automd -->

::
