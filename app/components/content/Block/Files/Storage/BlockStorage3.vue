<template>
  <!--
    Storage plan upgrade prompt
    Features: Current usage with a warning when space is nearly full, plan cards with storage and price, a monthly and yearly switch that changes the price and shows the saving, a selected plan state and an upgrade button with a summary
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight">You are running out of space</h1>
        <p class="text-muted-foreground mt-2">
          You have used {{ used }} GB of {{ current }} GB. Pick a plan to keep uploading.
        </p>
        <div class="mx-auto mt-5 max-w-sm">
          <UiProgress :model-value="(used / current) * 100" class="h-2" aria-label="Storage used" />
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-3">
        <span class="text-sm" :class="yearly ? 'text-muted-foreground' : 'font-medium'"
          >Monthly</span
        >
        <UiSwitch v-model="yearly" aria-label="Bill yearly" />
        <span class="text-sm" :class="yearly ? 'font-medium' : 'text-muted-foreground'"
          >Yearly</span
        >
        <UiBadge variant="soft" color="green" shape="pill">Save {{ saving }}%</UiBadge>
      </div>

      <UiRadioGroup v-model="picked" class="mt-6 grid gap-4 sm:grid-cols-2" aria-label="Plan">
        <label
          v-for="plan in plans"
          :key="plan.id"
          class="hover:bg-accent/40 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 relative flex cursor-pointer flex-col gap-3 rounded-2xl border p-5 transition-colors"
        >
          <span class="flex items-start justify-between gap-3">
            <span>
              <span class="block text-lg font-semibold">{{ plan.name }}</span>
              <span class="text-muted-foreground block text-sm">{{ plan.storage }} of storage</span>
            </span>
            <UiRadioGroupItem :value="plan.id" :aria-label="plan.name" />
          </span>
          <span class="text-3xl font-bold tabular-nums">
            {{ money(price(plan))
            }}<span class="text-muted-foreground text-sm font-normal"> / month</span>
          </span>
          <ul class="text-muted-foreground space-y-1.5 text-sm">
            <li v-for="line in plan.features" :key="line" class="flex items-center gap-2">
              <Icon name="lucide:check" class="size-4 shrink-0 text-green-500" />{{ line }}
            </li>
          </ul>
        </label>
      </UiRadioGroup>

      <div class="mt-6 flex flex-col items-center gap-3">
        <p class="text-sm" aria-live="polite">
          {{ chosen.name }}: <span class="font-semibold">{{ money(billed) }}</span> billed
          {{ yearly ? "every year" : "every month" }}
        </p>
        <UiButton size="lg" @click="useSonner.success(`Upgrading to ${chosen.name}`)"
          >Upgrade to {{ chosen.name }}</UiButton
        >
        <UiButton variant="link" size="sm" @click="useSonner.info('Open the storage manager here')"
          >Free up space instead</UiButton
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Plan = { id: string; name: string; storage: string; monthly: number; features: string[] };

  const props = withDefaults(
    defineProps<{
      used?: number;
      current?: number;
      saving?: number;
      plans?: Plan[];
    }>(),
    {
      used: 13.6,
      current: 15,
      saving: 20,
      plans: () => [
        {
          id: "pro",
          name: "Pro",
          storage: "200 GB",
          monthly: 4,
          features: [
            "Version history for 30 days",
            "Share links with passwords",
            "Priority support",
          ],
        },
        {
          id: "business",
          name: "Business",
          storage: "2 TB",
          monthly: 12,
          features: [
            "Version history for 1 year",
            "Admin controls and audit log",
            "Single sign on",
          ],
        },
      ],
    }
  );

  const money = (value: number) => `$${value.toFixed(2).replace(/\.00$/, "")}`;
  const yearly = ref(true);
  const picked = ref(props.plans[0]?.id ?? "");

  const price = (plan: Plan) =>
    yearly.value ? Math.round(plan.monthly * (1 - props.saving / 100) * 100) / 100 : plan.monthly;
  const chosen = computed(
    () => props.plans.find((plan) => plan.id === picked.value) ?? props.plans[0]!
  );
  const billed = computed(() =>
    yearly.value ? Math.round(price(chosen.value) * 12 * 100) / 100 : chosen.value.monthly
  );
</script>
