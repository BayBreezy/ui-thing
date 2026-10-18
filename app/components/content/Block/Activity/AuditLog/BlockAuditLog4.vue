<template>
  <!--
    Audit log export bar
    Features: A toolbar with a time range, an event type filter and a CSV or JSON choice, a live count of the events that will be exported, an export button with a short preparing state that downloads a real file and a preview of the first rows
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-2xl font-bold tracking-tight">Export audit log</h1>
      <p class="text-muted-foreground mt-1 text-sm">Download events for your compliance records.</p>

      <UiCard class="mt-6 gap-4">
        <UiCardContent class="grid gap-4 sm:grid-cols-3">
          <div class="space-y-2">
            <UiLabel for="export-range">Time range</UiLabel>
            <UiSelect v-model="range">
              <UiSelectTrigger id="export-range"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="1">Last 24 hours</UiSelectItem>
                <UiSelectItem value="7">Last 7 days</UiSelectItem>
                <UiSelectItem value="30">Last 30 days</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="export-kind">Events</UiLabel>
            <UiSelect v-model="kind">
              <UiSelectTrigger id="export-kind"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="all">All events</UiSelectItem>
                <UiSelectItem v-for="name in kinds" :key="name" :value="name" class="capitalize">{{
                  name
                }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <p id="export-format" class="text-sm font-medium">Format</p>
            <UiToggleGroup
              :model-value="format"
              type="single"
              variant="outline"
              class="w-full"
              aria-labelledby="export-format"
              @update:model-value="(value) => (format = (value as 'csv' | 'json') || 'csv')"
            >
              <UiToggleGroupItem value="csv" class="flex-1">CSV</UiToggleGroupItem>
              <UiToggleGroupItem value="json" class="flex-1">JSON</UiToggleGroupItem>
            </UiToggleGroup>
          </div>
        </UiCardContent>
        <UiCardFooter class="flex-wrap justify-between gap-3 border-t">
          <p class="text-sm" aria-live="polite">
            <span class="font-semibold tabular-nums">{{ selected.length }}</span>
            {{ selected.length === 1 ? "event" : "events" }} will be exported
          </p>
          <UiButton :disabled="!selected.length || busy" @click="run">
            <Icon
              :name="busy ? 'lucide:loader-circle' : 'lucide:download'"
              class="size-4"
              :class="busy ? 'animate-spin' : ''"
            />
            {{ busy ? "Preparing" : `Export ${format.toUpperCase()}` }}
          </UiButton>
        </UiCardFooter>
      </UiCard>

      <p class="mt-6 text-sm font-medium">Preview</p>
      <div class="mt-2 overflow-x-auto rounded-xl border">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Time</UiTableHead>
              <UiTableHead>Actor</UiTableHead>
              <UiTableHead>Action</UiTableHead>
              <UiTableHead>Target</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="event in selected.slice(0, 4)" :key="event.id">
              <UiTableCell class="text-muted-foreground whitespace-nowrap">{{
                event.at.replace("T", " ")
              }}</UiTableCell>
              <UiTableCell class="whitespace-nowrap">{{ event.actor }}</UiTableCell>
              <UiTableCell
                ><code class="text-xs">{{ event.action }}</code></UiTableCell
              >
              <UiTableCell class="whitespace-nowrap">{{ event.target }}</UiTableCell>
            </UiTableRow>
            <UiTableRow v-if="!selected.length">
              <UiTableCell colspan="4" class="text-muted-foreground py-8 text-center"
                >Nothing to export for these filters.</UiTableCell
              >
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Event = { id: string; at: string; actor: string; action: string; target: string };

  const props = withDefaults(
    defineProps<{
      now?: string;
      events?: Event[];
    }>(),
    {
      now: "2026-10-18T10:20",
      events: () => [
        {
          id: "x1",
          at: "2026-10-18T10:02",
          actor: "Maya Patel",
          action: "project.create",
          target: "Homepage redesign",
        },
        {
          id: "x2",
          at: "2026-10-18T09:47",
          actor: "Leo Fischer",
          action: "apikey.create",
          target: "Production key",
        },
        {
          id: "x3",
          at: "2026-10-17T17:12",
          actor: "Noah Kim",
          action: "settings.update",
          target: "Billing email",
        },
        {
          id: "x4",
          at: "2026-10-16T11:05",
          actor: "Leo Fischer",
          action: "project.delete",
          target: "Old prototype",
        },
        {
          id: "x5",
          at: "2026-10-14T13:45",
          actor: "Maya Patel",
          action: "project.create",
          target: "Launch checklist",
        },
        {
          id: "x6",
          at: "2026-10-09T09:00",
          actor: "Priya Nair",
          action: "member.remove",
          target: "old.intern@example.com",
        },
        {
          id: "x7",
          at: "2026-10-02T15:30",
          actor: "Noah Kim",
          action: "apikey.revoke",
          target: "Staging key",
        },
      ],
    }
  );

  const range = ref("7");
  const kind = ref("all");
  const format = ref<"csv" | "json">("csv");
  const busy = ref(false);

  const kinds = computed(() =>
    [...new Set(props.events.map((event) => event.action.split(".")[0]!))].sort()
  );
  const selected = computed(() => {
    const cutoff = new Date(`${props.now}:00Z`).getTime() - Number(range.value) * 86_400_000;
    return props.events
      .filter((event) => new Date(`${event.at}:00Z`).getTime() >= cutoff)
      .filter((event) => kind.value === "all" || event.action.startsWith(`${kind.value}.`))
      .sort((a, b) => b.at.localeCompare(a.at));
  });

  function build() {
    if (format.value === "json") return JSON.stringify(selected.value, null, 2);
    const quote = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const head = "time,actor,action,target";
    const lines = selected.value.map((event) =>
      [event.at, event.actor, event.action, event.target].map(quote).join(",")
    );
    return [head, ...lines].join("\n");
  }

  function run() {
    busy.value = true;
    setTimeout(() => {
      const type = format.value === "json" ? "application/json" : "text/csv";
      const url = URL.createObjectURL(new Blob([build()], { type }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `audit-log.${format.value}`;
      link.click();
      URL.revokeObjectURL(url);
      busy.value = false;
      useSonner.success(`Exported ${selected.value.length} events`);
    }, 600);
  }
</script>
