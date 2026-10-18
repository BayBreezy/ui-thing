<template>
  <!--
    Week calendar with a time grid
    Features: Seven day grid with hour rows, events placed by start and end time, overlapping events sharing the column, a current time line on today, previous, next and today buttons and a details panel for the selected event
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h1 class="text-2xl font-bold tracking-tight" aria-live="polite">{{ rangeLabel }}</h1>
      <div class="flex items-center gap-2">
        <UiButton variant="outline" size="icon" aria-label="Previous week" @click="shift(-7)"
          ><Icon name="lucide:chevron-left" class="size-4"
        /></UiButton>
        <UiButton variant="outline" @click="goToday">Today</UiButton>
        <UiButton variant="outline" size="icon" aria-label="Next week" @click="shift(7)"
          ><Icon name="lucide:chevron-right" class="size-4"
        /></UiButton>
      </div>
    </div>

    <div class="mt-6 overflow-x-auto rounded-xl border">
      <div class="min-w-[44rem]">
        <div
          class="bg-muted/50 grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))] border-b text-center text-xs"
        >
          <div />
          <div v-for="day in week" :key="day" class="border-l py-2">
            <span class="text-muted-foreground block">{{ weekday(day) }}</span>
            <span
              class="mt-0.5 inline-grid size-7 place-items-center rounded-full text-sm font-semibold"
              :class="day === todayIso ? 'bg-primary text-primary-foreground' : ''"
              >{{ Number(day.slice(8)) }}</span
            >
          </div>
        </div>
        <div class="grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))]">
          <div aria-hidden="true">
            <div
              v-for="hour in hours"
              :key="hour"
              class="text-muted-foreground pt-1 pr-2 text-right text-[11px] leading-none"
              :style="{ height: `${ROW}px` }"
            >
              {{ hourLabel(hour) }}
            </div>
          </div>
          <div
            v-for="column in columns"
            :key="column.day"
            class="relative border-l"
            :style="{ height: `${hours.length * ROW}px` }"
            role="group"
            :aria-label="longDate(column.day)"
          >
            <div
              v-for="hour in hours"
              :key="hour"
              class="border-b"
              :style="{ height: `${ROW}px` }"
              aria-hidden="true"
            />
            <button
              v-for="item in column.items"
              :key="item.event.id"
              type="button"
              class="focus-visible:ring-ring/50 absolute overflow-hidden rounded-md border-l-4 px-1.5 py-1 text-left text-[11px] leading-tight outline-none focus-visible:ring-[3px]"
              :class="[colors[item.event.color], selected?.id === item.event.id ? 'ring-2' : '']"
              :style="place(item)"
              :aria-pressed="selected?.id === item.event.id"
              :aria-label="`${item.event.title}, ${clock(item.event.start)} to ${clock(item.event.end)}`"
              @click="selected = item.event"
            >
              <span class="block truncate font-semibold">{{ item.event.title }}</span>
              <span v-if="!item.short" class="block truncate opacity-80">{{
                clock(item.event.start)
              }}</span>
            </button>
            <div
              v-if="column.day === todayIso && nowTop !== null"
              class="pointer-events-none absolute inset-x-0 z-10 flex items-center"
              :style="{ top: `${nowTop}px` }"
              aria-hidden="true"
            >
              <span class="bg-destructive -ml-1 size-2 rounded-full" />
              <span class="bg-destructive h-px flex-1" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="mt-6 rounded-xl border p-4" aria-live="polite" aria-label="Selected event">
      <template v-if="selected">
        <div class="flex items-start gap-3">
          <span class="mt-1 size-3 shrink-0 rounded-full" :class="dots[selected.color]" />
          <div class="min-w-0 flex-1">
            <h2 class="font-semibold">{{ selected.title }}</h2>
            <p class="text-muted-foreground text-sm">
              {{ longDate(selected.date) }}, {{ clock(selected.start) }} to
              {{ clock(selected.end) }}
            </p>
            <p class="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
              <Icon name="lucide:map-pin" class="size-3.5" />{{ selected.place }}
            </p>
          </div>
          <UiButton
            variant="ghost"
            size="icon-sm"
            aria-label="Clear selection"
            @click="selected = null"
            ><Icon name="lucide:x" class="size-4"
          /></UiButton>
        </div>
      </template>
      <p v-else class="text-muted-foreground text-sm">Select an event to see its details.</p>
    </section>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Color = "blue" | "green" | "amber" | "rose" | "violet";
  type Event = {
    id: string;
    title: string;
    date: string;
    start: string;
    end: string;
    place: string;
    color: Color;
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
          id: "w1",
          title: "Weekly planning",
          date: "2026-10-18",
          start: "10:00",
          end: "11:00",
          place: "Meeting room 2",
          color: "blue",
        },
        {
          id: "w2",
          title: "Design review",
          date: "2026-10-18",
          start: "14:00",
          end: "15:30",
          place: "Video call",
          color: "violet",
        },
        {
          id: "w3",
          title: "Quick sync",
          date: "2026-10-18",
          start: "14:30",
          end: "15:00",
          place: "Video call",
          color: "green",
        },
        {
          id: "w4",
          title: "Standup",
          date: "2026-10-19",
          start: "09:00",
          end: "09:30",
          place: "Video call",
          color: "blue",
        },
        {
          id: "w5",
          title: "Customer interview",
          date: "2026-10-19",
          start: "11:00",
          end: "12:30",
          place: "Video call",
          color: "amber",
        },
        {
          id: "w6",
          title: "1:1 with Sofia",
          date: "2026-10-20",
          start: "13:00",
          end: "14:00",
          place: "Cafe on 5th",
          color: "green",
        },
        {
          id: "w7",
          title: "Workshop",
          date: "2026-10-20",
          start: "15:00",
          end: "17:00",
          place: "Boardroom",
          color: "rose",
        },
        {
          id: "w8",
          title: "Standup",
          date: "2026-10-21",
          start: "09:00",
          end: "09:30",
          place: "Video call",
          color: "blue",
        },
        {
          id: "w9",
          title: "Sprint planning",
          date: "2026-10-21",
          start: "10:00",
          end: "11:30",
          place: "Meeting room 1",
          color: "violet",
        },
        {
          id: "w10",
          title: "Demo day",
          date: "2026-10-21",
          start: "16:00",
          end: "17:00",
          place: "Main hall",
          color: "rose",
        },
        {
          id: "w11",
          title: "Lunch and learn",
          date: "2026-10-22",
          start: "12:00",
          end: "13:00",
          place: "Kitchen",
          color: "amber",
        },
        {
          id: "w12",
          title: "Standup",
          date: "2026-10-23",
          start: "09:00",
          end: "09:30",
          place: "Video call",
          color: "blue",
        },
        {
          id: "w13",
          title: "Retro",
          date: "2026-10-23",
          start: "15:00",
          end: "16:00",
          place: "Meeting room 2",
          color: "violet",
        },
      ],
    }
  );

  const ROW = 48;
  const FIRST_HOUR = 8;
  const hours = Array.from({ length: 10 }, (_, index) => FIRST_HOUR + index);
  const colors: Record<Color, string> = {
    blue: "border-blue-500 bg-blue-100 text-blue-900 dark:bg-blue-500/20 dark:text-blue-200",
    green: "border-green-500 bg-green-100 text-green-900 dark:bg-green-500/20 dark:text-green-200",
    amber: "border-amber-500 bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200",
    rose: "border-rose-500 bg-rose-100 text-rose-900 dark:bg-rose-500/20 dark:text-rose-200",
    violet:
      "border-violet-500 bg-violet-100 text-violet-900 dark:bg-violet-500/20 dark:text-violet-200",
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
  const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
  const clock = (time: string) => {
    const hour = Number(time.slice(0, 2));
    return `${hour % 12 || 12}:${time.slice(3, 5)} ${hour < 12 ? "AM" : "PM"}`;
  };
  const hourLabel = (hour: number) => `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}`;
  const weekday = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
  const longDate = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });

  const todayIso = computed(() => props.now.slice(0, 10));
  const weekStart = ref(addDays(todayIso.value, -parse(todayIso.value).getUTCDay()));
  const selected = ref<Event | null>(null);

  const week = computed(() =>
    Array.from({ length: 7 }, (_, index) => addDays(weekStart.value, index))
  );
  const rangeLabel = computed(() => {
    const short = (iso: string) =>
      parse(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
    return `${short(week.value[0]!)} to ${short(week.value[6]!)}, ${week.value[6]!.slice(0, 4)}`;
  });

  type Placed = { event: Event; lane: number; lanes: number; short?: boolean };

  /** Puts overlapping events side by side. Each cluster of overlaps shares the width. */
  function layout(list: Event[]) {
    const sorted = [...list].sort((a, b) => a.start.localeCompare(b.start));
    const out: Placed[] = [];
    let cluster: Placed[] = [];
    let laneEnds: number[] = [];
    let clusterEnd = 0;
    const flush = () => {
      cluster.forEach((item) => (item.lanes = laneEnds.length));
      out.push(...cluster);
      cluster = [];
      laneEnds = [];
      clusterEnd = 0;
    };
    for (const event of sorted) {
      const from = minutes(event.start);
      const to = minutes(event.end);
      if (cluster.length && from >= clusterEnd) flush();
      let lane = laneEnds.findIndex((end) => end <= from);
      if (lane === -1) lane = laneEnds.length;
      laneEnds[lane] = to;
      clusterEnd = Math.max(clusterEnd, to);
      cluster.push({ event, lane, lanes: 1, short: to - from <= 30 });
    }
    flush();
    return out;
  }

  const columns = computed(() =>
    week.value.map((day) => ({
      day,
      items: layout(props.events.filter((event) => event.date === day)),
    }))
  );

  function place(item: Placed) {
    const top = ((minutes(item.event.start) - FIRST_HOUR * 60) / 60) * ROW;
    const height = ((minutes(item.event.end) - minutes(item.event.start)) / 60) * ROW;
    return {
      top: `${top + 1}px`,
      height: `${Math.max(height - 2, 18)}px`,
      left: `calc(${(item.lane / item.lanes) * 100}% + 2px)`,
      width: `calc(${100 / item.lanes}% - 4px)`,
    };
  }

  const nowTop = computed(() => {
    const offset = minutes(props.now.slice(11, 16)) - FIRST_HOUR * 60;
    return offset >= 0 && offset <= hours.length * 60 ? (offset / 60) * ROW : null;
  });

  function shift(step: number) {
    weekStart.value = addDays(weekStart.value, step);
  }

  function goToday() {
    weekStart.value = addDays(todayIso.value, -parse(todayIso.value).getUTCDay());
  }
</script>
