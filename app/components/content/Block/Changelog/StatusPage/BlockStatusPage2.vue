<template>
  <!--
    Incident history
    Features: Past incidents grouped by day with an impact badge, a timeline of updates from investigating to resolved, a time range select, days without incidents listed too and a collapse toggle for each incident
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Incident history</h1>
          <p class="text-muted-foreground text-sm" aria-live="polite">
            {{ list.length }} {{ list.length === 1 ? "incident" : "incidents" }} in the last
            {{ range }} days
          </p>
        </div>
        <UiSelect v-model="range">
          <UiSelectTrigger class="w-40" aria-label="Time range"><UiSelectValue /></UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="7">Last 7 days</UiSelectItem>
            <UiSelectItem value="30">Last 30 days</UiSelectItem>
            <UiSelectItem value="90">Last 90 days</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>

      <div class="mt-8 space-y-8" aria-live="polite">
        <section v-for="day in days" :key="day.date" :aria-label="longDate(day.date)">
          <h2 class="border-b pb-2 text-sm font-semibold">{{ longDate(day.date) }}</h2>
          <p v-if="!day.items.length" class="text-muted-foreground pt-3 text-sm">
            No incidents reported.
          </p>
          <article v-for="incident in day.items" :key="incident.id" class="pt-4">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="font-medium">{{ incident.title }}</h3>
              <UiBadge variant="soft" shape="pill" :color="impact[incident.impact]">{{
                incident.impact
              }}</UiBadge>
              <UiButton
                variant="ghost"
                size="sm"
                class="ml-auto h-7"
                :aria-expanded="!closed.has(incident.id)"
                :aria-label="`${closed.has(incident.id) ? 'Show' : 'Hide'} updates for ${incident.title}`"
                @click="toggle(incident.id)"
                ><Icon
                  name="lucide:chevron-down"
                  class="size-4 transition-transform"
                  :class="closed.has(incident.id) ? '' : 'rotate-180'"
              /></UiButton>
            </div>
            <ol
              v-if="!closed.has(incident.id)"
              class="border-border mt-3 ml-1 space-y-4 border-l pl-5"
            >
              <li v-for="update in incident.updates" :key="update.time" class="relative">
                <span
                  class="bg-muted-foreground/50 ring-background absolute top-1.5 -left-[1.6875rem] size-2 rounded-full ring-4"
                  aria-hidden="true"
                />
                <p class="text-sm">
                  <span class="font-semibold">{{ update.stage }}.</span> {{ update.text }}
                </p>
                <p class="text-muted-foreground text-xs">{{ time(update.time) }}</p>
              </li>
            </ol>
          </article>
        </section>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Incident = {
    id: string;
    date: string;
    title: string;
    impact: "minor" | "major" | "maintenance";
    updates: { stage: string; text: string; time: string }[];
  };

  const props = withDefaults(
    defineProps<{
      today?: string;
      incidents?: Incident[];
    }>(),
    {
      today: "2026-10-18",
      incidents: () => [
        {
          id: "i1",
          date: "2026-10-16",
          title: "Elevated API latency",
          impact: "minor",
          updates: [
            {
              stage: "Resolved",
              text: "Latency is back to normal. We scaled up the database.",
              time: "2026-10-16T14:05",
            },
            {
              stage: "Monitoring",
              text: "A fix was deployed and we are watching the numbers.",
              time: "2026-10-16T13:20",
            },
            {
              stage: "Identified",
              text: "A slow query on the reports table caused the delay.",
              time: "2026-10-16T12:48",
            },
            {
              stage: "Investigating",
              text: "We are looking into slow responses from the API.",
              time: "2026-10-16T12:30",
            },
          ],
        },
        {
          id: "i2",
          date: "2026-10-09",
          title: "Webhook deliveries failing",
          impact: "major",
          updates: [
            {
              stage: "Resolved",
              text: "All failed webhooks were retried and delivered.",
              time: "2026-10-09T09:40",
            },
            {
              stage: "Identified",
              text: "A certificate expired on our delivery service.",
              time: "2026-10-09T08:55",
            },
            {
              stage: "Investigating",
              text: "Some webhooks are failing to deliver.",
              time: "2026-10-09T08:30",
            },
          ],
        },
        {
          id: "i3",
          date: "2026-09-27",
          title: "Scheduled database maintenance",
          impact: "maintenance",
          updates: [
            {
              stage: "Completed",
              text: "Maintenance finished with no downtime.",
              time: "2026-09-27T03:30",
            },
            {
              stage: "In progress",
              text: "We started upgrading the primary database.",
              time: "2026-09-27T03:00",
            },
          ],
        },
        {
          id: "i4",
          date: "2026-08-30",
          title: "Dashboard not loading for some users",
          impact: "minor",
          updates: [
            { stage: "Resolved", text: "A bad deploy was rolled back.", time: "2026-08-30T17:10" },
            {
              stage: "Investigating",
              text: "Some users see a blank dashboard.",
              time: "2026-08-30T16:42",
            },
          ],
        },
      ],
    }
  );

  const impact = { minor: "amber", major: "red", maintenance: "blue" } as const;
  const range = ref("30");
  const closed = ref(new Set<string>());

  const cutoff = computed(() => {
    const date = new Date(`${props.today}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() - Number(range.value));
    return date.toISOString().slice(0, 10);
  });
  const list = computed(() => props.incidents.filter((incident) => incident.date > cutoff.value));

  /** Days with incidents, newest first, and the quiet days in between up to the first one shown. */
  const days = computed(() => {
    const dates = [...new Set(list.value.map((incident) => incident.date))].sort().reverse();
    const quiet = new Set<string>();
    for (let offset = 0; offset < Math.min(Number(range.value), 5); offset++) {
      const date = new Date(`${props.today}T00:00:00Z`);
      date.setUTCDate(date.getUTCDate() - offset);
      quiet.add(date.toISOString().slice(0, 10));
    }
    return [...new Set([...quiet, ...dates])]
      .sort()
      .reverse()
      .map((date) => ({ date, items: list.value.filter((incident) => incident.date === date) }));
  });

  function toggle(id: string) {
    const next = new Set(closed.value);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    closed.value = next;
  }

  const longDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  const time = (iso: string) =>
    new Date(`${iso}:00Z`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    }) + " UTC";
</script>
