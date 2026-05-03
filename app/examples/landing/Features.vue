<template>
  <section id="features" class="container py-20 md:py-32">
    <div class="mx-auto max-w-4xl text-center">
      <UiBadge variant="outline" size="lg" class="mb-4">
        <span>Features</span>
      </UiBadge>
      <h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Everything you need to build faster
      </h2>
      <p class="text-muted-foreground mb-12 text-lg">
        A comprehensive toolkit designed for modern web applications
      </p>
    </div>

    <div class="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
      <UiCard v-for="feature in features" :key="feature.title" class="relative overflow-hidden">
        <UiCardHeader>
          <UiFancyIcon :icon="feature.icon" theme="gradient" color="primary" />
          <UiCardTitle class="mt-3">{{ feature.title }}</UiCardTitle>
          <UiCardDescription>{{ feature.description }}</UiCardDescription>
        </UiCardHeader>
      </UiCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  const features = [
    {
      title: "Accessible",
      description:
        "Built with accessibility in mind. All components follow WAI-ARIA design patterns and are keyboard navigable.",
      icon: "lucide:accessibility",
    },
    {
      title: "Customizable",
      description:
        "Fully customizable with TailwindCSS. Change colors, spacing, and styles to match your brand.",
      icon: "lucide:palette",
    },
    {
      title: "Dark Mode",
      description:
        "Built-in dark mode support with multiple themes. Switch between light and dark with ease.",
      icon: "lucide:moon",
    },
    {
      title: "TypeScript",
      description:
        "Written in TypeScript with full type definitions. Enjoy autocomplete and type safety.",
      icon: "lucide:code-2",
    },
    {
      title: "Responsive",
      description: "Mobile-first design that looks great on all devices. Test on any screen size.",
      icon: "lucide:smartphone",
    },
    {
      title: "Copy & Paste",
      description: "No package installation needed. Copy the code and paste it into your project.",
      icon: "lucide:clipboard",
    },
  ];
</script>
