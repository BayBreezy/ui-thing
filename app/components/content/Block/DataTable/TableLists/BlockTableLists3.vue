<template>
  <!--
    Customers table with config driven sortable columns
    Features: Columns defined in one array, click to sort any column with aria sort, right aligned currency and number columns, search by name or country and totals in the footer
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <div class="relative">
        <UiLabel for="customers-search" class="sr-only">Search customers</UiLabel>
        <Icon
          name="lucide:search"
          class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <UiInput
          id="customers-search"
          v-model="query"
          placeholder="Search by name or country"
          class="pl-9 sm:w-72"
        />
      </div>
    </div>

    <div class="mt-8 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead
              v-for="column in columns"
              :key="column.key"
              :aria-sort="ariaSort(column.key)"
              :class="column.align === 'right' ? 'text-right' : ''"
            >
              <button
                type="button"
                class="hover:text-foreground inline-flex items-center gap-1"
                @click="sortBy(column.key)"
              >
                {{ column.label }}
                <Icon :name="sortIcon(column.key)" class="size-3.5" />
              </button>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="customer in rows" :key="customer.id">
            <UiTableCell>
              <div class="font-medium">{{ customer.name }}</div>
              <div class="text-muted-foreground text-xs">{{ customer.email }}</div>
            </UiTableCell>
            <UiTableCell>{{ customer.country }}</UiTableCell>
            <UiTableCell class="text-right tabular-nums">{{ customer.orders }}</UiTableCell>
            <UiTableCell class="text-right tabular-nums">
              {{ money.format(customer.spent) }}
            </UiTableCell>
            <UiTableCell class="text-muted-foreground text-right whitespace-nowrap">
              {{ formatDate(customer.joined) }}
            </UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!rows.length" :colspan="5">No customers found.</UiTableEmpty>
        </UiTableBody>
        <UiTableFooter>
          <UiTableRow>
            <UiTableCell class="font-medium">Total</UiTableCell>
            <UiTableCell />
            <UiTableCell class="text-right tabular-nums">{{ totals.orders }}</UiTableCell>
            <UiTableCell class="text-right tabular-nums">
              {{ money.format(totals.spent) }}
            </UiTableCell>
            <UiTableCell />
          </UiTableRow>
        </UiTableFooter>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Customer = {
    id: string;
    name: string;
    email: string;
    country: string;
    orders: number;
    spent: number;
    joined: string;
  };

  type SortKey = "name" | "country" | "orders" | "spent" | "joined";

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      customers?: Customer[];
    }>(),
    {
      title: "Customers",
      description: "Lifetime orders and spend for everyone who has bought from you.",
      customers: () => [
        {
          id: "c1",
          name: "Hannah Lee",
          email: "hannah@example.com",
          country: "United States",
          orders: 14,
          spent: 1284.5,
          joined: "2024-02-11",
        },
        {
          id: "c2",
          name: "Marco Rossi",
          email: "marco@example.com",
          country: "Italy",
          orders: 6,
          spent: 612.0,
          joined: "2025-01-23",
        },
        {
          id: "c3",
          name: "Priya Nair",
          email: "priya@example.com",
          country: "India",
          orders: 22,
          spent: 2430.75,
          joined: "2023-08-04",
        },
        {
          id: "c4",
          name: "Lukas Meyer",
          email: "lukas@example.com",
          country: "Germany",
          orders: 3,
          spent: 189.9,
          joined: "2026-03-17",
        },
        {
          id: "c5",
          name: "Chloe Martin",
          email: "chloe@example.com",
          country: "France",
          orders: 9,
          spent: 847.2,
          joined: "2024-11-30",
        },
        {
          id: "c6",
          name: "Tomás Silva",
          email: "tomas@example.com",
          country: "Brazil",
          orders: 1,
          spent: 59.0,
          joined: "2026-09-02",
        },
      ],
    }
  );

  const columns: { key: SortKey; label: string; align?: "right" }[] = [
    { key: "name", label: "Customer" },
    { key: "country", label: "Country" },
    { key: "orders", label: "Orders", align: "right" },
    { key: "spent", label: "Total spent", align: "right" },
    { key: "joined", label: "Customer since", align: "right" },
  ];

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const query = ref("");
  const sortKey = ref<SortKey>("spent");
  const direction = ref<"asc" | "desc">("desc");

  function sortBy(key: SortKey) {
    if (sortKey.value === key) {
      direction.value = direction.value === "asc" ? "desc" : "asc";
    } else {
      sortKey.value = key;
      direction.value = "asc";
    }
  }

  function ariaSort(key: SortKey) {
    if (sortKey.value !== key) return "none";
    return direction.value === "asc" ? "ascending" : "descending";
  }

  function sortIcon(key: SortKey) {
    if (sortKey.value !== key) return "lucide:arrow-up-down";
    return direction.value === "asc" ? "lucide:arrow-up" : "lucide:arrow-down";
  }

  const rows = computed(() => {
    const term = query.value.trim().toLowerCase();
    const list = props.customers.filter(
      (customer) =>
        !term ||
        customer.name.toLowerCase().includes(term) ||
        customer.country.toLowerCase().includes(term)
    );
    const factor = direction.value === "asc" ? 1 : -1;
    return [...list].sort((a, b) => {
      const left = a[sortKey.value];
      const right = b[sortKey.value];
      const result =
        typeof left === "number" && typeof right === "number"
          ? left - right
          : String(left).localeCompare(String(right));
      return result * factor;
    });
  });

  const totals = computed(() => ({
    orders: rows.value.reduce((sum, customer) => sum + customer.orders, 0),
    spent: rows.value.reduce((sum, customer) => sum + customer.spent, 0),
  }));

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  }
</script>
