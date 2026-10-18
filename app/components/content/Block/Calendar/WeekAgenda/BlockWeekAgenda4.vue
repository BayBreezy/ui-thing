<template>
  <!--
    Day timeline with free time
    Features: Vertical timeline of one day with past, current and upcoming events, a live progress bar on the running event, free time gaps between events, a busy time summary and previous and next day buttons
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight" aria-live="polite">{{ title }}</h1>
          <p class="text-muted-foreground mt-1 text-sm">
            {{ items.length }} {{ items.length === 1 ? "event" : "events" }}, {{ duration(busy) }}
            booked
          </p>
        </div>
        <div class="flex gap-2">
          <UiButton variant="outline" size="icon" aria-label="Previous day" @click="shift(-1)"
            ><Icon name="lucide:chevron-left" class="size-4"
          /></UiButton>
          <UiButton variant="outline" size="icon" aria-label="Next day" @click="shift(1)"
            ><Icon name="lucide:chevron-right" class="size-4"
          /></UiButton>
        </div>
      </div>

      <ol v-if="items.length" class="mt-8">
        <li v-for="(item, index) in items" :key="item.id" class="relative pb-2 pl-10">
          <span
            v-if="index < items.length - 1"
            class="bg-border absolute top-6 bottom-0 left-[0.6875rem] w-px"
            aria-hidden="true"
          />
          <span
            class="absolute top-1 left-0 grid size-6 place-items-center rounded-full border-2"
            :class="
              item.status === 'done'
                ? 'bg-muted text-muted-foreground border-transparent'
                : item.status === 'now'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background'
            "
            aria-hidden="true"
          >
            <Icon v-if="item.status === 'done'" name="lucide:check" class="size-3.5" />
            <span
              v-else-if="item.status === 'now'"
              class="size-2 animate-pulse rounded-full bg-current motion-reduce:animate-none"
            />
          </span>

          <div
            class="rounded-xl border p-4"
            :class="[
              item.status === 'done' ? 'opacity-60' : '',
              item.status === 'now' ? 'border-primary/50 bg-primary/5' : '',
            ]"
            :aria-current="item.status === 'now' ? 'time' : undefined"
          >
            <div class="flex items-center gap-2">
              <p class="text-muted-foreground text-xs tabular-nums">
                {{ clock(item.start) }} to {{ clock(item.end) }}
              </p>
              <UiBadge v-if="item.status === 'now'" variant="solid" shape="pill" color="blue"
                >Now</UiBadge
              >
            </div>
            <p class="mt-1 font-medium">{{ item.title }}</p>
            <p class="text-muted-foreground mt-0.5 flex items-center gap-1 text-sm">
              <Icon name="lucide:map-pin" class="size-3.5" />{{ item.place }}
            </p>
            <div
              v-if="item.status === 'now'"
              class="bg-muted mt-3 h-1.5 overflow-hidden rounded-full"
              role="progressbar"
              aria-label="Event progress"
              :aria-valuenow="item.progress"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div class="bg-primary h-full rounded-full" :style="{ width: `${item.progress}%` }" />
            </div>
          </div>

          <p v-if="item.gap > 0" class="text-muted-foreground flex items-center gap-2 py-3 text-xs">
            <Icon name="lucide:coffee" class="size-3.5" />{{ duration(item.gap) }} free
          </p>
        </li>
      </ol>
      <div
        v-else
        class="text-muted-foreground mt-8 rounded-xl border border-dashed py-14 text-center text-sm"
      >
        A clear day. Nothing on the timeline.
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Event = {
    id: string;
    title: string;
    date: string;
    start: string;
    end: string;
    place: string;
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
          id: "t1",
          title: "Morning run",
          date: "2026-10-18",
          start: "07:00",
          end: "08:00",
          place: "Riverside",
        },
        {
          id: "t2",
          title: "Standup",
          date: "2026-10-18",
          start: "09:00",
          end: "09:30",
          place: "Video call",
        },
        {
          id: "t3",
          title: "Weekly planning",
          date: "2026-10-18",
          start: "10:00",
          end: "11:00",
          place: "Meeting room 2",
        },
        {
          id: "t4",
          title: "Lunch with the new hires",
          date: "2026-10-18",
          start: "12:00",
          end: "13:00",
          place: "Rooftop",
        },
        {
          id: "t5",
          title: "Design review",
          date: "2026-10-18",
          start: "14:00",
          end: "15:30",
          place: "Video call",
        },
        {
          id: "t6",
          title: "Dinner with Sofia",
          date: "2026-10-18",
          start: "19:30",
          end: "21:00",
          place: "Osteria Nova",
        },
        {
          id: "t7",
          title: "Standup",
          date: "2026-10-19",
          start: "09:00",
          end: "09:30",
          place: "Video call",
        },
      ],
    }
  );

  const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);
  const fmt = (date: Date) => date.toISOString().slice(0, 10);
  const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
  const clock = (time: string) => {
    const hour = Number(time.slice(0, 2));
    return `${hour % 12 || 12}:${time.slice(3, 5)} ${hour < 12 ? "AM" : "PM"}`;
  };
  const duration = (total: number) => {
    const hours = Math.floor(total / 60);
    const rest = total % 60;
    return [hours ? `${hours}h` : "", rest ? `${rest}m` : ""].filter(Boolean).join(" ") || "0m";
  };

  const day = ref(props.now.slice(0, 10));
  const title = computed(() =>
    parse(day.value).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  const items = computed(() => {
    const list = props.events
      .filter((event) => event.date === day.value)
      .sort((a, b) => a.start.localeCompare(b.start));
    const current = props.now.slice(0, 10) === day.value ? minutes(props.now.slice(11, 16)) : null;
    return list.map((event, index) => {
      const from = minutes(event.start);
      const to = minutes(event.end);
      const next = list[index + 1];
      const status =
        current === null || current < from ? "upcoming" : current >= to ? "done" : "now";
      return {
        ...event,
        status: day.value < props.now.slice(0, 10) ? "done" : status,
        progress: current === null ? 0 : Math.round(((current - from) / (to - from)) * 100),
        gap: next ? Math.max(0, minutes(next.start) - to) : 0,
      };
    });
  });

  const busy = computed(() =>
    items.value.reduce((sum, item) => sum + minutes(item.end) - minutes(item.start), 0)
  );

  function shift(step: number) {
    const date = parse(day.value);
    date.setUTCDate(date.getUTCDate() + step);
    day.value = fmt(date);
  }
</script>
