<template>
  <!--
    Transactions table grouped by day
    Features: Day group header rows, category icon badges, credit and debit amounts in color, running day totals, search and a pending badge
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <div class="relative">
        <UiLabel for="transactions-search" class="sr-only">Search transactions</UiLabel>
        <Icon
          name="lucide:search"
          class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <UiInput
          id="transactions-search"
          v-model="query"
          placeholder="Search transactions"
          class="pl-9 sm:w-64"
        />
      </div>
    </div>

    <div class="mt-8 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Transaction</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Category</UiTableHead>
            <UiTableHead class="text-right">Amount</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <template v-for="group in groups" :key="group.date">
            <UiTableRow class="bg-muted/50 hover:bg-muted/50">
              <UiTableCell
                colspan="2"
                class="text-muted-foreground text-xs font-semibold uppercase"
              >
                {{ formatDate(group.date) }}
              </UiTableCell>
              <UiTableCell class="text-muted-foreground text-right text-xs tabular-nums">
                {{ signed(group.total) }}
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-for="item in group.items" :key="item.id">
              <UiTableCell>
                <div class="flex items-center gap-3">
                  <span class="bg-muted grid size-9 shrink-0 place-items-center rounded-full">
                    <Icon :name="categories[item.category]" class="size-4" />
                  </span>
                  <div class="min-w-0">
                    <p class="truncate font-medium">{{ item.name }}</p>
                    <p class="text-muted-foreground truncate text-xs sm:hidden">
                      {{ item.category }}
                    </p>
                  </div>
                  <UiBadge v-if="item.pending" variant="soft" color="amber" shape="pill">
                    Pending
                  </UiBadge>
                </div>
              </UiTableCell>
              <UiTableCell class="text-muted-foreground hidden sm:table-cell">
                {{ item.category }}
              </UiTableCell>
              <UiTableCell
                class="text-right font-medium tabular-nums"
                :class="item.amount > 0 ? 'text-green-600 dark:text-green-400' : ''"
              >
                {{ signed(item.amount) }}
              </UiTableCell>
            </UiTableRow>
          </template>
          <UiTableEmpty v-if="!groups.length" :colspan="3">No transactions found.</UiTableEmpty>
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Category = "Income" | "Groceries" | "Transport" | "Subscriptions" | "Dining";

  type Transaction = {
    id: string;
    name: string;
    category: Category;
    date: string;
    amount: number;
    pending?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      transactions?: Transaction[];
    }>(),
    {
      title: "Transactions",
      description: "Money in and out of your checking account.",
      transactions: () => [
        {
          id: "t1",
          name: "Salary — Acme Inc.",
          category: "Income",
          date: "2026-10-17",
          amount: 4850,
        },
        {
          id: "t2",
          name: "Whole Foods Market",
          category: "Groceries",
          date: "2026-10-17",
          amount: -86.42,
        },
        {
          id: "t3",
          name: "Uber trip",
          category: "Transport",
          date: "2026-10-16",
          amount: -18.9,
          pending: true,
        },
        {
          id: "t4",
          name: "Netflix",
          category: "Subscriptions",
          date: "2026-10-16",
          amount: -15.49,
        },
        {
          id: "t5",
          name: "Blue Bottle Coffee",
          category: "Dining",
          date: "2026-10-15",
          amount: -7.5,
        },
        { id: "t6", name: "Freelance payout", category: "Income", date: "2026-10-15", amount: 620 },
        {
          id: "t7",
          name: "Spotify",
          category: "Subscriptions",
          date: "2026-10-15",
          amount: -10.99,
        },
      ],
    }
  );

  const categories: Record<Category, string> = {
    Income: "lucide:arrow-down-left",
    Groceries: "lucide:shopping-basket",
    Transport: "lucide:car",
    Subscriptions: "lucide:repeat",
    Dining: "lucide:utensils",
  };

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const query = ref("");

  const groups = computed(() => {
    const term = query.value.trim().toLowerCase();
    const matches = props.transactions.filter(
      (item) =>
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );
    const byDate = new Map<string, Transaction[]>();
    for (const item of matches) {
      byDate.set(item.date, [...(byDate.get(item.date) ?? []), item]);
    }
    return [...byDate.entries()]
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, items]) => ({
        date,
        items,
        total: items.reduce((sum, item) => sum + item.amount, 0),
      }));
  });

  function signed(amount: number) {
    return `${amount > 0 ? "+" : ""}${money.format(amount)}`;
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  }
</script>
