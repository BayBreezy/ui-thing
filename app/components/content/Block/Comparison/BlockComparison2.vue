<template>
  <!--
    Plan comparison cards with differences
    Features: Plan cards with the price and a button, specs lined up in rows under each card, a most popular badge and a switch that hides the rows where every plan is the same so you only see the differences
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Pick your plan</h1>
          <p class="text-muted-foreground mt-2">
            Every plan includes the basics. Compare what changes.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UiSwitch id="differences" v-model="onlyDifferences" />
          <UiLabel for="differences" class="text-sm font-normal">Show only differences</UiLabel>
        </div>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <UiCard
          v-for="plan in plans"
          :key="plan.name"
          class="gap-4"
          :class="plan.popular ? 'border-primary ring-primary/20 ring-4' : ''"
        >
          <UiCardHeader>
            <div class="flex items-center justify-between gap-2">
              <UiCardTitle>{{ plan.name }}</UiCardTitle>
              <UiBadge v-if="plan.popular" variant="solid" color="blue" shape="pill"
                >Most popular</UiBadge
              >
            </div>
            <p class="text-3xl font-bold tabular-nums">
              ${{ plan.price
              }}<span class="text-muted-foreground text-sm font-normal"> / month</span>
            </p>
            <UiCardDescription>{{ plan.blurb }}</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <ul class="divide-y text-sm" aria-live="polite">
              <li
                v-for="row in rows"
                :key="row.label"
                class="flex items-center justify-between gap-3 py-2.5"
              >
                <span class="text-muted-foreground">{{ row.label }}</span>
                <span class="font-medium">{{ row.values[plans.indexOf(plan)] }}</span>
              </li>
            </ul>
          </UiCardContent>
          <UiCardFooter>
            <UiButton
              class="w-full"
              :variant="plan.popular ? 'default' : 'outline'"
              @click="useSonner.success(`${plan.name} selected`)"
              >Choose {{ plan.name }}</UiButton
            >
          </UiCardFooter>
        </UiCard>
      </div>
      <p class="text-muted-foreground mt-4 text-center text-sm" aria-live="polite">
        {{
          onlyDifferences
            ? `Showing ${rows.length} of ${specs.length} rows that differ.`
            : `Showing all ${specs.length} rows.`
        }}
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Plan = { name: string; price: number; blurb: string; popular?: boolean };
  type Spec = { label: string; values: string[] };

  const props = withDefaults(
    defineProps<{
      plans?: Plan[];
      specs?: Spec[];
    }>(),
    {
      plans: () => [
        { name: "Starter", price: 9, blurb: "For individuals getting going." },
        { name: "Team", price: 29, blurb: "For small teams that ship together.", popular: true },
        { name: "Scale", price: 79, blurb: "For companies with more needs." },
      ],
      specs: () => [
        { label: "Uptime guarantee", values: ["99.9%", "99.9%", "99.9%"] },
        { label: "Projects", values: ["10", "Unlimited", "Unlimited"] },
        { label: "Seats", values: ["1", "10", "50"] },
        { label: "API requests", values: ["10k / day", "100k / day", "1M / day"] },
        { label: "Data export", values: ["CSV", "CSV", "CSV"] },
        { label: "Support", values: ["Email", "Email", "Priority"] },
        { label: "Audit log", values: ["No", "No", "Yes"] },
      ],
    }
  );

  const onlyDifferences = ref(false);
  const rows = computed(() =>
    onlyDifferences.value
      ? props.specs.filter((spec) => new Set(spec.values).size > 1)
      : props.specs
  );
</script>
