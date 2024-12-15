<template>
  <UiContainer class="relative py-16 lg:py-24">
    <div class="mx-auto max-w-[760px] text-center">
      <p class="font-semibold text-primary">Pricing</p>
      <h2 class="mb-4 mt-3 text-3xl font-semibold lg:mb-6 lg:text-4xl">
        Plans that fit your scale
      </h2>
      <p class="text-lg text-muted-foreground lg:text-xl">
        Simple, transparent pricing that grows with you. Try any plan free for 30 days.
      </p>
    </div>

    <UiTabs class="mx-auto mt-5 w-full md:w-[450px] lg:mt-7" default-value="monthly">
      <UiTabsList class="grid h-auto w-full grid-cols-2">
        <UiTabsTrigger class="h-10" value="monthly">Monthly billing</UiTabsTrigger>
        <UiTabsTrigger class="h-10" value="annual"
          >Annual Billing
          <UiBadge class="ml-2 hidden lg:block" variant="outline">Save 20%</UiBadge></UiTabsTrigger
        >
      </UiTabsList>
    </UiTabs>

    <div class="grid grid-cols-1 gap-y-10 py-10 lg:grid-cols-2 lg:gap-8 lg:gap-y-12 lg:py-20">
      <template v-for="(p, i) in prices" :key="i">
        <UiCard class="overflow-hidden">
          <UiCardContent class="w-full px-0">
            <div
              class="flex flex-col-reverse gap-4 border-b px-6 pb-6 lg:flex-row lg:justify-between"
            >
              <div>
                <p class="text-xl font-semibold lg:text-2xl">
                  {{ p.title }} plan
                  <UiBadge
                    v-if="i == prices.length - 1"
                    class="ml-2 border-primary/50 text-primary"
                    variant="outline"
                    >Popular</UiBadge
                  >
                </p>
                <p class="mt-1 text-muted-foreground">{{ p.description }}</p>
              </div>
              <div>
                <p class="text-5xl/snug font-bold lg:text-5xl/snug">
                  ${{ p.price }}<span class="text-base font-normal">per month</span>
                </p>
              </div>
            </div>
            <div class="px-6 pt-6">
              <p class="font-semibold uppercase">Features</p>
              <p class="mt-2 text-muted-foreground">Below is the list of features offered</p>
            </div>

            <ul class="grid w-full grid-cols-1 gap-4 px-5 pt-8 md:grid-cols-2 lg:py-8">
              <li v-for="(perk, k) in p.perks" :key="k" class="flex items-center gap-3">
                <Icon name="heroicons:check-circle" class="h-6 w-6 shrink-0 text-primary" />
                <span class="opacity-80">{{ perk }}</span>
              </li>
            </ul>
          </UiCardContent>
          <UiCardFooter class="border-t !pt-6 dark:border-muted/50">
            <UiButton class="w-full"> Get started </UiButton>
          </UiCardFooter>
        </UiCard>
      </template>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const prices = [
    {
      icon: "heroicons:bolt",
      title: "Basic",
      description: "For small teams or office",
      price: 10,
      perks: [
        "Access to all basic features",
        "Basic reporting and analytics",
        "Up to 10 individual users",
        "20GB individual data each user",
        "Basic chat and email support",
        "Attend events",
        "Automatic updates",
        "Backup your account",
        "Audit log and notes",
        "Feature requests",
      ],
    },
    {
      icon: "heroicons:bolt",
      title: "Business",
      description: "Advanced features and reporting",
      price: 20,
      perks: [
        "200+ integrations",
        "Advanced reporting",
        "Up to 20 individual users",
        "40GB individual data each user",
        "Priority chat and email support",
        "Advanced custom fields",
        "Audit log and data history",
        "Unlimited individual users",
        "Unlimited individual data",
        "Personalised+priotity service",
      ],
    },
  ];
</script>
