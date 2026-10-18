<template>
  <!--
    Infinite logo marquee with key numbers
    Features: Endlessly scrolling wordmarks with edge fades that pause on hover and respect reduced motion, three headline numbers underneath
  -->
  <section class="overflow-hidden py-16 lg:py-24">
    <UiContainer>
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-3 text-lg">{{ props.description }}</p>
      </div>
    </UiContainer>

    <div
      class="marquee mt-12 mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <ul class="marquee-track flex w-max items-center gap-14 pr-14">
        <li
          v-for="(logo, i) in [...props.logos, ...props.logos]"
          :key="`${logo.name}-${i}`"
          class="text-muted-foreground hover:text-foreground flex shrink-0 items-center gap-2 text-2xl font-semibold transition-colors"
          :aria-hidden="i >= props.logos.length"
        >
          <Icon :name="logo.icon" class="size-7" />
          {{ logo.name }}
        </li>
      </ul>
    </div>

    <UiContainer>
      <dl class="mt-14 grid gap-8 text-center sm:grid-cols-3">
        <div v-for="stat in props.stats" :key="stat.label" class="flex flex-col-reverse gap-1">
          <dt class="text-muted-foreground text-sm">{{ stat.label }}</dt>
          <dd class="text-4xl font-bold tracking-tight">{{ stat.value }}</dd>
        </div>
      </dl>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  type Logo = { name: string; icon: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      logos?: Logo[];
      stats?: { value: string; label: string }[];
    }>(),
    {
      title: "Powering teams of every size",
      description: "From two person startups to global enterprises.",
      logos: () => [
        { name: "Acme", icon: "lucide:hexagon" },
        { name: "Northwind", icon: "lucide:compass" },
        { name: "Vertex", icon: "lucide:triangle" },
        { name: "Lumen", icon: "lucide:sun" },
        { name: "Orbit", icon: "lucide:orbit" },
        { name: "Pulse", icon: "lucide:activity" },
        { name: "Nimbus", icon: "lucide:cloud" },
        { name: "Quanta", icon: "lucide:atom" },
      ],
      stats: () => [
        { value: "10,000+", label: "Companies worldwide" },
        { value: "5M+", label: "Monthly active users" },
        { value: "99.9%", label: "Customer satisfaction" },
      ],
    }
  );
</script>

<style scoped>
  .marquee-track {
    animation: marquee-scroll 40s linear infinite;
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
