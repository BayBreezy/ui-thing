<template>
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-4xl">
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-3xl font-semibold lg:text-4xl">Simple, straightforward pricing</h2>
        <p class="text-muted-foreground text-lg">No contracts. No surprise fees. Cancel anytime.</p>
      </div>

      <div class="mb-8 flex items-center justify-center gap-3">
        <span :class="[!isAnnual ? 'font-semibold' : 'text-muted-foreground']">Monthly</span>
        <UiSwitch v-model="isAnnual" />
        <span :class="[isAnnual ? 'font-semibold' : 'text-muted-foreground']">
          Annual
          <UiBadge class="ml-2" variant="secondary">Save 20%</UiBadge>
        </span>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <template v-for="(p, i) in prices" :key="i">
          <div class="bg-card rounded-lg border p-6">
            <h3 class="mb-2 text-xl font-bold">{{ p.title }}</h3>
            <p class="text-muted-foreground mb-6 text-sm">{{ p.description }}</p>

            <div class="mb-6">
              <div class="flex items-baseline gap-1">
                <span class="text-4xl font-bold"
                  >${{ isAnnual ? p.annualPrice : p.monthlyPrice }}</span
                >
                <span class="text-muted-foreground">/mo</span>
              </div>
              <AnimatePresence>
                <Motion
                  v-if="isAnnual"
                  :initial="{ opacity: 0, height: 0 }"
                  :animate="{ opacity: 1, height: 'auto' }"
                  :exit="{ opacity: 0, height: 0 }"
                  as="p"
                  class="text-muted-foreground mt-1 text-xs"
                >
                  Billed as ${{ p.annualPrice * 12 }} annually
                </Motion>
              </AnimatePresence>
            </div>

            <UiButton class="mb-6 w-full" :variant="i === 1 ? 'default' : 'outline'">
              Get started
            </UiButton>

            <ul class="space-y-3">
              <li v-for="(feature, k) in p.features" :key="k" class="flex items-center gap-3">
                <Icon name="lucide:check" class="text-primary size-4 shrink-0" />
                <span class="text-sm">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </template>
      </div>

      <p class="text-muted-foreground mt-8 text-center text-sm">
        All plans include a 30-day money-back guarantee.
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const isAnnual = ref(false);

  const prices = [
    {
      title: "Hobby",
      description: "For personal projects",
      monthlyPrice: 9,
      annualPrice: 7,
      features: [
        "5 projects",
        "10GB storage",
        "Community support",
        "Basic analytics",
        "SSL certificate",
      ],
    },
    {
      title: "Team",
      description: "For small teams",
      monthlyPrice: 29,
      annualPrice: 23,
      features: [
        "Unlimited projects",
        "100GB storage",
        "Priority support",
        "Advanced analytics",
        "Custom domain",
        "Team collaboration",
      ],
    },
    {
      title: "Business",
      description: "For larger organizations",
      monthlyPrice: 79,
      annualPrice: 63,
      features: [
        "Everything in Team",
        "1TB storage",
        "Phone support",
        "SSO & SAML",
        "Advanced security",
        "SLA guarantee",
        "Dedicated manager",
      ],
    },
  ];
</script>
