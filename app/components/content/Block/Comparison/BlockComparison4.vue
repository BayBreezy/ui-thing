<template>
  <!--
    Matrix with a billing toggle
    Features: A monthly and yearly switch that changes the price row and shows the yearly saving, a feature matrix under the prices, a plan you can select with a radio group that highlights its column and one button that follows the selected plan
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight lg:text-4xl">Choose a plan</h1>
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
      </div>

      <UiRadioGroup
        v-model="picked"
        class="relative mt-8 overflow-x-auto rounded-xl border"
        aria-label="Plan"
      >
        <div class="min-w-[40rem]">
          <div class="grid grid-cols-[1.4fr_repeat(3,1fr)] border-b">
            <div />
            <label
              v-for="plan in plans"
              :key="plan.id"
              class="has-[[data-state=checked]]:bg-primary/5 flex cursor-pointer flex-col items-center gap-1 border-l p-4 text-center"
            >
              <UiRadioGroupItem :value="plan.id" :aria-label="plan.name" />
              <span class="font-semibold">{{ plan.name }}</span>
              <span class="text-2xl font-bold tabular-nums">{{ money(price(plan)) }}</span>
              <span class="text-muted-foreground text-xs"
                >per month{{ yearly ? ", billed yearly" : "" }}</span
              >
            </label>
          </div>
          <div
            v-for="row in rows"
            :key="row.name"
            class="grid grid-cols-[1.4fr_repeat(3,1fr)] border-b text-sm last:border-b-0"
          >
            <div class="px-4 py-3 font-medium">{{ row.name }}</div>
            <div
              v-for="(value, index) in row.values"
              :key="index"
              class="flex items-center justify-center border-l px-2 py-3"
              :class="plans[index]?.id === picked ? 'bg-primary/5' : ''"
            >
              <template v-if="typeof value === 'boolean'">
                <Icon
                  :name="value ? 'lucide:check' : 'lucide:minus'"
                  class="size-5"
                  :class="value ? 'text-green-500' : 'text-muted-foreground'"
                />
                <span class="sr-only">{{ value ? "Included" : "Not included" }}</span>
              </template>
              <span v-else>{{ value }}</span>
            </div>
          </div>
        </div>
      </UiRadioGroup>

      <div class="mt-6 flex flex-col items-center gap-2" aria-live="polite">
        <p class="text-sm">
          {{ chosen.name }}: <span class="font-semibold">{{ money(billed) }}</span>
          {{ yearly ? "per year" : "per month" }}
          <span v-if="yearly" class="text-muted-foreground">(you save {{ money(saved) }})</span>
        </p>
        <UiButton size="lg" @click="useSonner.success(`Continuing with ${chosen.name}`)"
          >Continue with {{ chosen.name }}</UiButton
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Plan = { id: string; name: string; monthly: number };
  type Row = { name: string; values: (boolean | string)[] };

  const props = withDefaults(
    defineProps<{
      saving?: number;
      plans?: Plan[];
      rows?: Row[];
    }>(),
    {
      saving: 20,
      plans: () => [
        { id: "basic", name: "Basic", monthly: 10 },
        { id: "pro", name: "Pro", monthly: 25 },
        { id: "max", name: "Max", monthly: 60 },
      ],
      rows: () => [
        { name: "Projects", values: ["5", "50", "Unlimited"] },
        { name: "Team members", values: ["2", "10", "50"] },
        { name: "Custom domains", values: [false, true, true] },
        { name: "Advanced analytics", values: [false, true, true] },
        { name: "Priority support", values: [false, false, true] },
      ],
    }
  );

  const yearly = ref(true);
  const picked = ref(props.plans[1]?.id ?? props.plans[0]?.id ?? "");

  const price = (plan: Plan) =>
    yearly.value ? Math.round(plan.monthly * (1 - props.saving / 100) * 100) / 100 : plan.monthly;
  const chosen = computed(
    () => props.plans.find((plan) => plan.id === picked.value) ?? props.plans[0]!
  );
  const billed = computed(() =>
    yearly.value ? Math.round(price(chosen.value) * 12 * 100) / 100 : chosen.value.monthly
  );
  const saved = computed(() => Math.round((chosen.value.monthly * 12 - billed.value) * 100) / 100);
  const money = (value: number) => `$${value.toFixed(2).replace(/\.00$/, "")}`;
</script>
