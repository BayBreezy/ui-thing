<template>
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="mb-4 text-3xl font-semibold lg:text-4xl">Flexible pricing to fit your needs</h2>
      <p class="text-lg text-muted-foreground">
        Whether you're a solopreneur or a large enterprise, we have a plan for you.
      </p>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-16 xl:grid-cols-4">
      <template v-for="(p, i) in prices" :key="i">
        <div
          class="flex flex-col rounded-lg border p-6"
          :class="[p.highlighted ? 'border-primary shadow-lg' : 'bg-card']"
        >
          <div class="mb-6 flex-1">
            <div class="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
              <Icon :name="p.icon" class="size-6 text-primary" />
            </div>
            <h3 class="mb-2 text-xl font-bold">{{ p.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ p.description }}</p>
          </div>

          <div class="mb-6">
            <div v-if="p.price !== 'Custom'" class="flex items-baseline gap-1">
              <span class="text-4xl font-bold">${{ p.price }}</span>
              <span class="text-muted-foreground">/month</span>
            </div>
            <div v-else>
              <span class="text-4xl font-bold">{{ p.price }}</span>
            </div>
          </div>

          <UiButton class="mb-6 w-full" :variant="p.highlighted ? 'default' : 'outline'">
            {{ p.cta }}
          </UiButton>

          <div class="border-t pt-6">
            <p class="mb-3 text-xs font-semibold text-muted-foreground uppercase">Key features</p>
            <ul class="space-y-2">
              <li v-for="(feature, k) in p.features" :key="k" class="flex items-start gap-2">
                <Icon name="lucide:check" class="mt-0.5 size-4 shrink-0 text-primary" />
                <span class="text-sm">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const prices = [
    {
      title: "Free",
      description: "Get started at no cost",
      price: 0,
      cta: "Sign up free",
      icon: "lucide:gift",
      highlighted: false,
      features: ["1 user", "5GB storage", "Basic features", "Community support"],
    },
    {
      title: "Starter",
      description: "For small projects",
      price: 12,
      cta: "Start trial",
      icon: "lucide:zap",
      highlighted: false,
      features: ["5 users", "50GB storage", "Standard features", "Email support"],
    },
    {
      title: "Pro",
      description: "Most popular choice",
      price: 39,
      cta: "Start trial",
      icon: "lucide:star",
      highlighted: true,
      features: [
        "25 users",
        "500GB storage",
        "Advanced features",
        "Priority support",
        "Integrations",
      ],
    },
    {
      title: "Enterprise",
      description: "For large teams",
      price: "Custom",
      cta: "Contact us",
      icon: "lucide:building",
      highlighted: false,
      features: [
        "Unlimited users",
        "Unlimited storage",
        "Custom features",
        "Dedicated support",
        "SLA",
      ],
    },
  ];
</script>
