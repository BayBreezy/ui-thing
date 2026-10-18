<template>
  <!--
    API key usage
    Features: Totals for requests, errors and the busiest key, a time range select, a row for each key with its request count and error rate, a bar against the rate limit that turns amber and red near the limit, sorting by requests or errors and a note for keys that have not been used
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Usage</UiCardTitle>
      <UiCardDescription>How your keys were used in the selected period.</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="space-y-5">
      <div class="flex flex-wrap gap-2">
        <UiSelect v-model="sort">
          <UiSelectTrigger class="w-36" aria-label="Sort keys"><UiSelectValue /></UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="requests">Most requests</UiSelectItem>
            <UiSelectItem value="errors">Highest error rate</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
        <UiSelect v-model="range">
          <UiSelectTrigger class="w-32" aria-label="Time range"><UiSelectValue /></UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="1">24 hours</UiSelectItem>
            <UiSelectItem value="7">7 days</UiSelectItem>
            <UiSelectItem value="30">30 days</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>
      <dl class="grid gap-3 sm:grid-cols-3">
        <div v-for="item in totals" :key="item.label" class="rounded-lg border p-4">
          <dt class="text-muted-foreground text-xs">{{ item.label }}</dt>
          <dd class="mt-1 text-xl font-bold tabular-nums">{{ item.value }}</dd>
        </div>
      </dl>
      <ul class="divide-y rounded-lg border" aria-live="polite">
        <li v-for="row in rows" :key="row.id" class="grid gap-2 px-4 py-3">
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p class="min-w-0 flex-1 truncate text-sm font-medium">{{ row.name }}</p>
            <p class="text-sm tabular-nums">
              {{ number(row.requests) }} <span class="text-muted-foreground">requests</span>
            </p>
            <p
              class="w-24 text-right text-sm tabular-nums"
              :class="row.errorRate > 2 ? 'text-destructive font-medium' : 'text-muted-foreground'"
            >
              {{ row.errorRate.toFixed(1) }}% errors
            </p>
          </div>
          <template v-if="row.requests > 0">
            <div
              class="bg-muted h-1.5 overflow-hidden rounded-full"
              role="progressbar"
              :aria-valuenow="row.usage"
              aria-valuemin="0"
              aria-valuemax="100"
              :aria-label="`${row.name} rate limit used`"
            >
              <div
                class="h-full rounded-full"
                :class="
                  row.usage >= 90 ? 'bg-red-500' : row.usage >= 70 ? 'bg-amber-500' : 'bg-primary'
                "
                :style="{ width: `${row.usage}%` }"
              />
            </div>
            <p class="text-muted-foreground text-xs">
              {{ row.usage }}% of the rate limit at the busiest time
            </p>
          </template>
          <p v-else class="text-muted-foreground text-xs">
            Not used in this period. Consider revoking it.
          </p>
        </li>
      </ul>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  type Row = { id: number; name: string; daily: number; errorRate: number; peak: number };

  const props = withDefaults(
    defineProps<{
      keys?: Row[];
    }>(),
    {
      keys: () => [
        { id: 1, name: "Production server", daily: 48_200, errorRate: 0.4, peak: 62 },
        { id: 2, name: "Mobile app", daily: 21_900, errorRate: 3.8, peak: 91 },
        { id: 3, name: "CI pipeline", daily: 1_240, errorRate: 1.1, peak: 18 },
        { id: 4, name: "Old integration", daily: 0, errorRate: 0, peak: 0 },
      ],
    }
  );

  const range = ref("7");
  const sort = ref("requests");

  const number = (value: number) => value.toLocaleString("en-US");
  const rows = computed(() =>
    props.keys
      .map((key) => ({
        id: key.id,
        name: key.name,
        requests: key.daily * Number(range.value),
        errorRate: key.errorRate,
        usage: key.peak,
      }))
      .sort((a, b) =>
        sort.value === "requests" ? b.requests - a.requests : b.errorRate - a.errorRate
      )
  );
  const totals = computed(() => {
    const requests = rows.value.reduce((sum, row) => sum + row.requests, 0);
    const errors = rows.value.reduce((sum, row) => sum + row.requests * (row.errorRate / 100), 0);
    return [
      { label: "Requests", value: number(requests) },
      { label: "Errors", value: number(Math.round(errors)) },
      {
        label: "Busiest key",
        value: rows.value.slice().sort((a, b) => b.requests - a.requests)[0]?.name ?? "None",
      },
    ];
  });
</script>
