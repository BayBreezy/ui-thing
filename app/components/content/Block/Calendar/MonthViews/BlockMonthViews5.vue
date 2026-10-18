<template>
  <!--
    Year overview with twelve months
    Features: Mini month grids for the whole year, days with events marked, today highlighted, month headings that jump to a detail panel, previous and next year buttons and event counts per month
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex items-center justify-between gap-3">
      <h1 class="text-2xl font-bold tracking-tight" aria-live="polite">{{ year }}</h1>
      <div class="flex gap-2">
        <UiButton variant="outline" size="icon" aria-label="Previous year" @click="year--"
          ><Icon name="lucide:chevron-left" class="size-4"
        /></UiButton>
        <UiButton variant="outline" size="icon" aria-label="Next year" @click="year++"
          ><Icon name="lucide:chevron-right" class="size-4"
        /></UiButton>
      </div>
    </div>

    <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <section v-for="month in months" :key="month.index" :aria-label="month.name">
        <h2 class="mb-1">
          <button
            type="button"
            class="hover:text-primary focus-visible:ring-ring/50 flex w-full items-center justify-between rounded px-1 text-sm font-semibold outline-none focus-visible:ring-[3px]"
            :aria-pressed="active === month.index"
            @click="active = month.index"
          >
            {{ month.name }}
            <span v-if="month.count" class="text-muted-foreground text-xs font-normal"
              >{{ month.count }} {{ month.count === 1 ? "event" : "events" }}</span
            >
          </button>
        </h2>
        <div
          class="text-muted-foreground grid grid-cols-7 text-center text-[10px]"
          aria-hidden="true"
        >
          <span v-for="(name, i) in weekdays" :key="i">{{ name }}</span>
        </div>
        <div class="grid grid-cols-7 text-center text-xs">
          <span
            v-for="(cell, i) in month.cells"
            :key="i"
            class="mx-auto grid size-7 place-items-center rounded-full"
            :class="[
              cell.today ? 'bg-primary text-primary-foreground font-semibold' : '',
              cell.event && !cell.today
                ? 'bg-blue-100 font-medium text-blue-800 dark:bg-blue-500/20 dark:text-blue-300'
                : '',
            ]"
            >{{ cell.day }}<span v-if="cell.label" class="sr-only">, {{ cell.label }}</span></span
          >
        </div>
      </section>
    </div>

    <section class="mt-8 rounded-xl border p-4" aria-live="polite">
      <h2 class="text-sm font-semibold">{{ months[active]!.name }} {{ year }}</h2>
      <ul v-if="activeEvents.length" class="mt-3 space-y-2 text-sm">
        <li v-for="event in activeEvents" :key="event.id" class="flex items-center gap-3">
          <Icon name="lucide:calendar-days" class="text-muted-foreground size-4" /><span
            class="flex-1"
            >{{ event.title }}</span
          ><span class="text-muted-foreground text-xs">{{ shortDate(event.date) }}</span>
        </li>
      </ul>
      <p v-else class="text-muted-foreground mt-2 text-sm">No events this month.</p>
    </section>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Event = { id: string; title: string; date: string };

  const props = withDefaults(
    defineProps<{
      today?: string;
      events?: Event[];
    }>(),
    {
      today: "2026-10-18",
      events: () => [
        { id: "y1", title: "Team offsite", date: "2026-02-12" },
        { id: "y2", title: "Spring launch", date: "2026-03-20" },
        { id: "y3", title: "Board meeting", date: "2026-05-07" },
        { id: "y4", title: "Summer break begins", date: "2026-07-01" },
        { id: "y5", title: "Conference talk", date: "2026-09-10" },
        { id: "y6", title: "Product launch", date: "2026-10-15" },
        { id: "y7", title: "Quarterly review", date: "2026-10-27" },
        { id: "y8", title: "Holiday party", date: "2026-12-17" },
      ],
    }
  );

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const year = ref(Number(props.today.slice(0, 4)));
  const active = ref(Number(props.today.slice(5, 7)) - 1);

  const months = computed(() =>
    Array.from({ length: 12 }, (_, index) => {
      const first = new Date(Date.UTC(year.value, index, 1));
      const length = new Date(Date.UTC(year.value, index + 1, 0)).getUTCDate();
      const prefix = `${year.value}-${String(index + 1).padStart(2, "0")}`;
      const cells: { day: number | string; today: boolean; event: boolean; label?: string }[] =
        Array.from({ length: first.getUTCDay() }, () => ({ day: "", today: false, event: false }));
      for (let day = 1; day <= length; day++) {
        const iso = `${prefix}-${String(day).padStart(2, "0")}`;
        const hits = props.events.filter((event) => event.date === iso);
        cells.push({
          day,
          today: iso === props.today,
          event: hits.length > 0,
          label: hits.map((hit) => hit.title).join(", "),
        });
      }
      return {
        index,
        name: first.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" }),
        cells,
        count: props.events.filter((event) => event.date.startsWith(prefix)).length,
      };
    })
  );

  const activeEvents = computed(() =>
    props.events.filter((event) =>
      event.date.startsWith(`${year.value}-${String(active.value + 1).padStart(2, "0")}`)
    )
  );
  const shortDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
</script>
