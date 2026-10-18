<template>
  <!--
    Compact striped table with caption and footer totals
    Features: Dense rows, zebra striping, right aligned tabular numbers, change indicators, caption and a totals row
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-2xl font-bold tracking-tight">{{ title }}</h1>
      <p class="text-muted-foreground mt-2">{{ description }}</p>

      <div class="mt-6 overflow-hidden rounded-lg border">
        <UiTable class="text-sm">
          <UiTableCaption class="sr-only">Revenue by region for the current quarter</UiTableCaption>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="h-9">Region</UiTableHead>
              <UiTableHead class="h-9 text-right">Revenue</UiTableHead>
              <UiTableHead class="h-9 text-right">Orders</UiTableHead>
              <UiTableHead class="h-9 text-right">Change</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="row in regions" :key="row.name" class="even:bg-muted/40">
              <UiTableCell class="py-1.5 font-medium">{{ row.name }}</UiTableCell>
              <UiTableCell class="py-1.5 text-right tabular-nums">
                {{ money.format(row.revenue) }}
              </UiTableCell>
              <UiTableCell class="py-1.5 text-right tabular-nums">{{ row.orders }}</UiTableCell>
              <UiTableCell class="py-1.5 text-right tabular-nums">
                <span
                  class="inline-flex items-center gap-1"
                  :class="
                    row.change >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  "
                >
                  <Icon
                    :name="row.change >= 0 ? 'lucide:trending-up' : 'lucide:trending-down'"
                    class="size-3.5"
                  />
                  {{ row.change > 0 ? "+" : "" }}{{ row.change }}%
                </span>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
          <UiTableFooter>
            <UiTableRow>
              <UiTableCell class="py-2">Total</UiTableCell>
              <UiTableCell class="py-2 text-right tabular-nums">
                {{ money.format(totals.revenue) }}
              </UiTableCell>
              <UiTableCell class="py-2 text-right tabular-nums">{{ totals.orders }}</UiTableCell>
              <UiTableCell />
            </UiTableRow>
          </UiTableFooter>
        </UiTable>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Region = { name: string; revenue: number; orders: number; change: number };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      regions?: Region[];
    }>(),
    {
      title: "Revenue by region",
      description: "A dense, scannable summary for the current quarter.",
      regions: () => [
        { name: "North America", revenue: 482300, orders: 3120, change: 12.4 },
        { name: "Europe", revenue: 318950, orders: 2204, change: 6.1 },
        { name: "Asia Pacific", revenue: 267400, orders: 1986, change: 18.7 },
        { name: "Latin America", revenue: 94200, orders: 741, change: -2.3 },
        { name: "Middle East & Africa", revenue: 61800, orders: 468, change: 4.9 },
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const totals = computed(() => ({
    revenue: props.regions.reduce((sum, row) => sum + row.revenue, 0),
    orders: props.regions.reduce((sum, row) => sum + row.orders, 0),
  }));
</script>
