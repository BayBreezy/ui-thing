<template>
  <UiContainer class="py-16 lg:py-24">
    <div class="text-center">
      <h2 class="mb-4 text-3xl font-semibold lg:text-4xl">Pricing plans for teams of all sizes</h2>
      <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
        Choose an affordable plan that's packed with the best features for engaging your audience,
        creating customer loyalty, and driving sales.
      </p>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2">
      <template v-for="(p, i) in prices" :key="i">
        <div
          class="relative rounded-lg border p-8"
          :class="[p.featured ? 'border-primary bg-primary/5' : 'bg-card']"
        >
          <div class="flex items-start justify-between">
            <div>
              <h3 class="mb-1 text-xl font-bold">{{ p.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ p.description }}</p>
            </div>
            <UiBadge v-if="p.featured" variant="default">Recommended</UiBadge>
          </div>

          <div class="my-8">
            <div class="flex items-baseline gap-2">
              <span class="text-5xl font-bold">${{ p.price }}</span>
              <span class="text-muted-foreground">/month</span>
            </div>
            <p class="mt-2 text-sm text-muted-foreground">{{ p.billing }}</p>
          </div>

          <div class="mb-8 space-y-4">
            <div v-for="(feature, k) in p.features" :key="k" class="flex items-start gap-3">
              <Icon name="lucide:check-circle-2" class="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p class="font-medium">{{ feature.name }}</p>
                <p class="text-sm text-muted-foreground">{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <UiButton class="w-full" :variant="p.featured ? 'default' : 'outline'">
            {{ p.cta }}
          </UiButton>
        </div>
      </template>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const prices = [
    {
      title: "Basic",
      description: "Everything you need to get started",
      price: 15,
      billing: "Billed monthly",
      cta: "Start free trial",
      featured: false,
      features: [
        {
          name: "Up to 10 team members",
          description: "Add your whole team and collaborate",
        },
        {
          name: "100GB storage",
          description: "Store all your important files",
        },
        {
          name: "Email support",
          description: "Get help when you need it",
        },
        {
          name: "Basic integrations",
          description: "Connect with your favorite tools",
        },
      ],
    },
    {
      title: "Pro",
      description: "Advanced features for power users",
      price: 49,
      billing: "Billed monthly, or $470 yearly",
      cta: "Get started",
      featured: true,
      features: [
        {
          name: "Unlimited team members",
          description: "Scale without worrying about seats",
        },
        {
          name: "1TB storage",
          description: "Never run out of space",
        },
        {
          name: "Priority support",
          description: "Get answers faster with priority access",
        },
        {
          name: "Advanced integrations",
          description: "Connect to any service via API",
        },
        {
          name: "Custom workflows",
          description: "Automate your processes",
        },
      ],
    },
  ];
</script>
