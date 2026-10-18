<template>
  <!--
    Day view with hourly rows
    Features: One day split into hourly rows, an all day strip, event cards with place and attendees, a working hours switch that trims the grid, a current time marker and previous and next day buttons
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight" aria-live="polite">{{ title }}</h1>
          <p class="text-muted-foreground text-sm">
            {{ dayEvents.length }} {{ dayEvents.length === 1 ? "event" : "events" }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UiButton variant="outline" size="icon" aria-label="Previous day" @click="shift(-1)"
            ><Icon name="lucide:chevron-left" class="size-4"
          /></UiButton>
          <UiButton variant="outline" size="icon" aria-label="Next day" @click="shift(1)"
            ><Icon name="lucide:chevron-right" class="size-4"
          /></UiButton>
        </div>
      </div>

      <div class="mt-4 flex items-center gap-2">
        <UiSwitch id="working-hours" v-model="workingOnly" />
        <UiLabel for="working-hours" class="text-sm">Working hours only (9 AM to 5 PM)</UiLabel>
      </div>

      <ul v-if="allDay.length" class="mt-4 space-y-1.5" aria-label="All day">
        <li
          v-for="event in allDay"
          :key="event.id"
          class="rounded-md px-3 py-1.5 text-sm font-medium"
          :class="colors[event.color]"
        >
          {{ event.title }}<span class="ml-2 text-xs font-normal opacity-80">All day</span>
        </li>
      </ul>

      <div class="mt-4 overflow-hidden rounded-xl border">
        <div class="relative" :style="{ height: `${hours.length * ROW}px` }">
          <div
            v-for="(hour, index) in hours"
            :key="hour"
            class="absolute inset-x-0 flex border-b"
            :style="{ top: `${index * ROW}px`, height: `${ROW}px` }"
            aria-hidden="true"
          >
            <span
              class="text-muted-foreground w-16 shrink-0 pt-1 pr-3 text-right text-[11px] leading-none"
              >{{ hourLabel(hour) }}</span
            >
            <span class="border-l" />
          </div>
          <ul class="absolute inset-y-0 right-2 left-[4.5rem]" aria-label="Events">
            <li
              v-for="item in placed"
              :key="item.event.id"
              class="absolute overflow-hidden rounded-md border-l-4 px-2.5 py-1.5 text-xs"
              :class="colors[item.event.color]"
              :style="item.style"
            >
              <p class="truncate text-sm font-semibold">
                {{ item.event.title }}
                <span v-if="item.short" class="ml-1 text-xs font-normal opacity-80">{{
                  clock(item.event.start)
                }}</span>
              </p>
              <p v-if="!item.short" class="truncate opacity-80">
                {{ clock(item.event.start) }} to {{ clock(item.event.end) }}, {{ item.event.place }}
              </p>
              <div v-if="item.tall" class="mt-1.5 flex -space-x-1.5">
                <UiAvatar
                  v-for="person in item.event.people"
                  :key="person"
                  :src="`https://i.pravatar.cc/80?img=${person}`"
                  fallback="?"
                  class="ring-background size-5 ring-2"
                />
              </div>
            </li>
          </ul>
          <div
            v-if="nowTop !== null"
            class="pointer-events-none absolute right-0 left-[4rem] z-10 flex items-center"
            :style="{ top: `${nowTop}px` }"
            aria-hidden="true"
          >
            <span class="bg-destructive size-2 rounded-full" />
            <span class="bg-destructive h-px flex-1" />
          </div>
        </div>
      </div>
      <p v-if="!dayEvents.length" class="text-muted-foreground mt-4 text-center text-sm">
        Nothing scheduled for this day.
      </p>
    </div>
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
    people: number[];
    allDay?: boolean;
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
          id: "d0",
          title: "Sofia is out of office",
          date: "2026-10-18",
          start: "00:00",
          end: "23:59",
          place: "",
          color: "amber",
          people: [],
          allDay: true,
        },
        {
          id: "d1",
          title: "Weekly planning",
          date: "2026-10-18",
          start: "10:00",
          end: "11:00",
          place: "Meeting room 2",
          color: "blue",
          people: [32, 12, 44],
        },
        {
          id: "d2",
          title: "Lunch with the new hires",
          date: "2026-10-18",
          start: "12:00",
          end: "13:00",
          place: "Rooftop",
          color: "green",
          people: [45, 33],
        },
        {
          id: "d3",
          title: "Design review",
          date: "2026-10-18",
          start: "14:00",
          end: "15:30",
          place: "Video call",
          color: "violet",
          people: [32, 45, 15],
        },
        {
          id: "d4",
          title: "Inbox zero",
          date: "2026-10-18",
          start: "17:30",
          end: "18:00",
          place: "Desk",
          color: "rose",
          people: [],
        },
        {
          id: "d5",
          title: "Early run",
          date: "2026-10-18",
          start: "07:00",
          end: "08:00",
          place: "Riverside",
          color: "green",
          people: [],
        },
        {
          id: "d6",
          title: "Standup",
          date: "2026-10-19",
          start: "09:00",
          end: "09:30",
          place: "Video call",
          color: "blue",
          people: [12, 15],
        },
      ],
    }
  );

  const ROW = 56;
  const workingOnly = ref(false);
  const firstHour = computed(() => (workingOnly.value ? 9 : 7));
  const lastHour = computed(() => (workingOnly.value ? 17 : 19));
  const hours = computed(() =>
    Array.from({ length: lastHour.value - firstHour.value }, (_, index) => firstHour.value + index)
  );
  const colors: Record<Color, string> = {
    blue: "border-blue-500 bg-blue-100 text-blue-900 dark:bg-blue-500/20 dark:text-blue-200",
    green: "border-green-500 bg-green-100 text-green-900 dark:bg-green-500/20 dark:text-green-200",
    amber: "border-amber-500 bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200",
    rose: "border-rose-500 bg-rose-100 text-rose-900 dark:bg-rose-500/20 dark:text-rose-200",
    violet:
      "border-violet-500 bg-violet-100 text-violet-900 dark:bg-violet-500/20 dark:text-violet-200",
  };

  const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);
  const fmt = (date: Date) => date.toISOString().slice(0, 10);
  const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
  const clock = (time: string) => {
    const hour = Number(time.slice(0, 2));
    return `${hour % 12 || 12}:${time.slice(3, 5)} ${hour < 12 ? "AM" : "PM"}`;
  };
  const hourLabel = (hour: number) => `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}`;

  const day = ref(props.now.slice(0, 10));
  const title = computed(() =>
    parse(day.value).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  const dayEvents = computed(() => props.events.filter((event) => event.date === day.value));
  const allDay = computed(() => dayEvents.value.filter((event) => event.allDay));

  const placed = computed(() => {
    const top = firstHour.value * 60;
    const bottom = lastHour.value * 60;
    return dayEvents.value
      .filter((event) => !event.allDay)
      .filter((event) => minutes(event.end) > top && minutes(event.start) < bottom)
      .map((event) => {
        const from = Math.max(minutes(event.start), top);
        const to = Math.min(minutes(event.end), bottom);
        const height = ((to - from) / 60) * ROW;
        return {
          event,
          tall: height >= 72 && event.people.length > 0,
          short: height < 48,
          style: {
            top: `${((from - top) / 60) * ROW + 2}px`,
            height: `${Math.max(height - 4, 24)}px`,
            left: "0",
            right: "0",
          },
        };
      });
  });

  const nowTop = computed(() => {
    if (day.value !== props.now.slice(0, 10)) return null;
    const offset = minutes(props.now.slice(11, 16)) - firstHour.value * 60;
    return offset >= 0 && offset <= hours.value.length * 60 ? (offset / 60) * ROW : null;
  });

  function shift(step: number) {
    const date = parse(day.value);
    date.setUTCDate(date.getUTCDate() + step);
    day.value = fmt(date);
  }
</script>
