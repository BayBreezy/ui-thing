<template>
  <!--
    Compact calendar widget with upcoming events
    Features: Small card with the current month and event markers, the next three events with relative day labels and a view all link
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-xs gap-4">
      <UiCardHeader class="flex flex-row items-center justify-between gap-2 pb-0">
        <UiCardTitle class="text-base" aria-live="polite">{{ monthLabel }}</UiCardTitle>
        <div class="flex gap-1">
          <UiButton
            variant="ghost"
            size="icon-sm"
            class="size-7"
            aria-label="Previous month"
            @click="shift(-1)"
            ><Icon name="lucide:chevron-left" class="size-4"
          /></UiButton>
          <UiButton
            variant="ghost"
            size="icon-sm"
            class="size-7"
            aria-label="Next month"
            @click="shift(1)"
            ><Icon name="lucide:chevron-right" class="size-4"
          /></UiButton>
        </div>
      </UiCardHeader>
      <UiCardContent>
        <div
          class="text-muted-foreground grid grid-cols-7 text-center text-[11px]"
          aria-hidden="true"
        >
          <span v-for="(name, i) in weekdays" :key="i">{{ name }}</span>
        </div>
        <div class="grid grid-cols-7 gap-y-0.5 text-center text-xs">
          <span
            v-for="day in days"
            :key="day"
            class="relative mx-auto grid size-8 place-items-center rounded-full"
            :class="[
              inMonth(day) ? '' : 'text-muted-foreground/40',
              day === today ? 'bg-primary text-primary-foreground font-semibold' : '',
            ]"
          >
            {{ Number(day.slice(8)) }}
            <span v-if="hasEvent(day)" class="sr-only">, has events</span>
            <span
              v-if="hasEvent(day) && day !== today"
              class="bg-primary absolute bottom-0.5 size-1 rounded-full"
            />
          </span>
        </div>
      </UiCardContent>
      <UiCardContent class="border-t pt-4">
        <h2 class="mb-2 text-xs font-semibold tracking-wide uppercase">Upcoming</h2>
        <ul class="space-y-3">
          <li v-for="event in upcoming" :key="event.id" class="flex items-start gap-3">
            <span
              class="bg-muted flex w-10 shrink-0 flex-col items-center rounded-md py-1 text-[10px] leading-tight font-semibold uppercase"
              >{{ month(event.date)
              }}<span class="text-sm">{{ Number(event.date.slice(8)) }}</span></span
            >
            <div class="min-w-0">
              <p class="truncate text-sm font-medium">{{ event.title }}</p>
              <p class="text-muted-foreground text-xs">
                {{ relative(event.date) }} · {{ event.time }}
              </p>
            </div>
          </li>
          <li v-if="!upcoming.length" class="text-muted-foreground text-sm">Nothing coming up.</li>
        </ul>
        <UiButton
          variant="link"
          size="sm"
          class="mt-2 h-auto p-0"
          @click="useSonner.info('Open your full calendar here')"
          >View all events</UiButton
        >
      </UiCardContent>
    </UiCard>
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
        { id: "w1", title: "Design review", date: "2026-10-18", time: "2:00 PM" },
        { id: "w2", title: "Sprint planning", date: "2026-10-21", time: "10:00 AM" },
        { id: "w3", title: "Customer webinar", date: "2026-10-27", time: "5:00 PM" },
        { id: "w4", title: "Team offsite", date: "2026-11-05", time: "All day" },
        { id: "w5", title: "Quarterly review", date: "2026-11-12", time: "1:00 PM" },
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

  const days = computed(() => {
    const first = parse(`${view.value}-01`);
    const start = addDays(fmt(first), -first.getUTCDay());
    return Array.from({ length: 42 }, (_, index) => addDays(start, index));
  });

  const inMonth = (iso: string) => iso.startsWith(view.value);
  const hasEvent = (iso: string) => props.events.some((event) => event.date === iso);
  const upcoming = computed(() =>
    props.events.filter((event) => event.date >= props.today).slice(0, 3)
  );
  const monthLabel = computed(() =>
    parse(`${view.value}-01`).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })
  );
  const month = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });

  function relative(iso: string) {
    const diff = Math.round((parse(iso).getTime() - parse(props.today).getTime()) / 86_400_000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return `In ${diff} days`;
  }

  function shift(step: number) {
    const date = parse(`${view.value}-01`);
    date.setUTCMonth(date.getUTCMonth() + step);
    view.value = fmt(date).slice(0, 7);
  }
</script>
