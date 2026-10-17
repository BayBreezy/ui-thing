<template>
  <!--
    Invoice history table
    Features: Searchable table with status badges, amount and date columns, per-row download, select all with bulk download, mobile horizontal scroll
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
      <UiCardAction class="flex items-center gap-2">
        <UiButton
          variant="outline"
          size="sm"
          :disabled="!selected.length"
          @click="downloadSelected"
        >
          <Icon name="lucide:download" class="size-4" />
          Download {{ selected.length || "" }}
        </UiButton>
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent class="space-y-4 p-0">
      <div class="px-6">
        <div class="relative max-w-xs">
          <Icon
            name="lucide:search"
            class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput v-model="query" placeholder="Search invoices" class="pl-9" />
        </div>
      </div>
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="w-12 pl-6">
              <UiCheckbox
                :model-value="allState"
                aria-label="Select all invoices"
                @update:model-value="toggleAll($event === true)"
              />
            </UiTableHead>
            <UiTableHead>Invoice</UiTableHead>
            <UiTableHead>Date</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="text-right">Amount</UiTableHead>
            <UiTableHead class="w-12 pr-6" />
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="invoice in filtered" :key="invoice.id">
            <UiTableCell class="pl-6">
              <UiCheckbox
                :model-value="selected.includes(invoice.id)"
                :aria-label="`Select ${invoice.id}`"
                @update:model-value="toggle(invoice.id, $event === true)"
              />
            </UiTableCell>
            <UiTableCell class="font-medium">{{ invoice.id }}</UiTableCell>
            <UiTableCell class="text-muted-foreground">{{ invoice.date }}</UiTableCell>
            <UiTableCell>
              <UiBadge :variant="statusVariant[invoice.status]">{{ invoice.status }}</UiBadge>
            </UiTableCell>
            <UiTableCell class="text-right">{{ invoice.amount }}</UiTableCell>
            <UiTableCell class="pr-6 text-right">
              <UiButton
                variant="ghost"
                size="icon-sm"
                :aria-label="`Download ${invoice.id}`"
                @click="useSonner.info(`Downloading ${invoice.id}`)"
              >
                <Icon name="lucide:download" class="size-4" />
              </UiButton>
            </UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!filtered.length" :colspan="6"
            >No invoices match your search.</UiTableEmpty
          >
        </UiTableBody>
      </UiTable>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  type Invoice = {
    id: string;
    date: string;
    status: "Paid" | "Pending" | "Failed";
    amount: string;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Invoice history",
      description: "Download past invoices for your records.",
    }
  );

  const statusVariant = { Paid: "success", Pending: "warning", Failed: "destructive" } as const;

  const invoices: Invoice[] = [
    { id: "INV-0012", date: "Feb 14, 2026", status: "Paid", amount: "$29.00" },
    { id: "INV-0011", date: "Jan 14, 2026", status: "Paid", amount: "$29.00" },
    { id: "INV-0010", date: "Dec 14, 2025", status: "Paid", amount: "$29.00" },
    { id: "INV-0009", date: "Nov 14, 2025", status: "Failed", amount: "$29.00" },
    { id: "INV-0008", date: "Oct 14, 2025", status: "Paid", amount: "$29.00" },
    { id: "INV-0007", date: "Sep 14, 2025", status: "Pending", amount: "$29.00" },
  ];

  const query = ref("");
  const selected = ref<string[]>([]);

  const filtered = computed(() =>
    invoices.filter((invoice) =>
      `${invoice.id} ${invoice.status} ${invoice.date}`
        .toLowerCase()
        .includes(query.value.toLowerCase())
    )
  );

  const allState = computed<boolean | "indeterminate">(() => {
    if (!selected.value.length) return false;
    return selected.value.length === invoices.length ? true : "indeterminate";
  });

  function toggleAll(value: boolean) {
    selected.value = value ? invoices.map((invoice) => invoice.id) : [];
  }

  function toggle(id: string, value: boolean) {
    selected.value = value ? [...selected.value, id] : selected.value.filter((item) => item !== id);
  }

  function downloadSelected() {
    useSonner.success(`Downloading ${selected.value.length} invoices`);
  }
</script>
