<template>
  <!--
    Centered hero with a gradient headline and a logo strip
    Features: Announcement pill, gradient word in the headline, two buttons, row of customer names styled as logos, soft background glow
  -->
  <section class="relative overflow-hidden">
    <div
      class="from-primary/10 pointer-events-none absolute inset-x-0 top-0 h-96 bg-linear-to-b to-transparent"
      aria-hidden="true"
    />
    <UiContainer class="relative py-20 text-center lg:py-28">
      <Motion
        class="mx-auto max-w-3xl"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 22 }"
      >
        <NuxtLink
          to="#"
          class="bg-background hover:bg-muted group inline-flex items-center gap-2 rounded-full border py-1 pr-3 pl-1 text-sm shadow-xs transition-colors"
        >
          <UiBadge class="rounded-full">New</UiBadge>
          {{ props.badge }}
          <Icon
            name="lucide:chevron-right"
            class="size-3.5 transition-transform group-hover:translate-x-0.5"
          />
        </NuxtLink>
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {{ props.titleStart }}
          <span
            class="from-primary bg-linear-to-r via-indigo-500 to-pink-500 bg-clip-text text-transparent"
          >
            {{ props.titleAccent }}
          </span>
        </h1>
        <p class="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-balance">
          {{ props.description }}
        </p>
        <div class="mt-9 flex flex-wrap justify-center gap-3">
          <slot>
            <UiButton size="lg">
              Start for free
              <Icon name="lucide:arrow-right" class="size-4" />
            </UiButton>
            <UiButton size="lg" variant="outline">
              <Icon name="lucide:play" class="size-4" />
              Watch the demo
            </UiButton>
          </slot>
        </div>
      </Motion>

      <Motion
        class="mx-auto mt-16 max-w-4xl"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.4, duration: 0.6 }"
      >
        <p class="text-muted-foreground text-sm">Trusted by teams at</p>
        <ul
          class="text-muted-foreground/70 mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          <li
            v-for="logo in logos"
            :key="logo.name"
            class="flex items-center gap-2 text-lg font-semibold tracking-tight"
          >
            <Icon :name="logo.icon" class="size-5" />
            {{ logo.name }}
          </li>
        </ul>
      </Motion>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      badge?: string;
      titleStart?: string;
      titleAccent?: string;
      description?: string;
    }>(),
    {
      badge: "Dark mode and custom themes are here",
      titleStart: "The faster way to build",
      titleAccent: "interfaces you own",
      description:
        "Copy accessible, beautifully designed components into your project and make every line yours.",
    }
  );

  const logos = [
    { name: "Northwind", icon: "lucide:compass" },
    { name: "Lumen", icon: "lucide:lightbulb" },
    { name: "Fieldwork", icon: "lucide:wheat" },
    { name: "Hexa", icon: "lucide:hexagon" },
    { name: "Orbit", icon: "lucide:orbit" },
  ];
</script>
