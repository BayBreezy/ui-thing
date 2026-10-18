<template>
  <!--
    Month calendar with events
    Features: Month grid with previous, next and today buttons, color coded event chips with a plus more link, days outside the month dimmed, today highlighted, selectable days with a details list and full keyboard access
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h1 class="text-2xl font-bold tracking-tight" aria-live="polite">{{ monthLabel }}</h1>
      <div class="flex items-center gap-2">
        <UiButton variant="outline" size="icon" aria-label="Previous month" @click="shift(-1)"
          ><Icon name="lucide:chevron-left" class="size-4"
        /></UiButton>
        <UiButton variant="outline" @click="goToday">Today</UiButton>
        <UiButton variant="outline" size="icon" aria-label="Next month" @click="shift(1)"
          ><Icon name="lucide:chevron-right" class="size-4"
        /></UiButton>
      </div>
    </div>

    <div class="mt-6 overflow-x-auto">
      <div class="min-w-[40rem] overflow-hidden rounded-xl border">
        <div
          class="bg-muted/50 grid grid-cols-7 border-b text-center text-xs font-medium"
          aria-hidden="true"
        >
          <div v-for="name in weekdays" :key="name" class="text-muted-foreground py-2">
            {{ name }}
          </div>
        </div>
        <div class="grid grid-cols-7" role="group" :aria-label="monthLabel">
          <button
            v-for="day in days"
            :key="day"
            type="button"
            class="focus-visible:ring-ring/50 min-h-24 border-r border-b p-1.5 text-left align-top outline-none last:border-r-0 focus-visible:ring-[3px] focus-visible:ring-inset [&:nth-child(7n)]:border-r-0"
            :class="[
              inMonth(day) ? '' : 'bg-muted/30 text-muted-foreground',
              selected === day ? 'bg-primary/5' : '',
            ]"
            :aria-pressed="selected === day"
            :aria-label="`${longDate(day)}, ${eventsOn(day).length} events`"
            @click="selected = day"
          >
            <span
              class="inline-grid size-6 place-items-center rounded-full text-xs font-medium"
              :class="day === today ? 'bg-primary text-primary-foreground' : ''"
              >{{ Number(day.slice(8)) }}</span
            >
            <span
              v-for="event in eventsOn(day).slice(0, 2)"
              :key="event.id"
              class="mt-1 block truncate rounded px-1.5 py-0.5 text-[11px] font-medium"
              :class="colors[event.color]"
              >{{ event.title }}</span
            >
            <span
              v-if="eventsOn(day).length > 2"
              class="text-muted-foreground mt-0.5 block px-1 text-[11px]"
              >+{{ eventsOn(day).length - 2 }} more</span
            >
          </button>
        </div>
      </div>
    </div>

    <section class="mt-6 rounded-xl border p-4" aria-live="polite" aria-label="Selected day">
      <h2 class="text-sm font-semibold">{{ longDate(selected) }}</h2>
      <ul v-if="eventsOn(selected).length" class="mt-3 space-y-2">
        <li
          v-for="event in eventsOn(selected)"
          :key="event.id"
          class="flex items-center gap-3 text-sm"
        >
          <span class="size-2.5 rounded-full" :class="dots[event.color]" />
          <span class="flex-1">{{ event.title }}</span>
          <span class="text-muted-foreground text-xs">{{ event.time }}</span>
        </li>
      </ul>
      <p v-else class="text-muted-foreground mt-2 text-sm">No events on this day.</p>
    </section>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Color = "blue" | "green" | "amber" | "rose" | "violet";
  type Event = { id: string; title: string; date: string; time: string; color: Color };

  const props = withDefaults(
    defineProps<{
      /** The date highlighted as today (ISO). Use today's date in your own app. */
      today?: string;
      events?: Event[];
    }>(),
    {
      today: "2026-10-18",
      events: () => [
        { id: "e1", title: "Team standup", date: "2026-10-05", time: "9:30 AM", color: "blue" },
        { id: "e2", title: "Design review", date: "2026-10-08", time: "2:00 PM", color: "violet" },
        { id: "e3", title: "Product launch", date: "2026-10-15", time: "All day", color: "rose" },
        { id: "e4", title: "1:1 with Sofia", date: "2026-10-18", time: "11:00 AM", color: "green" },
        { id: "e5", title: "Budget meeting", date: "2026-10-18", time: "3:00 PM", color: "amber" },
        { id: "e6", title: "Team lunch", date: "2026-10-18", time: "12:30 PM", color: "green" },
        { id: "e7", title: "Customer call", date: "2026-10-18", time: "4:30 PM", color: "blue" },
        { id: "e8", title: "Sprint planning", date: "2026-10-21", time: "10:00 AM", color: "blue" },
        { id: "e9", title: "Webinar", date: "2026-10-27", time: "5:00 PM", color: "violet" },
        { id: "e10", title: "Offsite", date: "2026-10-30", time: "All day", color: "amber" },
      ],
    }
  );

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const colors: Record<Color, string> = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300",
    green: "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
    rose: "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300",
    violet: "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300",
  };
  const dots: Record<Color, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    violet: "bg-violet-500",
  };

  const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);
  const fmt = (date: Date) => date.toISOString().slice(0, 10);
  const addDays = (iso: string, count: number) => {
    const date = parse(iso);
    date.setUTCDate(date.getUTCDate() + count);
    return fmt(date);
  };

  const view = ref(props.today.slice(0, 7));
  const selected = ref(props.today);

  const days = computed(() => {
    const first = parse(`${view.value}-01`);
    const start = addDays(fmt(first), -first.getUTCDay());
    return Array.from({ length: 42 }, (_, index) => addDays(start, index));
  });

  const inMonth = (iso: string) => iso.startsWith(view.value);
  const eventsOn = (iso: string) => props.events.filter((event) => event.date === iso);
  const longDate = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  const monthLabel = computed(() =>
    parse(`${view.value}-01`).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })
  );

  function shift(step: number) {
    const date = parse(`${view.value}-01`);
    date.setUTCMonth(date.getUTCMonth() + step);
    view.value = fmt(date).slice(0, 7);
  }

  function goToday() {
    view.value = props.today.slice(0, 7);
    selected.value = props.today;
  }
</script>
