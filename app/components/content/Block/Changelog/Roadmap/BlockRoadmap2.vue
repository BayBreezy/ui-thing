<template>
  <!--
    Roadmap timeline
    Features: A month by month timeline with a bar for each initiative, rows grouped by team, a marker for today, bar colors for status, a legend and a table below that lists every item with its dates for screen readers
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Roadmap timeline</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          {{ monthLabel(months[0]!) }} to {{ monthLabel(months[months.length - 1]!) }}
        </p>
      </div>
      <ul class="flex flex-wrap gap-3 text-xs" aria-label="Legend">
        <li v-for="(color, status) in colors" :key="status" class="flex items-center gap-1.5">
          <span class="size-2.5 rounded-sm" :class="color.bar" />{{ status }}
        </li>
      </ul>
    </div>

    <div class="mt-6 overflow-x-auto rounded-xl border">
      <div class="min-w-[48rem]">
        <div
          class="bg-muted/50 grid grid-cols-[9rem_repeat(6,minmax(0,1fr))] border-b text-xs font-medium"
          aria-hidden="true"
        >
          <div class="px-3 py-2">Team</div>
          <div v-for="month in months" :key="month" class="border-l px-3 py-2">
            {{ monthLabel(month) }}
          </div>
        </div>
        <div
          v-for="team in teams"
          :key="team.name"
          class="grid grid-cols-[9rem_1fr] border-b last:border-b-0"
          aria-hidden="true"
        >
          <div class="px-3 py-4 text-sm font-medium">{{ team.name }}</div>
          <div class="relative border-l">
            <div class="pointer-events-none absolute inset-0 grid grid-cols-6">
              <span v-for="month in months" :key="month" class="border-l first:border-l-0" />
            </div>
            <span
              v-if="todayPct !== null"
              class="bg-primary absolute inset-y-0 z-10 w-px"
              :style="{ left: `${todayPct}%` }"
            />
            <div class="relative space-y-1.5 py-3">
              <div v-for="item in team.items" :key="item.id" class="relative h-7">
                <span
                  class="absolute inset-y-0 flex items-center truncate rounded-md px-2 text-xs font-medium"
                  :class="colors[item.status].bar"
                  :style="place(item)"
                  :title="`${item.title}, ${item.start} to ${item.end}`"
                  >{{ item.title }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sr-only">
      <table>
        <caption>
          Roadmap items
        </caption>
        <thead>
          <tr>
            <th>Item</th>
            <th>Team</th>
            <th>Status</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.team }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.start }}</td>
            <td>{{ item.end }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "Done" | "In progress" | "Planned";
  type Item = {
    id: string;
    title: string;
    team: string;
    status: Status;
    start: string;
    end: string;
  };

  const props = withDefaults(
    defineProps<{
      today?: string;
      /** First month of the timeline as `YYYY-MM`. */
      from?: string;
      items?: Item[];
    }>(),
    {
      today: "2026-10-18",
      from: "2026-08",
      items: () => [
        {
          id: "m1",
          title: "CSV import",
          team: "Product",
          status: "Done",
          start: "2026-08-03",
          end: "2026-08-21",
        },
        {
          id: "m2",
          title: "Team workspaces",
          team: "Product",
          status: "Done",
          start: "2026-08-24",
          end: "2026-09-18",
        },
        {
          id: "m3",
          title: "Saved views",
          team: "Product",
          status: "In progress",
          start: "2026-09-21",
          end: "2026-10-30",
        },
        {
          id: "m4",
          title: "Custom roles",
          team: "Product",
          status: "Planned",
          start: "2026-11-09",
          end: "2026-12-18",
        },
        {
          id: "m5",
          title: "Rate limit headers",
          team: "Platform",
          status: "Done",
          start: "2026-09-01",
          end: "2026-09-26",
        },
        {
          id: "m6",
          title: "Webhook retries",
          team: "Platform",
          status: "In progress",
          start: "2026-10-05",
          end: "2026-11-13",
        },
        {
          id: "m7",
          title: "GraphQL API",
          team: "Platform",
          status: "Planned",
          start: "2026-11-16",
          end: "2027-01-22",
        },
        {
          id: "m8",
          title: "Annual billing",
          team: "Growth",
          status: "In progress",
          start: "2026-09-28",
          end: "2026-10-23",
        },
        {
          id: "m9",
          title: "Referral program",
          team: "Growth",
          status: "Planned",
          start: "2026-11-02",
          end: "2027-01-08",
        },
      ],
    }
  );

  const colors: Record<Status, { bar: string }> = {
    Done: { bar: "bg-green-200 text-green-900 dark:bg-green-500/30 dark:text-green-200" },
    "In progress": { bar: "bg-blue-200 text-blue-900 dark:bg-blue-500/30 dark:text-blue-200" },
    Planned: { bar: "bg-violet-200 text-violet-900 dark:bg-violet-500/30 dark:text-violet-200" },
  };

  const months = computed(() =>
    Array.from({ length: 6 }, (_, index) => {
      const date = new Date(`${props.from}-01T00:00:00Z`);
      date.setUTCMonth(date.getUTCMonth() + index);
      return date.toISOString().slice(0, 7);
    })
  );
  const start = computed(() => new Date(`${months.value[0]}-01T00:00:00Z`).getTime());
  const end = computed(() => {
    const date = new Date(`${months.value[months.value.length - 1]}-01T00:00:00Z`);
    date.setUTCMonth(date.getUTCMonth() + 1);
    return date.getTime();
  });
  const pct = (iso: string) =>
    ((new Date(`${iso}T00:00:00Z`).getTime() - start.value) / (end.value - start.value)) * 100;

  const teams = computed(() =>
    [...new Set(props.items.map((item) => item.team))].map((name) => ({
      name,
      items: props.items.filter((item) => item.team === name),
    }))
  );
  const todayPct = computed(() => {
    const value = pct(props.today);
    return value >= 0 && value <= 100 ? value : null;
  });

  function place(item: Item) {
    const left = Math.max(0, pct(item.start));
    const right = Math.min(100, pct(item.end));
    return { left: `${left}%`, width: `${Math.max(right - left, 2)}%` };
  }

  const monthLabel = (month: string) =>
    new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
</script>
