<template>
  <!--
    Roadmap status board
    Features: Planned, in progress and shipped columns with counts, cards with an area tag and a vote count, an area filter built from toggle chips, shipped dates and a link to the changelog entry
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <h1 class="text-3xl font-bold tracking-tight">Product roadmap</h1>
      <UiToggleGroup
        :model-value="area"
        type="single"
        variant="outline"
        size="sm"
        aria-label="Filter by area"
        @update:model-value="(value) => (area = (value as string) || 'all')"
      >
        <UiToggleGroupItem
          v-for="name in ['all', ...areas]"
          :key="name"
          :value="name"
          class="capitalize"
          >{{ name }}</UiToggleGroupItem
        >
      </UiToggleGroup>
    </div>

    <div class="mt-8 grid items-start gap-5 md:grid-cols-3" aria-live="polite">
      <section v-for="column in columns" :key="column.status" :aria-label="column.status">
        <h2 class="mb-3 flex items-center gap-2 text-sm font-semibold">
          <span class="size-2.5 rounded-full" :class="column.dot" />
          {{ column.status }}
          <span class="text-muted-foreground font-normal tabular-nums">{{
            column.items.length
          }}</span>
        </h2>
        <ul class="space-y-3">
          <li v-for="item in column.items" :key="item.id" class="bg-card rounded-xl border p-4">
            <p class="text-sm font-medium">{{ item.title }}</p>
            <p class="text-muted-foreground mt-1 text-sm">{{ item.summary }}</p>
            <div class="mt-3 flex items-center justify-between gap-2 text-xs">
              <UiBadge variant="soft" shape="pill">{{ item.area }}</UiBadge>
              <span v-if="item.shipped" class="text-muted-foreground"
                >Shipped {{ shortDate(item.shipped) }}</span
              >
              <span v-else class="text-muted-foreground flex items-center gap-1"
                ><Icon name="lucide:arrow-big-up" class="size-3.5" />{{ item.votes }}</span
              >
            </div>
            <UiButton
              v-if="item.shipped"
              variant="link"
              size="sm"
              class="mt-1 h-auto p-0 text-xs"
              @click="useSonner.info(`Open the changelog entry for ${item.title}`)"
              >Read the release notes</UiButton
            >
          </li>
          <li
            v-if="!column.items.length"
            class="text-muted-foreground rounded-xl border border-dashed py-8 text-center text-sm"
          >
            Nothing in this column.
          </li>
        </ul>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "Planned" | "In progress" | "Shipped";
  type Item = {
    id: string;
    title: string;
    summary: string;
    area: string;
    status: Status;
    votes: number;
    shipped?: string;
  };

  const props = withDefaults(
    defineProps<{
      items?: Item[];
    }>(),
    {
      items: () => [
        {
          id: "b1",
          title: "Custom roles",
          summary: "Fine grained permissions for teams.",
          area: "dashboard",
          status: "Planned",
          votes: 214,
        },
        {
          id: "b2",
          title: "Mobile app",
          summary: "Native apps for iOS and Android.",
          area: "platform",
          status: "Planned",
          votes: 388,
        },
        {
          id: "b3",
          title: "GraphQL API",
          summary: "A typed API next to REST.",
          area: "api",
          status: "Planned",
          votes: 97,
        },
        {
          id: "b4",
          title: "Saved views",
          summary: "Share filters with your team.",
          area: "dashboard",
          status: "In progress",
          votes: 301,
        },
        {
          id: "b5",
          title: "Webhook retries",
          summary: "Retry failed webhooks with backoff.",
          area: "api",
          status: "In progress",
          votes: 142,
        },
        {
          id: "b6",
          title: "Team workspaces",
          summary: "Invite people and give them a role.",
          area: "dashboard",
          status: "Shipped",
          votes: 420,
          shipped: "2026-09-18",
        },
        {
          id: "b7",
          title: "CSV import",
          summary: "Import with column matching.",
          area: "platform",
          status: "Shipped",
          votes: 266,
          shipped: "2026-08-21",
        },
      ],
    }
  );

  const area = ref("all");
  const areas = computed(() => [...new Set(props.items.map((item) => item.area))].sort());
  const dots: Record<Status, string> = {
    Planned: "bg-violet-500",
    "In progress": "bg-blue-500",
    Shipped: "bg-green-500",
  };

  const columns = computed(() =>
    (["Planned", "In progress", "Shipped"] as Status[]).map((status) => ({
      status,
      dot: dots[status],
      items: props.items.filter(
        (item) => item.status === status && (area.value === "all" || item.area === area.value)
      ),
    }))
  );

  const shortDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
</script>
