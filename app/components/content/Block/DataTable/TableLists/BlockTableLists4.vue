<template>
  <!--
    Invoices table with status tabs and totals
    Features: Status tabs with counts, invoice number and customer cells, color coded status badges, overdue due dates highlighted, download action and an outstanding balance footer
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <UiButton @click="useSonner.info('Open your new invoice form here')">
        <Icon name="lucide:plus" class="size-4" />
        New invoice
      </UiButton>
    </div>

    <UiTabs v-model="tab" class="mt-8">
      <UiTabsList>
        <UiTabsTrigger v-for="item in tabs" :key="item.value" :value="item.value">
          {{ item.label }}
          <UiBadge variant="secondary" class="ml-1.5">{{ counts[item.value] }}</UiBadge>
        </UiTabsTrigger>
      </UiTabsList>
    </UiTabs>

    <div class="mt-4 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Invoice</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Customer</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="hidden md:table-cell">Due</UiTableHead>
            <UiTableHead class="text-right">Amount</UiTableHead>
            <UiTableHead class="w-0"><span class="sr-only">Download</span></UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="invoice in rows" :key="invoice.id">
            <UiTableCell class="font-medium">{{ invoice.id }}</UiTableCell>
            <UiTableCell class="hidden sm:table-cell">{{ invoice.customer }}</UiTableCell>
            <UiTableCell>
              <UiBadge variant="soft" :color="statuses[invoice.status].color" shape="pill">
                {{ statuses[invoice.status].label }}
              </UiBadge>
            </UiTableCell>
            <UiTableCell
              class="hidden whitespace-nowrap md:table-cell"
              :class="
                invoice.status === 'overdue'
                  ? 'text-destructive font-medium'
                  : 'text-muted-foreground'
              "
            >
              {{ formatDate(invoice.due) }}
            </UiTableCell>
            <UiTableCell class="text-right tabular-nums">
              {{ money.format(invoice.amount) }}
            </UiTableCell>
            <UiTableCell>
              <UiButton
                variant="ghost"
                size="icon-sm"
                :aria-label="`Download ${invoice.id}`"
                @click="useSonner.success(`Downloading ${invoice.id}`)"
              >
                <Icon name="lucide:download" class="size-4" />
              </UiButton>
            </UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!rows.length" :colspan="6">No invoices in this view.</UiTableEmpty>
        </UiTableBody>
        <UiTableFooter>
          <UiTableRow>
            <UiTableCell colspan="4" class="font-medium">Outstanding balance</UiTableCell>
            <UiTableCell class="text-right font-medium tabular-nums">
              {{ money.format(outstanding) }}
            </UiTableCell>
            <UiTableCell />
          </UiTableRow>
        </UiTableFooter>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "paid" | "pending" | "overdue";

  type Invoice = {
    id: string;
    customer: string;
    status: Status;
    due: string;
    amount: number;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      invoices?: Invoice[];
    }>(),
    {
      title: "Invoices",
      description: "Track what has been paid and what still needs a nudge.",
      invoices: () => [
        {
          id: "INV-1042",
          customer: "Northwind Traders",
          status: "paid",
          due: "2026-09-30",
          amount: 4200,
        },
        {
          id: "INV-1043",
          customer: "Globex Corporation",
          status: "pending",
          due: "2026-10-28",
          amount: 1850.5,
        },
        { id: "INV-1044", customer: "Initech", status: "overdue", due: "2026-10-05", amount: 960 },
        {
          id: "INV-1045",
          customer: "Umbrella Labs",
          status: "paid",
          due: "2026-10-10",
          amount: 7320,
        },
        { id: "INV-1046", customer: "Hooli", status: "pending", due: "2026-11-02", amount: 2490 },
        {
          id: "INV-1047",
          customer: "Stark Industries",
          status: "overdue",
          due: "2026-09-26",
          amount: 5100,
        },
      ],
    }
  );

  const statuses = {
    paid: { label: "Paid", color: "green" },
    pending: { label: "Pending", color: "amber" },
    overdue: { label: "Overdue", color: "red" },
  } as const;

  const tabs = [
    { value: "all", label: "All" },
    { value: "paid", label: "Paid" },
    { value: "pending", label: "Pending" },
    { value: "overdue", label: "Overdue" },
  ] as const;

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const tab = ref<"all" | Status>("all");

  const counts = computed(() => ({
    all: props.invoices.length,
    paid: props.invoices.filter((invoice) => invoice.status === "paid").length,
    pending: props.invoices.filter((invoice) => invoice.status === "pending").length,
    overdue: props.invoices.filter((invoice) => invoice.status === "overdue").length,
  }));

  const rows = computed(() =>
    tab.value === "all"
      ? props.invoices
      : props.invoices.filter((invoice) => invoice.status === tab.value)
  );

  const outstanding = computed(() =>
    props.invoices
      .filter((invoice) => invoice.status !== "paid")
      .reduce((sum, invoice) => sum + invoice.amount, 0)
  );

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  }
</script>
