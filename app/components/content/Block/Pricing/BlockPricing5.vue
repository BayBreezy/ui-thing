<template>
  <div class="bg-muted/30 py-16 lg:py-24">
    <UiContainer>
      <div class="mx-auto max-w-[760px] text-center">
        <h2 class="mb-4 text-3xl font-semibold lg:text-4xl">Choose your plan</h2>
        <p class="text-muted-foreground text-lg">
          Start building for free, then add a site plan to go live. Account plans unlock additional
          features.
        </p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-3">
        <template v-for="(p, i) in prices" :key="i">
          <div class="bg-card relative rounded-lg border p-8">
            <UiBadge
              v-if="p.popular"
              class="absolute -top-3 left-1/2 -translate-x-1/2"
              variant="default"
              >Most popular</UiBadge
            >
            <div class="mb-6">
              <h3 class="mb-2 text-2xl font-bold">{{ p.title }}</h3>
              <p class="text-muted-foreground text-sm">{{ p.description }}</p>
            </div>
            <div class="mb-6">
              <p class="mb-1 text-4xl font-bold">${{ p.price }}</p>
              <p class="text-muted-foreground text-sm">per user, per month</p>
            </div>
            <UiButton class="mb-6 w-full" :variant="p.popular ? 'default' : 'outline'">
              {{ p.cta }}
            </UiButton>
            <div class="space-y-3">
              <p class="text-sm font-semibold">What's included:</p>
              <ul class="space-y-3">
                <li v-for="(feature, k) in p.features" :key="k" class="flex items-start gap-3">
                  <Icon name="lucide:check" class="text-primary mt-0.5 size-5 shrink-0" />
                  <span class="text-sm">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  const prices = [
    {
      title: "Starter",
      description: "Perfect for trying out our platform",
      price: 0,
      cta: "Start for free",
      popular: false,
      features: [
        "Up to 5 users",
        "Basic analytics",
        "Community support",
        "1GB storage",
        "Email notifications",
      ],
    },
    {
      title: "Professional",
      description: "For growing teams and businesses",
      price: 29,
      cta: "Get started",
      popular: true,
      features: [
        "Up to 50 users",
        "Advanced analytics",
        "Priority support",
        "50GB storage",
        "Custom integrations",
        "Advanced reporting",
      ],
    },
    {
      title: "Enterprise",
      description: "For large organizations",
      price: 99,
      cta: "Contact sales",
      popular: false,
      features: [
        "Unlimited users",
        "Custom analytics",
        "Dedicated support",
        "Unlimited storage",
        "API access",
        "SLA guarantee",
        "Custom onboarding",
      ],
    },
  ];
</script>
