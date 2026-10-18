<template>
  <!--
    Compact month with event dots
    Features: Small month grid with dots for events, days with many events get a stronger tint, selected day ring, arrow key navigation between days and a list of events for the chosen day
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-sm">
      <div class="mb-3 flex items-center justify-between">
        <h1 class="font-semibold" aria-live="polite">{{ monthLabel }}</h1>
        <div class="flex gap-1">
          <UiButton variant="ghost" size="icon-sm" aria-label="Previous month" @click="shift(-1)"
            ><Icon name="lucide:chevron-left" class="size-4"
          /></UiButton>
          <UiButton variant="ghost" size="icon-sm" aria-label="Next month" @click="shift(1)"
            ><Icon name="lucide:chevron-right" class="size-4"
          /></UiButton>
        </div>
      </div>

      <div class="text-muted-foreground grid grid-cols-7 text-center text-xs" aria-hidden="true">
        <span v-for="name in weekdays" :key="name" class="py-1">{{ name }}</span>
      </div>
      <div class="grid grid-cols-7 gap-y-1" role="group" :aria-label="monthLabel" @keydown="onKey">
        <button
          v-for="day in days"
          :key="day"
          type="button"
          :data-day="day"
          class="focus-visible:ring-ring/50 relative mx-auto flex size-10 flex-col items-center justify-center rounded-lg text-sm outline-none focus-visible:ring-[3px]"
          :class="[
            inMonth(day) ? '' : 'text-muted-foreground/50',
            selected === day ? 'ring-primary ring-2' : '',
            count(day) > 2 ? 'bg-primary/10' : '',
            day === today ? 'font-bold' : '',
          ]"
          :tabindex="selected === day ? 0 : -1"
          :aria-pressed="selected === day"
          :aria-label="`${longDate(day)}, ${count(day)} events`"
          @click="selected = day"
        >
          {{ Number(day.slice(8)) }}
          <span class="absolute bottom-1 flex gap-0.5" aria-hidden="true">
            <span
              v-for="n in Math.min(count(day), 3)"
              :key="n"
              class="bg-primary size-1 rounded-full"
            />
          </span>
        </button>
      </div>

      <section class="mt-5 border-t pt-4" aria-live="polite">
        <h2 class="text-sm font-semibold">{{ longDate(selected) }}</h2>
        <ul v-if="count(selected)" class="mt-2 space-y-1.5 text-sm">
          <li
            v-for="event in events.filter((item) => item.date === selected)"
            :key="event.id"
            class="flex items-center gap-2"
          >
            <span class="bg-primary size-1.5 rounded-full" />{{ event.title
            }}<span class="text-muted-foreground ml-auto text-xs">{{ event.time }}</span>
          </li>
        </ul>
        <p v-else class="text-muted-foreground mt-2 text-sm">No events.</p>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Event = { id: string; title: string; date: string; time: string };

  const props = withDefaults(
    defineProps<{
      today?: string;
      events?: Event[];
    }>(),
    {
      today: "2026-10-18",
      events: () => [
        { id: "d1", title: "Standup", date: "2026-10-06", time: "9:30" },
        { id: "d2", title: "Dentist", date: "2026-10-09", time: "8:15" },
        { id: "d3", title: "Standup", date: "2026-10-13", time: "9:30" },
        { id: "d4", title: "Launch party", date: "2026-10-15", time: "18:00" },
        { id: "d5", title: "Gym", date: "2026-10-18", time: "7:00" },
        { id: "d6", title: "Planning", date: "2026-10-18", time: "10:00" },
        { id: "d7", title: "Dinner with Sofia", date: "2026-10-18", time: "19:30" },
        { id: "d8", title: "Standup", date: "2026-10-20", time: "9:30" },
        { id: "d9", title: "Haircut", date: "2026-10-24", time: "11:00" },
      ],
    }
  );

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
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
  const count = (iso: string) => props.events.filter((event) => event.date === iso).length;
  const longDate = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
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
    selected.value = `${view.value}-01`;
  }

  function onKey(event: KeyboardEvent) {
    const move: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    const step = move[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const next = addDays(selected.value, step);
    selected.value = next;
    view.value = next.slice(0, 7);
    nextTick(() => (document.querySelector(`[data-day="${next}"]`) as HTMLElement | null)?.focus());
  }
</script>
