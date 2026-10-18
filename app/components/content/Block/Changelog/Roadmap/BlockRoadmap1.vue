<template>
  <!--
    Quarterly roadmap columns
    Features: One column for each quarter with initiative cards, an area filter, a progress bar for work in flight, status badges, item counts in the column headings and a column for later ideas
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Roadmap</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          What we plan to build. Dates are goals, not promises.
        </p>
      </div>
      <UiSelect v-model="area">
        <UiSelectTrigger class="w-44" aria-label="Filter by area"
          ><UiSelectValue
        /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="all">All areas</UiSelectItem>
          <UiSelectItem v-for="name in areas" :key="name" :value="name">{{ name }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="mt-8 grid items-start gap-5 md:grid-cols-2 xl:grid-cols-4" aria-live="polite">
      <section
        v-for="quarter in columns"
        :key="quarter.label"
        :aria-label="quarter.label"
        class="bg-muted/40 rounded-2xl p-3"
      >
        <h2 class="flex items-center justify-between px-2 py-1.5 text-sm font-semibold">
          {{ quarter.label }}
          <span
            class="text-muted-foreground bg-background rounded-full border px-2 text-xs tabular-nums"
            >{{ quarter.items.length }}</span
          >
        </h2>
        <ul class="mt-2 space-y-3">
          <li
            v-for="item in quarter.items"
            :key="item.id"
            class="bg-card rounded-xl border p-4 shadow-xs"
          >
            <div class="flex items-start justify-between gap-2">
              <p class="text-sm font-medium">{{ item.title }}</p>
              <UiBadge
                variant="soft"
                shape="pill"
                :color="statusColor[item.status]"
                class="shrink-0"
                >{{ item.status }}</UiBadge
              >
            </div>
            <p class="text-muted-foreground mt-1.5 text-sm">{{ item.summary }}</p>
            <UiProgress
              v-if="item.progress !== undefined"
              :model-value="item.progress"
              class="mt-3 h-1.5"
              :aria-label="`${item.title} progress`"
            />
            <p class="text-muted-foreground mt-3 text-xs">{{ item.area }}</p>
          </li>
          <li
            v-if="!quarter.items.length"
            class="text-muted-foreground px-2 py-6 text-center text-sm"
          >
            Nothing here yet.
          </li>
        </ul>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "In progress" | "Planned" | "Exploring";
  type Item = {
    id: string;
    title: string;
    summary: string;
    area: string;
    quarter: string;
    status: Status;
    progress?: number;
  };

  const props = withDefaults(
    defineProps<{
      quarters?: string[];
      items?: Item[];
    }>(),
    {
      quarters: () => ["Q4 2026", "Q1 2027", "Q2 2027", "Later"],
      items: () => [
        {
          id: "r1",
          title: "Saved views",
          summary: "Share filters with your team.",
          area: "Dashboard",
          quarter: "Q4 2026",
          status: "In progress",
          progress: 80,
        },
        {
          id: "r2",
          title: "Webhook retries",
          summary: "Retry failed webhooks with backoff.",
          area: "API",
          quarter: "Q4 2026",
          status: "In progress",
          progress: 45,
        },
        {
          id: "r3",
          title: "Annual billing",
          summary: "Yearly plans with a discount.",
          area: "Billing",
          quarter: "Q4 2026",
          status: "Planned",
        },
        {
          id: "r4",
          title: "Mobile app",
          summary: "A native app for iOS and Android.",
          area: "Platform",
          quarter: "Q1 2027",
          status: "Planned",
        },
        {
          id: "r5",
          title: "Custom roles",
          summary: "Fine grained permissions for teams.",
          area: "Dashboard",
          quarter: "Q1 2027",
          status: "Planned",
        },
        {
          id: "r6",
          title: "GraphQL API",
          summary: "A typed API next to REST.",
          area: "API",
          quarter: "Q2 2027",
          status: "Exploring",
        },
        {
          id: "r7",
          title: "Usage based billing",
          summary: "Pay for what you use.",
          area: "Billing",
          quarter: "Q2 2027",
          status: "Exploring",
        },
        {
          id: "r8",
          title: "On premise option",
          summary: "Run Acme in your own cloud.",
          area: "Platform",
          quarter: "Later",
          status: "Exploring",
        },
      ],
    }
  );

  const area = ref("all");
  const areas = computed(() => [...new Set(props.items.map((item) => item.area))].sort());
  const statusColor: Record<Status, string> = {
    "In progress": "blue",
    Planned: "violet",
    Exploring: "gray",
  };

  const columns = computed(() =>
    props.quarters.map((label) => ({
      label,
      items: props.items.filter(
        (item) => item.quarter === label && (area.value === "all" || item.area === area.value)
      ),
    }))
  );
</script>
