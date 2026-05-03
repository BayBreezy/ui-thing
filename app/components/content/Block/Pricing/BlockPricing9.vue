<template>
  <div
    class="bg-background text-foreground min-h-screen py-16 [--color-primary:#6366f1] [--primary:#6366f1] [--radius:10px] [--ring:#6366f1] lg:py-24"
  >
    <UiContainer>
      <!-- Header -->
      <Motion
        :initial="{ opacity: 0, y: -16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, ease: 'easeOut' }"
        class="mx-auto max-w-2xl text-center"
      >
        <UiBadge variant="outline" class="mb-4 px-3 py-1 text-xs font-medium tracking-wide"
          >Pricing</UiBadge
        >
        <h2 class="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
          Simple, transparent pricing
        </h2>
        <p class="text-muted-foreground text-lg">
          Start for free, scale as you grow. No contracts, no hidden fees — cancel anytime.
        </p>
      </Motion>

      <!-- Billing toggle -->
      <Motion
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
        class="mt-10 flex items-center justify-center gap-3"
      >
        <span
          class="text-sm font-medium transition-colors"
          :class="[!isAnnual ? 'text-foreground' : 'text-muted-foreground']"
          >Monthly</span
        >
        <UiSwitch v-model="isAnnual" />
        <span
          class="flex items-center gap-2 text-sm font-medium transition-colors"
          :class="[isAnnual ? 'text-foreground' : 'text-muted-foreground']"
        >
          Annual
          <AnimatePresence>
            <Motion
              v-if="isAnnual"
              :initial="{ opacity: 0, scale: 0.75 }"
              :animate="{ opacity: 1, scale: 1 }"
              :exit="{ opacity: 0, scale: 0.75 }"
              :transition="{ duration: 0.2, ease: 'easeOut' }"
            >
              <UiBadge
                variant="outline"
                class="border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400"
                >Save 25%</UiBadge
              >
            </Motion>
          </AnimatePresence>
        </span>
      </Motion>

      <!-- Pricing cards -->
      <Motion
        initial="initial"
        animate="animate"
        :variants="containerVariant"
        class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-16"
      >
        <Motion
          v-for="plan in plans"
          :key="plan.title"
          :variants="cardVariant"
          class="relative flex flex-col rounded-2xl border p-8"
          :class="[
            plan.highlighted
              ? 'border-primary bg-primary/5 shadow-primary/10 ring-primary shadow-xl ring-1'
              : 'border-border bg-card',
          ]"
        >
          <!-- Recommended badge -->
          <div
            v-if="plan.highlighted"
            class="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <UiBadge class="px-3 py-1 text-xs font-semibold shadow" variant="default"
              >Recommended</UiBadge
            >
          </div>

          <!-- Plan name & description -->
          <div class="mb-6">
            <h3 class="mb-1 text-xl font-bold">{{ plan.title }}</h3>
            <p class="text-muted-foreground text-sm">{{ plan.description }}</p>
          </div>

          <!-- Price display -->
          <div class="mb-8">
            <div v-if="plan.monthlyPrice !== null" class="flex items-baseline gap-1">
              <span class="text-5xl font-extrabold tracking-tight">
                ${{ isAnnual ? plan.annualPrice : plan.monthlyPrice }}
              </span>
              <span class="text-muted-foreground text-sm">/mo</span>
            </div>
            <div v-else>
              <span class="text-4xl font-extrabold tracking-tight">Custom</span>
            </div>
            <AnimatePresence>
              <Motion
                v-if="isAnnual && plan.monthlyPrice !== null"
                :initial="{ opacity: 0, height: 0 }"
                :animate="{ opacity: 1, height: 'auto' }"
                :exit="{ opacity: 0, height: 0 }"
                :transition="{ duration: 0.25, ease: 'easeOut' }"
                as="p"
                class="text-muted-foreground mt-1 overflow-hidden text-xs"
              >
                Billed as ${{ (plan.annualPrice ?? 0) * 12 }}/yr
              </Motion>
            </AnimatePresence>
          </div>

          <!-- CTA button -->
          <UiButton
            class="mb-8 w-full"
            size="lg"
            :variant="plan.highlighted ? 'default' : 'outline'"
          >
            {{ plan.cta }}
          </UiButton>

          <!-- Feature list -->
          <ul class="flex-1 space-y-3">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex items-start gap-3 text-sm"
            >
              <Icon
                name="heroicons:check-circle-solid"
                class="mt-0.5 size-5 shrink-0"
                :class="[plan.highlighted ? 'text-primary' : 'text-muted-foreground']"
              />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </Motion>
      </Motion>

      <!-- Social proof row -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.55, ease: 'easeOut' }"
        class="border-border mt-20 border-t pt-12"
      >
        <p class="text-muted-foreground mb-8 text-center text-sm">
          Trusted by teams at world-class companies
        </p>
        <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <div
            v-for="brand in brands"
            :key="brand.name"
            class="text-muted-foreground/50 hover:text-muted-foreground flex items-center gap-2 transition-colors duration-200"
          >
            <Icon :name="brand.icon" class="size-6 shrink-0" />
            <span class="text-base font-semibold tracking-tight">{{ brand.name }}</span>
          </div>
        </div>
      </Motion>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  import { AnimatePresence, Motion } from "motion-v";

  const isAnnual = ref(false);

  const containerVariant = {
    initial: {},
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const cardVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const plans = [
    {
      title: "Free",
      description: "Perfect for side projects and early-stage experimentation.",
      monthlyPrice: 0,
      annualPrice: 0,
      cta: "Get started for free",
      highlighted: false,
      features: [
        "Up to 3 projects",
        "5 GB storage",
        "Community support",
        "Basic analytics dashboard",
        "SSL certificate included",
      ],
    },
    {
      title: "Pro",
      description: "Everything your growing team needs to move faster.",
      monthlyPrice: 32,
      annualPrice: 24,
      cta: "Start 14-day free trial",
      highlighted: true,
      features: [
        "Unlimited projects",
        "100 GB storage",
        "Priority email & chat support",
        "Advanced analytics & reports",
        "Custom domains & webhooks",
        "Role-based access control",
      ],
    },
    {
      title: "Enterprise",
      description: "Dedicated infrastructure and support for large organisations.",
      monthlyPrice: null,
      annualPrice: null,
      cta: "Contact sales",
      highlighted: false,
      features: [
        "Everything in Pro",
        "Unlimited storage & bandwidth",
        "Dedicated account manager",
        "SSO & SAML authentication",
        "99.99% uptime SLA guarantee",
        "Custom onboarding & training",
      ],
    },
  ];

  const brands = [
    { name: "Vercel", icon: "heroicons:globe-alt" },
    { name: "Stripe", icon: "heroicons:credit-card" },
    { name: "GitHub", icon: "heroicons:code-bracket-square" },
    { name: "Notion", icon: "heroicons:document-text" },
    { name: "Linear", icon: "heroicons:chart-bar" },
  ];
</script>
