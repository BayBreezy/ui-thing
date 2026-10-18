<template>
  <!--
    Wide table with a sticky header and sticky first column
    Features: Scroll container with a fixed height, header that stays on top, first column pinned on horizontal scroll, tabular numbers and a pinned totals row
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
    <p class="text-muted-foreground mt-2">{{ description }}</p>

    <div
      class="mt-8 max-h-96 overflow-auto rounded-xl border"
      tabindex="0"
      role="region"
      aria-label="Monthly revenue by product, scrollable"
    >
      <table class="w-full min-w-[56rem] caption-bottom text-sm">
        <thead class="bg-background sticky top-0 z-20">
          <tr class="border-b">
            <th class="bg-background sticky left-0 z-30 h-10 px-4 text-left font-medium">
              Product
            </th>
            <th
              v-for="month in months"
              :key="month"
              class="text-muted-foreground h-10 px-4 text-right font-medium whitespace-nowrap"
            >
              {{ month }}
            </th>
            <th class="h-10 px-4 text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.name" class="hover:bg-muted/50 border-b last:border-0">
            <th
              class="bg-background sticky left-0 z-10 px-4 py-3 text-left font-medium whitespace-nowrap"
              scope="row"
            >
              {{ row.name }}
            </th>
            <td
              v-for="(value, index) in row.values"
              :key="index"
              class="px-4 py-3 text-right tabular-nums"
            >
              {{ money.format(value) }}
            </td>
            <td class="px-4 py-3 text-right font-medium tabular-nums">
              {{ money.format(rowTotal(row.values)) }}
            </td>
          </tr>
        </tbody>
        <tfoot class="bg-muted sticky bottom-0 z-20">
          <tr class="border-t font-medium">
            <th class="bg-muted sticky left-0 z-30 px-4 py-3 text-left">Total</th>
            <td
              v-for="(total, index) in columnTotals"
              :key="index"
              class="px-4 py-3 text-right tabular-nums"
            >
              {{ money.format(total) }}
            </td>
            <td class="px-4 py-3 text-right tabular-nums">{{ money.format(grandTotal) }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Row = { name: string; values: number[] };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      months?: string[];
      rows?: Row[];
    }>(),
    {
      title: "Monthly revenue",
      description:
        "Scroll sideways and down. The header, the first column and the totals stay put.",
      months: () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      rows: () => [
        {
          name: "Starter plan",
          values: [4200, 4350, 4600, 4720, 4980, 5100, 5320, 5410, 5680, 5900],
        },
        {
          name: "Team plan",
          values: [9800, 10200, 10850, 11400, 12100, 12650, 13200, 13900, 14500, 15200],
        },
        {
          name: "Business plan",
          values: [18200, 19100, 19800, 21400, 22900, 23800, 25100, 26400, 27900, 29300],
        },
        {
          name: "Enterprise",
          values: [42000, 42000, 45500, 45500, 51000, 51000, 58000, 58000, 64500, 64500],
        },
        { name: "Add-ons", values: [1200, 1350, 1280, 1500, 1620, 1710, 1890, 2010, 2140, 2300] },
        { name: "Services", values: [6500, 5200, 7800, 6100, 8400, 7200, 9100, 8300, 9800, 9400] },
        { name: "Marketplace", values: [800, 920, 1100, 1250, 1400, 1580, 1720, 1900, 2150, 2400] },
        { name: "Training", values: [2100, 1800, 2600, 2200, 3100, 2700, 3400, 2900, 3800, 3500] },
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  function rowTotal(values: number[]) {
    return values.reduce((sum, value) => sum + value, 0);
  }

  const columnTotals = computed(() =>
    props.months.map((_, index) =>
      props.rows.reduce((sum, row) => sum + (row.values[index] ?? 0), 0)
    )
  );

  const grandTotal = computed(() => columnTotals.value.reduce((sum, value) => sum + value, 0));
</script>
