<template>
  <!--
    Plan picker for a first time user
    Features: Billing period toggle with a savings badge, three selectable plan cards with a recommended badge, feature checklists, price that follows the period and a continue button that names the plan
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-4xl text-center">
      <h1 class="text-3xl font-bold tracking-tight">Choose how you want to start</h1>
      <p class="text-muted-foreground mt-2">You can switch plans or cancel at any time.</p>

      <div class="mt-6 inline-flex items-center gap-3">
        <UiLabel for="yearly" class="cursor-pointer">Monthly</UiLabel>
        <UiSwitch id="yearly" v-model="yearly" aria-label="Bill yearly" />
        <UiLabel for="yearly" class="cursor-pointer">
          Yearly
          <UiBadge variant="soft" color="green" shape="pill">Save 20%</UiBadge>
        </UiLabel>
      </div>
    </div>

    <UiRadioGroup
      v-model="selected"
      class="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3"
      aria-label="Plan"
    >
      <label
        v-for="plan in plans"
        :key="plan.value"
        :for="`plan-${plan.value}`"
        class="has-data-[state=checked]:border-primary has-data-[state=checked]:ring-primary/30 relative flex cursor-pointer flex-col rounded-xl border p-6 transition has-data-[state=checked]:ring-4"
      >
        <UiBadge v-if="plan.recommended" class="absolute -top-2.5 left-6">Recommended</UiBadge>
        <span class="flex items-center justify-between">
          <span class="text-lg font-semibold">{{ plan.name }}</span>
          <UiRadioGroupItem :id="`plan-${plan.value}`" :value="plan.value" />
        </span>
        <span class="mt-3 flex items-baseline gap-1">
          <span class="text-3xl font-bold tabular-nums">${{ price(plan) }}</span>
          <span class="text-muted-foreground text-sm">/ user / month</span>
        </span>
        <span class="text-muted-foreground mt-2 text-sm">{{ plan.description }}</span>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2">
            <Icon name="lucide:check" class="text-primary mt-0.5 size-4 shrink-0" />
            {{ feature }}
          </li>
        </ul>
      </label>
    </UiRadioGroup>

    <div class="mt-8 flex justify-center">
      <UiButton size="lg" @click="useSonner.success(`Started on the ${current.name} plan`)">
        Continue with {{ current.name }}
      </UiButton>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Plan = {
    value: string;
    name: string;
    monthly: number;
    description: string;
    features: string[];
    recommended?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      plans?: Plan[];
    }>(),
    {
      plans: () => [
        {
          value: "free",
          name: "Free",
          monthly: 0,
          description: "For trying things out.",
          features: ["Up to 3 projects", "Basic reporting", "Community support"],
        },
        {
          value: "pro",
          name: "Pro",
          monthly: 12,
          description: "For individuals and small teams.",
          features: ["Unlimited projects", "Advanced reporting", "Priority email support"],
          recommended: true,
        },
        {
          value: "team",
          name: "Team",
          monthly: 24,
          description: "For growing companies.",
          features: ["Everything in Pro", "SSO and audit logs", "Dedicated success manager"],
        },
      ],
    }
  );

  const yearly = ref(true);
  const selected = ref("pro");

  function price(plan: Plan) {
    return Math.round(plan.monthly * (yearly.value ? 0.8 : 1));
  }

  const current = computed(
    () => props.plans.find((plan) => plan.value === selected.value) ?? props.plans[0]!
  );
</script>
