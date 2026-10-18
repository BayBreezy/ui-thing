<template>
  <!--
    Mini calendar with an agenda
    Features: Compact calendar with dots on days that have events, pick a day to see its agenda, agenda items with time, place and attendees, empty day message and an add event button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-[auto_1fr]">
      <div class="mx-auto">
        <UiCalendar :attributes="attributes" expanded class="rounded-xl border" @dayclick="pick" />
      </div>

      <section aria-live="polite">
        <div class="flex items-center justify-between gap-3">
          <h1 class="text-xl font-bold tracking-tight">{{ heading }}</h1>
          <UiButton size="sm" @click="useSonner.info('Open your new event form here')"
            ><Icon name="lucide:plus" class="size-4" />Add event</UiButton
          >
        </div>
        <ul v-if="agenda.length" class="mt-4 space-y-3">
          <li v-for="event in agenda" :key="event.id" class="flex gap-4 rounded-xl border p-4">
            <div class="text-muted-foreground w-16 shrink-0 text-sm tabular-nums">
              {{ event.time }}
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-medium">{{ event.title }}</p>
              <p class="text-muted-foreground mt-0.5 flex items-center gap-1 text-sm">
                <Icon name="lucide:map-pin" class="size-3.5" />{{ event.place }}
              </p>
              <div class="mt-2 flex -space-x-1.5">
                <UiAvatar
                  v-for="person in event.people"
                  :key="person"
                  :src="`https://i.pravatar.cc/80?img=${person}`"
                  fallback="?"
                  class="ring-background size-6 ring-2"
                />
              </div>
            </div>
          </li>
        </ul>
        <p
          v-else
          class="text-muted-foreground mt-4 rounded-xl border border-dashed py-12 text-center text-sm"
        >
          Nothing planned. Enjoy the free day.
        </p>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Event = {
    id: string;
    title: string;
    date: string;
    time: string;
    place: string;
    people: number[];
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
          id: "a1",
          title: "Weekly standup",
          date: "2026-10-18",
          time: "9:30",
          place: "Meeting room 2",
          people: [32, 12, 44],
        },
        {
          id: "a2",
          title: "Design review",
          date: "2026-10-18",
          time: "13:00",
          place: "Video call",
          people: [32, 45],
        },
        {
          id: "a3",
          title: "Customer interview",
          date: "2026-10-18",
          time: "16:00",
          place: "Video call",
          people: [15],
        },
        {
          id: "a4",
          title: "Sprint planning",
          date: "2026-10-21",
          time: "10:00",
          place: "Meeting room 1",
          people: [12, 15, 45, 44],
        },
        {
          id: "a5",
          title: "Quarterly review",
          date: "2026-10-27",
          time: "14:00",
          place: "Boardroom",
          people: [45, 33],
        },
      ],
    }
  );

  const picked = ref(new Date(`${props.today}T12:00:00`));

  function pick(day: { date: Date }) {
    picked.value = day.date;
  }

  const iso = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const attributes = computed(() => [
    {
      key: "picked",
      highlight: { color: "blue", fillMode: "light" as const },
      dates: picked.value,
    },
    ...[...new Set(props.events.map((event) => event.date))].map((date) => ({
      key: date,
      dot: "blue",
      dates: new Date(`${date}T12:00:00`),
    })),
  ]);

  const agenda = computed(() => props.events.filter((event) => event.date === iso(picked.value)));
  const heading = computed(() =>
    picked.value.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  );
</script>
