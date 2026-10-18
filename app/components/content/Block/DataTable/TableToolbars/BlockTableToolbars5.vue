<template>
  <!--
    Table with saved view tabs
    Features: Tabs that apply preset filters, per tab counts, save the current search as a new view, deals table with stage badges and amounts
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <div class="flex gap-2">
        <div class="relative">
          <UiLabel for="views-search" class="sr-only">Search deals</UiLabel>
          <Icon
            name="lucide:search"
            class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput
            id="views-search"
            v-model="query"
            placeholder="Search deals"
            class="pl-9 sm:w-52"
          />
        </div>
        <UiButton variant="outline" :disabled="!query.trim()" @click="saveView">
          <Icon name="lucide:bookmark-plus" class="size-4" />
          Save view
        </UiButton>
      </div>
    </div>

    <UiTabs v-model="current" class="mt-8">
      <div class="overflow-x-auto">
        <UiTabsList>
          <UiTabsTrigger v-for="view in views" :key="view.id" :value="view.id">
            {{ view.label }}
            <UiBadge variant="secondary" class="ml-1.5">{{ countFor(view) }}</UiBadge>
          </UiTabsTrigger>
        </UiTabsList>
      </div>
    </UiTabs>

    <div class="mt-4 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Deal</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Owner</UiTableHead>
            <UiTableHead>Stage</UiTableHead>
            <UiTableHead class="text-right">Amount</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="deal in rows" :key="deal.name">
            <UiTableCell class="font-medium">{{ deal.name }}</UiTableCell>
            <UiTableCell class="hidden sm:table-cell">{{ deal.owner }}</UiTableCell>
            <UiTableCell>
              <UiBadge variant="soft" :color="stages[deal.stage]" shape="pill">{{
                deal.stage
              }}</UiBadge>
            </UiTableCell>
            <UiTableCell class="text-right tabular-nums">{{
              money.format(deal.amount)
            }}</UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!rows.length" :colspan="4">No deals in this view.</UiTableEmpty>
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Stage = "Lead" | "Proposal" | "Negotiation" | "Won" | "Lost";

  type Deal = { name: string; owner: string; stage: Stage; amount: number };

  type View = { id: string; label: string; filter: (deal: Deal) => boolean };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      deals?: Deal[];
    }>(),
    {
      title: "Deals",
      description: "Switch between saved views or save your own from a search.",
      deals: () => [
        { name: "Globex annual contract", owner: "Maya Chen", stage: "Negotiation", amount: 84000 },
        { name: "Initech pilot", owner: "Liam Carter", stage: "Proposal", amount: 12500 },
        { name: "Hooli platform rollout", owner: "Sofia Alvarez", stage: "Won", amount: 132000 },
        { name: "Umbrella Labs renewal", owner: "Noah Williams", stage: "Lead", amount: 18900 },
        {
          name: "Stark Industries expansion",
          owner: "Maya Chen",
          stage: "Negotiation",
          amount: 215000,
        },
        { name: "Soylent seats", owner: "Aisha Khan", stage: "Lost", amount: 9400 },
      ],
    }
  );

  const stages = {
    Lead: "slate",
    Proposal: "blue",
    Negotiation: "amber",
    Won: "green",
    Lost: "red",
  } as const;

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const views = ref<View[]>([
    { id: "all", label: "All deals", filter: () => true },
    {
      id: "open",
      label: "Open",
      filter: (deal) => !["Won", "Lost"].includes(deal.stage),
    },
    { id: "big", label: "Over $50k", filter: (deal) => deal.amount >= 50000 },
    { id: "won", label: "Won", filter: (deal) => deal.stage === "Won" },
  ]);

  const current = ref("all");
  const query = ref("");

  const activeView = computed(() => views.value.find((view) => view.id === current.value));

  function matches(deal: Deal) {
    const term = query.value.trim().toLowerCase();
    return (
      !term || deal.name.toLowerCase().includes(term) || deal.owner.toLowerCase().includes(term)
    );
  }

  function countFor(view: View) {
    return props.deals.filter((deal) => view.filter(deal) && matches(deal)).length;
  }

  const rows = computed(() =>
    props.deals.filter((deal) => (activeView.value?.filter(deal) ?? true) && matches(deal))
  );

  function saveView() {
    const term = query.value.trim();
    if (!term) return;
    const id = `search-${views.value.length}`;
    const lower = term.toLowerCase();
    views.value = [
      ...views.value,
      {
        id,
        label: `“${term}”`,
        filter: (deal) =>
          deal.name.toLowerCase().includes(lower) || deal.owner.toLowerCase().includes(lower),
      },
    ];
    query.value = "";
    current.value = id;
    useSonner.success("View saved");
  }
</script>
