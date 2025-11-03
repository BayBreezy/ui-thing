<template>
  <!-- 
    Values Grid About Section
    Features: Grid showcasing company values
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Our Core Values</h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
        The principles that guide everything we do
      </p>
    </div>

    <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="value in values"
        :key="value.title"
        class="group rounded-2xl border bg-card p-8 transition-colors hover:border-primary/50"
      >
        <div
          class="flex size-14 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110"
        >
          <Icon :name="value.icon" class="size-7 text-primary" />
        </div>
        <h3 class="mt-6 text-xl font-semibold">{{ value.title }}</h3>
        <p class="mt-3 text-muted-foreground">{{ value.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const values = [
    {
      icon: "lucide:heart",
      title: "Customer Obsessed",
      description:
        "We put our customers at the heart of every decision, constantly striving to exceed their expectations and deliver exceptional value.",
    },
    {
      icon: "lucide:zap",
      title: "Innovation First",
      description:
        "We embrace change and constantly seek new ways to improve, innovate, and push the boundaries of what's possible.",
    },
    {
      icon: "lucide:shield-check",
      title: "Integrity Always",
      description:
        "We operate with transparency, honesty, and ethical practices in all our interactions and business dealings.",
    },
    {
      icon: "lucide:users",
      title: "Collaborative Spirit",
      description:
        "We believe in the power of teamwork and diverse perspectives to create better solutions and drive success.",
    },
    {
      icon: "lucide:trophy",
      title: "Excellence Driven",
      description:
        "We set high standards for ourselves and are committed to delivering quality in everything we create.",
    },
    {
      icon: "lucide:leaf",
      title: "Sustainable Growth",
      description:
        "We're committed to responsible growth that benefits our team, customers, and the planet for the long term.",
    },
  ];
</script>
