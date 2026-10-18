<template>
  <!--
    Month calendar with multi day events
    Features: Events that span several days drawn as bars across the week rows, bars that continue over week breaks with rounded ends only where they start and finish, a legend and an accessible list of events below
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex items-center justify-between gap-3">
      <h1 class="text-2xl font-bold tracking-tight" aria-live="polite">{{ monthLabel }}</h1>
      <div class="flex gap-2">
        <UiButton variant="outline" size="icon" aria-label="Previous month" @click="shift(-1)"
          ><Icon name="lucide:chevron-left" class="size-4"
        /></UiButton>
        <UiButton variant="outline" size="icon" aria-label="Next month" @click="shift(1)"
          ><Icon name="lucide:chevron-right" class="size-4"
        /></UiButton>
      </div>
    </div>

    <div class="mt-6 overflow-x-auto">
      <div class="min-w-[40rem] overflow-hidden rounded-xl border" aria-hidden="true">
        <div class="bg-muted/50 grid grid-cols-7 border-b text-center text-xs font-medium">
          <div v-for="name in weekdays" :key="name" class="text-muted-foreground py-2">
            {{ name }}
          </div>
        </div>
        <div v-for="(week, index) in weeks" :key="index" class="relative border-b last:border-b-0">
          <div class="grid grid-cols-7">
            <div
              v-for="day in week.days"
              :key="day"
              class="border-r px-1.5 py-1 text-xs last:border-r-0"
              :class="inMonth(day) ? '' : 'bg-muted/30 text-muted-foreground'"
              :style="{ minHeight: `${Math.max(6, 2.25 + week.lanes * 1.5)}rem` }"
            >
              <span
                class="inline-grid size-6 place-items-center rounded-full font-medium"
                :class="day === today ? 'bg-primary text-primary-foreground' : ''"
                >{{ Number(day.slice(8)) }}</span
              >
            </div>
          </div>
          <div class="pointer-events-none absolute inset-x-0 top-8 grid grid-cols-7 gap-y-1 px-0.5">
            <div
              v-for="bar in week.bars"
              :key="bar.id"
              class="truncate px-2 py-0.5 text-[11px] font-medium"
              :class="[
                colors[bar.color],
                bar.startsHere ? 'ml-0.5 rounded-l-md' : '',
                bar.endsHere ? 'mr-0.5 rounded-r-md' : '',
              ]"
              :style="{ gridColumn: `${bar.col} / span ${bar.span}`, gridRow: bar.lane + 1 }"
            >
              {{ bar.startsHere || bar.col === 1 ? bar.title : "" }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <ul class="mt-6 grid gap-2 sm:grid-cols-2" aria-label="Events this month">
      <li
        v-for="event in monthEvents"
        :key="event.id"
        class="flex items-center gap-3 rounded-lg border px-3 py-2 text-sm"
      >
        <span class="size-2.5 rounded-full" :class="dots[event.color]" />
        <span class="flex-1 font-medium">{{ event.title }}</span>
        <span class="text-muted-foreground text-xs">{{ range(event) }}</span>
      </li>
    </ul>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Color = "blue" | "green" | "amber" | "rose" | "violet";
  type Event = { id: string; title: string; start: string; end: string; color: Color };

  const props = withDefaults(
    defineProps<{
      today?: string;
      events?: Event[];
    }>(),
    {
      today: "2026-10-18",
      events: () => [
        {
          id: "m1",
          title: "Conference in Berlin",
          start: "2026-10-05",
          end: "2026-10-08",
          color: "blue",
        },
        {
          id: "m2",
          title: "Design sprint",
          start: "2026-10-12",
          end: "2026-10-16",
          color: "violet",
        },
        { id: "m3", title: "Vacation", start: "2026-10-19", end: "2026-10-23", color: "green" },
        {
          id: "m4",
          title: "Product launch week",
          start: "2026-10-26",
          end: "2026-11-01",
          color: "rose",
        },
        { id: "m5", title: "Training", start: "2026-10-14", end: "2026-10-15", color: "amber" },
      ],
    }
  );

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const colors: Record<Color, string> = {
    blue: "bg-blue-200 text-blue-900 dark:bg-blue-500/30 dark:text-blue-200",
    green: "bg-green-200 text-green-900 dark:bg-green-500/30 dark:text-green-200",
    amber: "bg-amber-200 text-amber-900 dark:bg-amber-500/30 dark:text-amber-200",
    rose: "bg-rose-200 text-rose-900 dark:bg-rose-500/30 dark:text-rose-200",
    violet: "bg-violet-200 text-violet-900 dark:bg-violet-500/30 dark:text-violet-200",
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

  const weeks = computed(() => {
    const first = parse(`${view.value}-01`);
    const start = addDays(fmt(first), -first.getUTCDay());
    return Array.from({ length: 6 }, (_, w) => {
      const days = Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d));
      const first = days[0]!;
      const last = days[6]!;
      const lanes: number[] = [];
      const bars = props.events
        .filter((event) => event.start <= last && event.end >= first)
        .sort((a, b) => a.start.localeCompare(b.start))
        .map((event) => {
          const from = event.start < first ? first : event.start;
          const to = event.end > last ? last : event.end;
          const col = days.indexOf(from) + 1;
          const span = days.indexOf(to) + 1 - col + 1;
          let lane = lanes.findIndex((end) => end < col);
          if (lane === -1) lane = lanes.length;
          lanes[lane] = col + span - 1;
          return {
            id: event.id,
            title: event.title,
            color: event.color,
            col,
            span,
            lane,
            startsHere: event.start >= first,
            endsHere: event.end <= last,
          };
        });
      return { days, bars, lanes: lanes.length };
    });
  });

  const inMonth = (iso: string) => iso.startsWith(view.value);
  const monthEvents = computed(() =>
    props.events.filter(
      (event) => event.start.slice(0, 7) === view.value || event.end.slice(0, 7) === view.value
    )
  );
  const monthLabel = computed(() =>
    parse(`${view.value}-01`).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })
  );
  const label = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  const range = (event: Event) =>
    event.start === event.end ? label(event.start) : `${label(event.start)} to ${label(event.end)}`;

  function shift(step: number) {
    const date = parse(`${view.value}-01`);
    date.setUTCMonth(date.getUTCMonth() + step);
    view.value = fmt(date).slice(0, 7);
  }
</script>
