<template>
  <!--
    Bordered logo grid with a heading
    Features: Heading and supporting copy above a grid of hairline bordered logo cells that stagger in and lift their logo on hover, two columns on mobile and four on desktop
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{{ props.title }}</h2>
      <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
    </div>
    <ul class="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border md:grid-cols-4">
      <Motion
        v-for="(logo, i) in props.logos"
        :key="logo.name"
        as="li"
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.4, delay: i * 0.05 }"
        class="group bg-card relative flex h-28 items-center justify-center border-r border-b p-6 [&:nth-child(2n)]:max-md:border-r-0 md:[&:nth-child(4n)]:border-r-0 max-md:[&:nth-last-child(-n+2)]:border-b-0 md:[&:nth-last-child(-n+4)]:border-b-0"
      >
        <span
          class="text-muted-foreground group-hover:text-foreground flex items-center gap-2 text-xl font-semibold transition-all duration-300 group-hover:-translate-y-0.5"
        >
          <Icon :name="logo.icon" class="size-6" />
          {{ logo.name }}
        </span>
      </Motion>
    </ul>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Logo = { name: string; icon: string };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; logos?: Logo[] }>(),
    {
      title: "Trusted by industry leaders",
      description: "Over 4,000 teams use us to plan, ship and grow.",
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
    }
  );
</script>
