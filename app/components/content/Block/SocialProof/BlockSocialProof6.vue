<template>
  <!--
    Two row marquee scrolling in opposite directions
    Features: Heading with a button, two rows of logo pills that drift in opposite directions with edge fades, pause on hover and stop for reduced motion
  -->
  <section class="overflow-hidden py-16 lg:py-24">
    <UiContainer>
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
        <UiButton class="mt-6" variant="outline">
          Read customer stories
          <Icon name="lucide:arrow-right" class="size-4" />
        </UiButton>
      </div>
    </UiContainer>

    <div
      class="marquee mt-12 space-y-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <ul
        v-for="(row, r) in rows"
        :key="r"
        class="marquee-track flex w-max gap-4 pr-4"
        :class="r === 1 ? 'marquee-reverse' : ''"
      >
        <li
          v-for="(logo, i) in [...row, ...row]"
          :key="`${logo.name}-${i}`"
          class="bg-card text-muted-foreground flex shrink-0 items-center gap-2 rounded-full border px-5 py-3 text-lg font-semibold"
          :aria-hidden="i >= row.length"
        >
          <Icon :name="logo.icon" class="size-5" />
          {{ logo.name }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
  type Logo = { name: string; icon: string };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; logos?: Logo[] }>(),
    {
      title: "Loved by builders everywhere",
      description: "Thousands of teams ship with us every day.",
      logos: () => [
        { name: "Acme", icon: "lucide:hexagon" },
        { name: "Northwind", icon: "lucide:compass" },
        { name: "Vertex", icon: "lucide:triangle" },
        { name: "Lumen", icon: "lucide:sun" },
        { name: "Orbit", icon: "lucide:orbit" },
        { name: "Pulse", icon: "lucide:activity" },
        { name: "Nimbus", icon: "lucide:cloud" },
        { name: "Quanta", icon: "lucide:atom" },
        { name: "Fable", icon: "lucide:book-open" },
        { name: "Summit", icon: "lucide:mountain" },
        { name: "Verdant", icon: "lucide:leaf" },
        { name: "Bolt", icon: "lucide:zap" },
      ],
    }
  );

  const half = Math.ceil(props.logos.length / 2);
  const rows = [props.logos.slice(0, half), props.logos.slice(half)];
</script>

<style scoped>
  .marquee-track {
    animation: marquee-scroll 45s linear infinite;
  }
  .marquee-reverse {
    animation-direction: reverse;
  }
  .marquee:hover .marquee-track {
    animation-play-state: paused;
  }
  @keyframes marquee-scroll {
    to {
      transform: translateX(-50%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .marquee-track {
      animation: none;
    }
  }
</style>
