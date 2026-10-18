<template>
  <!--
    Paginated table with select all across pages
    Features: Page level select all, a banner that offers to select every result, selection kept across pages, a running total of the selected invoices and pagination
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
    <p class="text-muted-foreground mt-2">{{ description }}</p>

    <div class="mt-8 space-y-3">
      <div
        v-if="pageAllSelected && !allSelected"
        class="bg-muted flex flex-wrap items-center gap-x-2 rounded-lg border px-4 py-2 text-sm"
        role="status"
      >
        All {{ pageRows.length }} invoices on this page are selected.
        <UiButton variant="link" class="h-auto p-0" @click="selectEvery">
          Select all {{ invoices.length }} invoices
        </UiButton>
      </div>
      <div
        v-else-if="allSelected"
        class="bg-muted flex flex-wrap items-center gap-x-2 rounded-lg border px-4 py-2 text-sm"
        role="status"
      >
        All {{ invoices.length }} invoices are selected.
        <UiButton variant="link" class="h-auto p-0" @click="selected = []"
          >Clear selection</UiButton
        >
      </div>

      <div class="overflow-hidden rounded-xl border">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="w-10">
                <UiCheckbox
                  :model-value="headerState"
                  aria-label="Select all on this page"
                  @update:model-value="togglePage"
                />
              </UiTableHead>
              <UiTableHead>Invoice</UiTableHead>
              <UiTableHead class="hidden sm:table-cell">Customer</UiTableHead>
              <UiTableHead class="text-right">Amount</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow
              v-for="invoice in pageRows"
              :key="invoice.id"
              :data-state="selected.includes(invoice.id) ? 'selected' : undefined"
            >
              <UiTableCell>
                <UiCheckbox
                  :model-value="selected.includes(invoice.id)"
                  :aria-label="`Select ${invoice.id}`"
                  @update:model-value="toggle(invoice.id)"
                />
              </UiTableCell>
              <UiTableCell class="font-medium">{{ invoice.id }}</UiTableCell>
              <UiTableCell class="hidden sm:table-cell">{{ invoice.customer }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums">
                {{ money.format(invoice.amount) }}
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
          <UiTableFooter>
            <UiTableRow>
              <UiTableCell colspan="3" class="font-medium" aria-live="polite">
                {{ selected.length }} selected
              </UiTableCell>
              <UiTableCell class="text-right font-medium tabular-nums">
                {{ money.format(selectedTotal) }}
              </UiTableCell>
            </UiTableRow>
          </UiTableFooter>
        </UiTable>
      </div>

      <UiPagination
        v-model:page="page"
        :total="invoices.length"
        :items-per-page="perPage"
        :sibling-count="1"
        class="pt-2"
      />
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Invoice = { id: string; customer: string; amount: number };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      perPage?: number;
      invoices?: Invoice[];
    }>(),
    {
      title: "Select invoices",
      description: "Selection sticks while you page, and the total follows along.",
      perPage: 4,
      invoices: () => [
        { id: "INV-2001", customer: "Northwind Traders", amount: 1280 },
        { id: "INV-2002", customer: "Globex Corporation", amount: 940.5 },
        { id: "INV-2003", customer: "Initech", amount: 3200 },
        { id: "INV-2004", customer: "Umbrella Labs", amount: 575 },
        { id: "INV-2005", customer: "Hooli", amount: 2150 },
        { id: "INV-2006", customer: "Stark Industries", amount: 8800 },
        { id: "INV-2007", customer: "Soylent", amount: 310.75 },
        { id: "INV-2008", customer: "Wayne Enterprises", amount: 4125 },
        { id: "INV-2009", customer: "Wonka Industries", amount: 690 },
        { id: "INV-2010", customer: "Cyberdyne Systems", amount: 1740 },
        { id: "INV-2011", customer: "Tyrell Corporation", amount: 2260 },
        { id: "INV-2012", customer: "Aperture Science", amount: 5035 },
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const page = ref(1);
  const selected = ref<string[]>([]);

  const pageRows = computed(() =>
    props.invoices.slice((page.value - 1) * props.perPage, page.value * props.perPage)
  );

  const pageAllSelected = computed(
    () =>
      pageRows.value.length > 0 && pageRows.value.every((row) => selected.value.includes(row.id))
  );

  const allSelected = computed(() => selected.value.length === props.invoices.length);

  const headerState = computed<boolean | "indeterminate">(() => {
    if (pageAllSelected.value) return true;
    return pageRows.value.some((row) => selected.value.includes(row.id)) ? "indeterminate" : false;
  });

  const selectedTotal = computed(() =>
    props.invoices
      .filter((invoice) => selected.value.includes(invoice.id))
      .reduce((sum, invoice) => sum + invoice.amount, 0)
  );

  function toggle(id: string) {
    selected.value = selected.value.includes(id)
      ? selected.value.filter((item) => item !== id)
      : [...selected.value, id];
  }

  function togglePage(value: boolean | "indeterminate") {
    const ids = pageRows.value.map((row) => row.id);
    selected.value =
      value === true
        ? [...new Set([...selected.value, ...ids])]
        : selected.value.filter((id) => !ids.includes(id));
  }

  function selectEvery() {
    selected.value = props.invoices.map((invoice) => invoice.id);
  }
</script>
