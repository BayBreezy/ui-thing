<template>
  <!--
    Upcoming events card
    Features: Card with the next event highlighted with a countdown and a join button, a list of the following events with date chips and attendees, a today or this week switch and a reminder toggle per event
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-md gap-0 py-0">
      <div class="flex items-center justify-between gap-3 border-b px-5 py-4">
        <h1 class="font-semibold">Upcoming</h1>
        <UiToggleGroup
          :model-value="range"
          type="single"
          size="sm"
          variant="outline"
          aria-label="Time range"
          @update:model-value="(value) => (range = (value as Range) || 'week')"
        >
          <UiToggleGroupItem value="today">Today</UiToggleGroupItem>
          <UiToggleGroupItem value="week">This week</UiToggleGroupItem>
        </UiToggleGroup>
      </div>

      <div v-if="next" class="bg-primary/5 border-b px-5 py-4" aria-live="polite">
        <p class="text-primary text-xs font-semibold tracking-wide uppercase">Up next</p>
        <p class="mt-1 text-lg font-semibold">{{ next.title }}</p>
        <p class="text-muted-foreground text-sm">
          {{ clock(next.start) }} to {{ clock(next.end) }}, {{ next.place }}
        </p>
        <div class="mt-3 flex items-center justify-between gap-3">
          <span class="text-sm font-medium">{{ countdown(next) }}</span>
          <UiButton size="sm" @click="useSonner.success(`Joining ${next.title}`)"
            ><Icon name="lucide:video" class="size-4" />Join</UiButton
          >
        </div>
      </div>

      <ul v-if="rest.length" class="divide-y">
        <li v-for="event in rest" :key="event.id" class="flex items-center gap-3 px-5 py-3">
          <span
            class="bg-muted flex w-11 shrink-0 flex-col items-center rounded-md py-1 text-[10px] leading-tight font-semibold uppercase"
          >
            {{ monthShort(event.date) }}
            <span class="text-base">{{ Number(event.date.slice(8)) }}</span>
          </span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">{{ event.title }}</p>
            <p class="text-muted-foreground truncate text-xs">
              {{ dayLabel(event.date) }}, {{ clock(event.start) }}
            </p>
            <div class="mt-1.5 flex -space-x-1.5">
              <UiAvatar
                v-for="person in event.people"
                :key="person"
                :src="`https://i.pravatar.cc/80?img=${person}`"
                fallback="?"
                class="ring-background size-5 ring-2"
              />
            </div>
          </div>
          <UiButton
            variant="ghost"
            size="icon-sm"
            :aria-label="`${reminders.has(event.id) ? 'Remove reminder for' : 'Remind me about'} ${event.title}`"
            :aria-pressed="reminders.has(event.id)"
            @click="toggleReminder(event.id)"
            ><Icon
              :name="reminders.has(event.id) ? 'lucide:bell-ring' : 'lucide:bell'"
              class="size-4"
              :class="reminders.has(event.id) ? 'text-primary' : ''"
          /></UiButton>
        </li>
      </ul>
      <p
        v-if="!next"
        class="text-muted-foreground px-5 py-10 text-center text-sm"
        aria-live="polite"
      >
        You have nothing coming up {{ range === "today" ? "today" : "this week" }}.
      </p>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Range = "today" | "week";
  type Event = {
    id: string;
    title: string;
    date: string;
    start: string;
    end: string;
    place: string;
    people: number[];
  };

  const props = withDefaults(
    defineProps<{
      /** The current moment as `YYYY-MM-DDTHH:mm`. Pass the real time in your own app. */
      now?: string;
      events?: Event[];
    }>(),
    {
      now: "2026-10-18T10:20",
      events: () => [
        {
          id: "u1",
          title: "Weekly planning",
          date: "2026-10-18",
          start: "10:45",
          end: "11:30",
          place: "Meeting room 2",
          people: [32, 12, 44],
        },
        {
          id: "u2",
          title: "Design review",
          date: "2026-10-18",
          start: "14:00",
          end: "15:30",
          place: "Video call",
          people: [32, 45],
        },
        {
          id: "u3",
          title: "Customer interview",
          date: "2026-10-19",
          start: "11:00",
          end: "12:00",
          place: "Video call",
          people: [15],
        },
        {
          id: "u4",
          title: "Sprint planning",
          date: "2026-10-21",
          start: "10:00",
          end: "11:30",
          place: "Meeting room 1",
          people: [12, 15, 45, 44],
        },
        {
          id: "u5",
          title: "Demo day",
          date: "2026-10-23",
          start: "16:00",
          end: "17:00",
          place: "Main hall",
          people: [33, 32],
        },
        {
          id: "u6",
          title: "Quarterly review",
          date: "2026-10-27",
          start: "14:00",
          end: "16:00",
          place: "Boardroom",
          people: [45, 33],
        },
      ],
    }
  );

  const range = ref<Range>("week");
  const reminders = ref(new Set<string>(["u2"]));

  const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);
  const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
  const clock = (time: string) => {
    const hour = Number(time.slice(0, 2));
    return `${hour % 12 || 12}:${time.slice(3, 5)} ${hour < 12 ? "AM" : "PM"}`;
  };
  const monthShort = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const stamp = (event: Event) => `${event.date}T${event.start}`;

  const visible = computed(() => {
    const today = props.now.slice(0, 10);
    const limit = new Date(parse(today).getTime() + 6 * 86_400_000).toISOString().slice(0, 10);
    return props.events
      .filter((event) => stamp(event) >= props.now.slice(0, 16))
      .filter((event) => (range.value === "today" ? event.date === today : event.date <= limit))
      .sort((a, b) => stamp(a).localeCompare(stamp(b)));
  });
  const next = computed(() => visible.value[0]);
  const rest = computed(() => visible.value.slice(1));

  function dayLabel(iso: string) {
    const diff = Math.round(
      (parse(iso).getTime() - parse(props.now.slice(0, 10)).getTime()) / 86_400_000
    );
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return parse(iso).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
  }

  function countdown(event: Event) {
    const days = Math.round(
      (parse(event.date).getTime() - parse(props.now.slice(0, 10)).getTime()) / 86_400_000
    );
    const total = days * 1440 + minutes(event.start) - minutes(props.now.slice(11, 16));
    if (total >= 1440) return `Starts in ${Math.floor(total / 1440)} days`;
    if (total >= 60) return `Starts in ${Math.floor(total / 60)}h ${total % 60}m`;
    return `Starts in ${total} min`;
  }

  function toggleReminder(id: string) {
    const next = new Set(reminders.value);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    reminders.value = next;
  }
</script>
