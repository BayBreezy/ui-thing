<template>
  <section id="pricing" class="container py-20 md:py-32">
    <div class="mx-auto max-w-4xl text-center">
      <UiBadge variant="outline" size="lg" class="mb-4">
        <span>Pricing</span>
      </UiBadge>
      <h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Simple, transparent pricing
      </h2>
      <p class="text-muted-foreground mb-12 text-lg">Choose the plan that's right for you</p>
    </div>

    <div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
      <UiCard
        v-for="plan in plans"
        :key="plan.name"
        :class="[
          'relative flex flex-col',
          plan.featured && 'shadow-primary/10 shadow-lg md:scale-105',
        ]"
      >
        <UiBorderBeam
          v-if="plan.featured"
          :size="400"
          :duration="10"
          class="via-primary from-transparent to-transparent"
        />
        <UiCardHeader>
          <UiBadge v-if="plan.featured" variant="default" class="mb-2 w-fit">
            Most Popular
          </UiBadge>
          <UiCardTitle class="text-2xl">{{ plan.name }}</UiCardTitle>
          <UiCardDescription>{{ plan.description }}</UiCardDescription>
          <div class="mt-4">
            <span class="text-4xl font-bold">${{ plan.price }}</span>
            <span class="text-muted-foreground">/{{ plan.period }}</span>
          </div>
        </UiCardHeader>
        <UiCardContent class="flex-1">
          <ul class="space-y-3">
            <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2">
              <UiIcon name="lucide:check" class="text-primary mt-0.5 size-5 shrink-0" />
              <span class="text-sm">{{ feature }}</span>
            </li>
          </ul>
        </UiCardContent>
        <UiCardFooter>
          <UiButton :variant="plan.featured ? 'default' : 'outline'" class="w-full" size="lg">
            {{ plan.cta }}
          </UiButton>
        </UiCardFooter>
      </UiCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  const plans = [
    {
      name: "Free",
      description: "Perfect for personal projects and trying things out",
      price: 0,
      period: "forever",
      cta: "Get Started",
      featured: false,
      features: [
        "60+ UI Components",
        "Basic documentation",
        "Community support",
        "Regular updates",
        "Open source",
      ],
    },
    {
      name: "Pro",
      description: "For professional developers and small teams",
      price: 29,
      period: "month",
      cta: "Start Free Trial",
      featured: true,
      features: [
        "Everything in Free",
        "100+ UI Blocks",
        "Premium templates",
        "Priority support",
        "Advanced examples",
        "Custom themes",
        "Commercial license",
      ],
    },
    {
      name: "Enterprise",
      description: "For large teams with advanced needs",
      price: 99,
      period: "month",
      cta: "Contact Sales",
      featured: false,
      features: [
        "Everything in Pro",
        "Dedicated support",
        "Custom components",
        "Training sessions",
        "SLA guarantee",
        "On-premise hosting",
        "Custom integrations",
      ],
    },
  ];
</script>
