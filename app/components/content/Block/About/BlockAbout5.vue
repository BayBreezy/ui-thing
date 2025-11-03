<template>
  <!-- 
    Stats Highlight About Section
    Features: Key statistics with prominent numbers
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">About Us in Numbers</h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
        Our achievements speak for themselves
      </p>
    </div>

    <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <UiCard v-for="stat in stats" :key="stat.label" class="text-center">
        <UiCardContent class="flex flex-col items-center justify-center">
          <div
            class="flex size-16 items-center justify-center rounded-full bg-linear-to-b from-primary/50 via-transparent"
          >
            <Icon :name="stat.icon" class="size-8 text-primary" />
          </div>
          <div class="mt-4 text-4xl font-bold text-primary">{{ stat.value }}</div>
          <div class="mt-2 text-sm font-medium">{{ stat.label }}</div>
          <p class="mt-2 text-xs text-muted-foreground">{{ stat.description }}</p>
        </UiCardContent>
      </UiCard>
    </div>

    <div class="mx-auto mt-16 max-w-3xl text-center">
      <p class="text-lg text-pretty text-muted-foreground">
        We're a dynamic team of creators, thinkers, and doers committed to delivering exceptional
        results. Our diverse backgrounds and shared passion for excellence drive us to continuously
        innovate and exceed expectations.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const stats = [
    {
      icon: "lucide:users",
      value: "500+",
      label: "Team Members",
      description: "Talented professionals worldwide",
    },
    {
      icon: "lucide:building",
      value: "50K+",
      label: "Happy Clients",
      description: "Businesses we've helped grow",
    },
    {
      icon: "lucide:award",
      value: "25+",
      label: "Awards Won",
      description: "Industry recognition",
    },
    {
      icon: "lucide:globe",
      value: "40+",
      label: "Countries",
      description: "Global presence",
    },
  ];
</script>
