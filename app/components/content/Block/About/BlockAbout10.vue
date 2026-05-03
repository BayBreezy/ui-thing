<template>
  <!-- 
    Culture & Values About Section
    Features: Comprehensive culture showcase
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Our Culture & Values</h2>
      <p class="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
        What makes us unique and drives our success
      </p>
    </div>

    <div class="mt-12 grid gap-8 lg:grid-cols-2">
      <div>
        <h3 class="text-2xl font-bold">Culture First</h3>
        <p class="text-muted-foreground mt-4">
          We believe that a strong culture is the foundation of success. Our workplace is built on
          trust, respect, and a shared commitment to excellence.
        </p>

        <div class="mt-8 space-y-6">
          <div v-for="benefit in benefits" :key="benefit.title" class="flex gap-4">
            <Icon :name="benefit.icon" class="text-muted-foreground size-4" />
            <div>
              <h4 class="leading-none font-semibold">{{ benefit.title }}</h4>
              <p class="text-muted-foreground mt-1.5 text-sm">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <UiCard v-for="culture in culturePoints" :key="culture.title">
          <UiCardContent>
            <div class="flex items-start gap-4">
              <div
                class="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-xl"
              >
                <Icon :name="culture.icon" class="text-primary size-6" />
              </div>
              <div>
                <h4 class="font-semibold">{{ culture.title }}</h4>
                <p class="text-muted-foreground mt-2 text-sm">{{ culture.description }}</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <UiBadge
                    v-for="tag in culture.tags"
                    :key="tag"
                    variant="secondary"
                    class="text-xs"
                  >
                    {{ tag }}
                  </UiBadge>
                </div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const benefits = [
    {
      icon: "lucide:home",
      title: "Remote-First",
      description: "Work from anywhere with flexible hours and unlimited PTO",
    },
    {
      icon: "lucide:graduation-cap",
      title: "Learning Budget",
      description: "$5,000 annual budget for courses, conferences, and certifications",
    },
    {
      icon: "lucide:heart-pulse",
      title: "Health & Wellness",
      description: "Comprehensive health insurance and mental health support",
    },
    {
      icon: "lucide:sparkles",
      title: "Career Growth",
      description: "Clear paths for advancement with regular reviews and mentorship",
    },
  ];

  const culturePoints = [
    {
      icon: "lucide:users",
      title: "Diversity & Inclusion",
      description:
        "We celebrate differences and create an environment where everyone feels valued and heard.",
      tags: ["Inclusive", "Equal Opportunity", "Belonging"],
    },
    {
      icon: "lucide:lightbulb",
      title: "Innovation & Experimentation",
      description:
        "We encourage trying new things, learning from failures, and pushing boundaries.",
      tags: ["Creative", "Bold", "Forward-Thinking"],
    },
    {
      icon: "lucide:handshake",
      title: "Transparency & Trust",
      description:
        "Open communication, honest feedback, and building trust at every level of the organization.",
      tags: ["Open", "Honest", "Accountable"],
    },
  ];
</script>
