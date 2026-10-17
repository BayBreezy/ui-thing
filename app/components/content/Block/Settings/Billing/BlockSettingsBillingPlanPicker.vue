<template>
  <!--
    Plan picker for the billing settings page
    Features: Monthly and annual toggle with savings badge, radio plan cards with feature lists, current plan marker, computed total
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
      <UiCardAction>
        <div class="flex items-center gap-2 text-sm">
          <span :class="!annual && 'font-medium'">Monthly</span>
          <UiSwitch v-model="annual" aria-label="Bill annually" />
          <span :class="annual && 'font-medium'">Annual</span>
          <UiBadge variant="success">Save 20%</UiBadge>
        </div>
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent>
      <UiRadioGroup v-model="selected" class="grid gap-4 lg:grid-cols-3">
        <label
          v-for="plan in plans"
          :key="plan.id"
          class="relative flex cursor-pointer flex-col rounded-xl border-2 p-5 transition-colors"
          :class="selected === plan.id ? 'border-primary bg-primary/5' : 'hover:border-ring'"
        >
          <div class="flex items-start justify-between gap-2">
            <div>
              <p class="font-semibold">{{ plan.name }}</p>
              <p class="text-muted-foreground text-sm">{{ plan.tagline }}</p>
            </div>
            <UiRadioGroupItem :value="plan.id" />
          </div>
          <p class="mt-4 flex items-baseline gap-1">
            <span class="text-3xl font-bold">${{ price(plan) }}</span>
            <span class="text-muted-foreground text-sm">/ month</span>
          </p>
          <ul class="mt-4 space-y-2 text-sm">
            <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-2">
              <Icon name="lucide:check" class="text-primary size-4 shrink-0" />
              {{ feature }}
            </li>
          </ul>
          <UiBadge v-if="plan.id === current" variant="outline" class="mt-4 w-fit">
            Current plan
          </UiBadge>
        </label>
      </UiRadioGroup>
    </UiCardContent>
    <UiCardFooter class="flex-wrap justify-between gap-4 border-t">
      <p class="text-muted-foreground text-sm">
        {{ summary }}
      </p>
      <UiButton :disabled="selected === current" @click="confirm">Switch plan</UiButton>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  type Plan = {
    id: string;
    name: string;
    tagline: string;
    monthly: number;
    features: string[];
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      current?: string;
    }>(),
    {
      title: "Choose a plan",
      description: "Upgrade, downgrade or switch billing period at any time.",
      current: "pro",
    }
  );

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      tagline: "For side projects",
      monthly: 9,
      features: ["3 projects", "2 seats", "Community support"],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "For growing teams",
      monthly: 29,
      features: ["50 projects", "10 seats", "Priority support", "Advanced analytics"],
    },
    {
      id: "business",
      name: "Business",
      tagline: "For larger organisations",
      monthly: 79,
      features: ["Unlimited projects", "50 seats", "SSO and audit logs", "Dedicated manager"],
    },
  ];

  const annual = ref(false);
  const selected = ref(props.current);

  function price(plan: Plan) {
    return annual.value ? Math.round(plan.monthly * 0.8) : plan.monthly;
  }

  const summary = computed(() => {
    const plan = plans.find((item) => item.id === selected.value);
    if (!plan) return "";
    const total = price(plan) * (annual.value ? 12 : 1);
    return `${plan.name}: $${total} billed ${annual.value ? "yearly" : "monthly"}.`;
  });

  function confirm() {
    useSonner.success("Plan updated", { description: summary.value });
  }
</script>
