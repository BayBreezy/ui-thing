<template>
  <!-- 
    Mission Vision About Section
    Features: Side-by-side mission and vision cards
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Mission & Vision</h2>
      <p class="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
        Our purpose and where we're headed
      </p>
    </div>

    <div class="mt-12 grid gap-8 lg:grid-cols-2">
      <template v-for="(item, i) in items" :key="i">
        <UiCard class="group relative overflow-hidden border-0">
          <div
            class="bg-primary/10 absolute top-0 right-0 size-32 translate-x-8 -translate-y-8 rounded-full transition-all duration-300 group-hover:size-44"
          />
          <UiCardContent class="relative">
            <div
              class="from-primary/30 flex size-16 items-center justify-center rounded-full bg-linear-to-b via-transparent to-transparent"
            >
              <Icon :name="item.icon" class="text-primary size-8" />
            </div>
            <h3 class="mt-6 text-2xl font-bold">{{ item.title }}</h3>
            <p class="text-muted-foreground mt-4">
              {{ item.description }}
            </p>
            <ul class="mt-6 space-y-3">
              <template v-for="point in item.points" :key="point">
                <li class="flex items-start gap-3">
                  <Icon name="lucide:sparkles" class="text-primary mt-0.5 size-5 shrink-0" />
                  <span class="text-sm">{{ point }}</span>
                </li>
              </template>
            </ul>
          </UiCardContent>
          <UiBorderBeam
            :duration="20"
            class="via-primary from-transparent to-transparent opacity-0 group-hover:opacity-100"
            :size="200"
          />
        </UiCard>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      title: "Our Mission",
      description:
        "To empower businesses worldwide with innovative technology solutions that drive growth, efficiency, and sustainable success. We're committed to delivering exceptional value through cutting-edge products and unparalleled customer service.",
      icon: "lucide:target",
      points: [
        "Deliver world-class solutions",
        "Foster innovation and creativity",
        "Build lasting customer relationships",
      ],
    },
    {
      title: "Our Vision",
      description:
        "To be the global leader in our industry, recognized for transforming how businesses operate through technology. We envision a future where our solutions enable every organization to reach its full potential.",
      icon: "lucide:eye",
      points: [
        "Shape the future of technology",
        "Expand to 100+ countries",
        "Impact 1 million businesses",
      ],
    },
  ];
</script>
