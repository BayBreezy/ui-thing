<template>
  <!--
    Agenda list grouped by day
    Features: Upcoming events grouped under day headings with Today and Tomorrow labels, a category filter, time range, place and category badge on each row, a join button for video calls and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Agenda</h1>
        <UiToggleGroup
          :model-value="filter"
          type="single"
          variant="outline"
          aria-label="Filter events"
          @update:model-value="(value) => (filter = (value as Filter) || 'all')"
        >
          <UiToggleGroupItem v-for="item in filters" :key="item.value" :value="item.value">{{
            item.label
          }}</UiToggleGroupItem>
        </UiToggleGroup>
      </div>

      <div v-if="groups.length" class="mt-6 space-y-8" aria-live="polite">
        <section v-for="group in groups" :key="group.date" :aria-label="longDate(group.date)">
          <h2 class="flex items-baseline gap-2 border-b pb-2 text-sm font-semibold">
            <span>{{ relative(group.date) ?? shortWeekday(group.date) }}</span>
            <span class="text-muted-foreground font-normal">{{ longDate(group.date) }}</span>
          </h2>
          <ul class="divide-y">
            <li v-for="event in group.items" :key="event.id" class="flex items-center gap-4 py-3">
              <div class="text-muted-foreground w-24 shrink-0 text-sm tabular-nums">
                <template v-if="event.start">{{ clock(event.start) }}</template>
                <template v-else>All day</template>
                <span v-if="event.end" class="block text-xs">to {{ clock(event.end) }}</span>
              </div>
              <span class="h-10 w-1 shrink-0 rounded-full" :class="bars[event.kind]" />
              <div class="min-w-0 flex-1">
                <p class="truncate font-medium">{{ event.title }}</p>
                <p class="text-muted-foreground flex items-center gap-1 truncate text-sm">
                  <Icon :name="event.video ? 'lucide:video' : 'lucide:map-pin'" class="size-3.5" />
                  {{ event.place }}
                </p>
              </div>
              <UiBadge
                variant="soft"
                :color="badges[event.kind]"
                shape="pill"
                class="hidden sm:inline-flex"
                >{{ kindLabel[event.kind] }}</UiBadge
              >
              <UiButton
                v-if="event.video"
                size="sm"
                variant="outline"
                :aria-label="`Join ${event.title}`"
                @click="useSonner.success(`Joining ${event.title}`)"
                >Join</UiButton
              >
            </li>
          </ul>
        </section>
      </div>
      <div
        v-else
        class="text-muted-foreground mt-6 rounded-xl border border-dashed py-14 text-center text-sm"
        aria-live="polite"
      >
        <Icon name="lucide:calendar-check" class="mx-auto mb-2 size-6" />
        No events match this filter.
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Kind = "meeting" | "personal" | "deadline";
  type Filter = "all" | Kind;
  type Event = {
    id: string;
    title: string;
    date: string;
    start?: string;
    end?: string;
    place: string;
    kind: Kind;
    video?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      today?: string;
      events?: Event[];
    }>(),
    {
      today: "2026-10-18",
      events: () => [
        {
          id: "g1",
          title: "Weekly planning",
          date: "2026-10-18",
          start: "10:00",
          end: "11:00",
          place: "Meeting room 2",
          kind: "meeting",
        },
        {
          id: "g2",
          title: "Design review",
          date: "2026-10-18",
          start: "14:00",
          end: "15:30",
          place: "Video call",
          kind: "meeting",
          video: true,
        },
        {
          id: "g3",
          title: "Dinner with Sofia",
          date: "2026-10-18",
          start: "19:30",
          end: "21:00",
          place: "Osteria Nova",
          kind: "personal",
        },
        {
          id: "g4",
          title: "Standup",
          date: "2026-10-19",
          start: "09:00",
          end: "09:30",
          place: "Video call",
          kind: "meeting",
          video: true,
        },
        {
          id: "g5",
          title: "Submit expense report",
          date: "2026-10-19",
          place: "Finance portal",
          kind: "deadline",
        },
        {
          id: "g6",
          title: "Customer interview",
          date: "2026-10-21",
          start: "11:00",
          end: "12:00",
          place: "Video call",
          kind: "meeting",
          video: true,
        },
        {
          id: "g7",
          title: "Dentist",
          date: "2026-10-21",
          start: "16:30",
          end: "17:15",
          place: "Smile clinic",
          kind: "personal",
        },
        {
          id: "g8",
          title: "Release candidate freeze",
          date: "2026-10-23",
          place: "Repository",
          kind: "deadline",
        },
        {
          id: "g9",
          title: "Quarterly review",
          date: "2026-10-27",
          start: "14:00",
          end: "16:00",
          place: "Boardroom",
          kind: "meeting",
        },
      ],
    }
  );

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "meeting", label: "Meetings" },
    { value: "personal", label: "Personal" },
    { value: "deadline", label: "Deadlines" },
  ];
  const kindLabel: Record<Kind, string> = {
    meeting: "Meeting",
    personal: "Personal",
    deadline: "Deadline",
  };
  const bars: Record<Kind, string> = {
    meeting: "bg-blue-500",
    personal: "bg-green-500",
    deadline: "bg-rose-500",
  };
  const badges: Record<Kind, string> = { meeting: "blue", personal: "green", deadline: "red" };

  const filter = ref<Filter>("all");

  const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);
  const clock = (time: string) => {
    const hour = Number(time.slice(0, 2));
    return `${hour % 12 || 12}:${time.slice(3, 5)} ${hour < 12 ? "AM" : "PM"}`;
  };
  const longDate = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" });
  const shortWeekday = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });

  function relative(iso: string) {
    const diff = Math.round((parse(iso).getTime() - parse(props.today).getTime()) / 86_400_000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return null;
  }

  const groups = computed(() => {
    const visible = props.events
      .filter((event) => event.date >= props.today)
      .filter((event) => filter.value === "all" || event.kind === filter.value)
      .sort((a, b) => `${a.date}${a.start ?? ""}`.localeCompare(`${b.date}${b.start ?? ""}`));
    const byDate = new Map<string, Event[]>();
    for (const event of visible) byDate.set(event.date, [...(byDate.get(event.date) ?? []), event]);
    return [...byDate].map(([date, items]) => ({ date, items }));
  });
</script>
