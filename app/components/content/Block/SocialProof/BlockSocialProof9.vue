<template>
  <!--
    Always dark logo cloud with a glow
    Features: Dark panel that keeps its look in light and dark mode, heading on the left, two by four logo grid on the right, soft radial glow behind
  -->
  <UiContainer class="py-14 lg:py-20">
    <div
      class="relative overflow-hidden rounded-3xl bg-neutral-950 px-6 py-14 text-white ring-1 ring-white/15 sm:px-12 lg:px-16"
    >
      <div
        class="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-indigo-500/30 blur-3xl"
        aria-hidden="true"
      />
      <div class="relative grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {{ props.title }}
          </h2>
          <p class="mt-4 text-lg text-neutral-400">{{ props.description }}</p>
          <UiButton class="mt-6 bg-white text-neutral-950 hover:bg-white/90">
            Explore customers
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
        </div>
        <ul class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
          <li
            v-for="logo in props.logos"
            :key="logo.name"
            class="flex h-24 flex-col items-center justify-center gap-2 bg-neutral-950 text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Icon :name="logo.icon" class="size-6" />
            <span class="text-sm font-semibold">{{ logo.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Logo = { name: string; icon: string };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; logos?: Logo[] }>(),
    {
      title: "The teams behind the best products use us",
      description:
        "From early stage startups to public companies, we are the quiet part of great launches.",
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
