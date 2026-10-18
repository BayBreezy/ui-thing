<template>
  <!--
    Table toolbar with a date range filter
    Features: Preset date range select, search, orders filtered against a fixed reference date, revenue summary for the range and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <div class="relative">
          <UiLabel for="range-search" class="sr-only">Search orders</UiLabel>
          <Icon
            name="lucide:search"
            class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput
            id="range-search"
            v-model="query"
            placeholder="Search orders"
            class="pl-9 sm:w-56"
          />
        </div>
        <UiSelect v-model="range">
          <UiSelectTrigger class="sm:w-44" aria-label="Date range">
            <Icon name="lucide:calendar" class="size-4" />
            <UiSelectValue />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem v-for="option in ranges" :key="option.value" :value="option.value">
              {{ option.label }}
            </UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <UiCard>
        <UiCardHeader>
          <UiCardDescription>Orders in range</UiCardDescription>
          <UiCardTitle class="text-2xl tabular-nums">{{ rows.length }}</UiCardTitle>
        </UiCardHeader>
      </UiCard>
      <UiCard>
        <UiCardHeader>
          <UiCardDescription>Revenue in range</UiCardDescription>
          <UiCardTitle class="text-2xl tabular-nums">{{ money.format(revenue) }}</UiCardTitle>
        </UiCardHeader>
      </UiCard>
    </div>

    <div class="mt-4 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Order</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Customer</UiTableHead>
            <UiTableHead>Date</UiTableHead>
            <UiTableHead class="text-right">Total</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="order in rows" :key="order.id">
            <UiTableCell class="font-medium">{{ order.id }}</UiTableCell>
            <UiTableCell class="hidden sm:table-cell">{{ order.customer }}</UiTableCell>
            <UiTableCell class="text-muted-foreground whitespace-nowrap">
              {{ formatDate(order.date) }}
            </UiTableCell>
            <UiTableCell class="text-right tabular-nums">{{
              money.format(order.total)
            }}</UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!rows.length" :colspan="4"
            >No orders in this date range.</UiTableEmpty
          >
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Order = { id: string; customer: string; date: string; total: number };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      /** The date the ranges count back from (ISO). Use today's date in your own app. */
      today?: string;
      orders?: Order[];
    }>(),
    {
      title: "Orders",
      description: "Filter by date range and watch the totals update.",
      today: "2026-10-18",
      orders: () => [
        { id: "AR-48213", customer: "Hannah Lee", date: "2026-10-16", total: 248.4 },
        { id: "AR-48190", customer: "Marco Rossi", date: "2026-10-12", total: 96 },
        { id: "AR-48122", customer: "Priya Nair", date: "2026-10-03", total: 412.75 },
        { id: "AR-47980", customer: "Lukas Meyer", date: "2026-09-21", total: 58.2 },
        { id: "AR-47811", customer: "Chloe Martin", date: "2026-09-02", total: 189 },
        { id: "AR-47402", customer: "Tomás Silva", date: "2026-08-14", total: 321.5 },
        { id: "AR-46955", customer: "Aisha Khan", date: "2026-06-30", total: 74.9 },
      ],
    }
  );

  const ranges = [
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "90", label: "Last 90 days" },
    { value: "all", label: "All time" },
  ];

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const query = ref("");
  const range = ref("30");

  const rows = computed(() => {
    const term = query.value.trim().toLowerCase();
    const end = new Date(props.today).getTime();
    return props.orders.filter((order) => {
      const age = (end - new Date(order.date).getTime()) / 86_400_000;
      const inRange = range.value === "all" || (age >= 0 && age <= Number(range.value));
      return (
        inRange &&
        (!term ||
          order.id.toLowerCase().includes(term) ||
          order.customer.toLowerCase().includes(term))
      );
    });
  });

  const revenue = computed(() => rows.value.reduce((sum, order) => sum + order.total, 0));

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  }
</script>
