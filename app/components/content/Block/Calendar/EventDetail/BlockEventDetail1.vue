<template>
  <!--
    Event popover
    Features: Event chips on a week row that open a popover with title, time, place, description, attendees and actions, join, duplicate and delete buttons that update the row, and focus that returns to the chip when the popover closes
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-4xl">
      <h1 class="text-2xl font-bold tracking-tight">This week</h1>
      <div class="mt-4 grid gap-3 md:grid-cols-5">
        <section
          v-for="day in week"
          :key="day"
          class="min-h-48 rounded-xl border p-2.5"
          :aria-label="longDate(day)"
        >
          <p class="text-muted-foreground mb-2 px-1 text-xs font-medium">
            {{ weekday(day) }} <span class="text-foreground">{{ Number(day.slice(8)) }}</span>
          </p>
          <div class="space-y-1.5">
            <UiPopover v-for="event in eventsOn(day)" :key="event.id">
              <UiPopoverTrigger as-child>
                <button
                  type="button"
                  class="focus-visible:ring-ring/50 w-full truncate rounded-md border-l-4 px-2 py-1.5 text-left text-xs font-medium outline-none focus-visible:ring-[3px]"
                  :class="colors[event.color]"
                >
                  <span class="block truncate">{{ event.title }}</span>
                  <span class="block font-normal opacity-80">{{ clock(event.start) }}</span>
                </button>
              </UiPopoverTrigger>
              <UiPopoverContent class="w-80 p-0" align="start">
                <div class="space-y-3 p-4">
                  <div class="flex items-start gap-3">
                    <span class="mt-1.5 size-3 shrink-0 rounded-full" :class="dots[event.color]" />
                    <div class="min-w-0">
                      <p class="font-semibold">{{ event.title }}</p>
                      <p class="text-muted-foreground text-sm">
                        {{ longDate(event.date) }}, {{ clock(event.start) }} to
                        {{ clock(event.end) }}
                      </p>
                    </div>
                  </div>
                  <p class="text-muted-foreground flex items-center gap-2 text-sm">
                    <Icon name="lucide:map-pin" class="size-4 shrink-0" />{{ event.place }}
                  </p>
                  <p class="text-sm">{{ event.description }}</p>
                  <div class="flex items-center gap-2">
                    <div class="flex -space-x-1.5">
                      <UiAvatar
                        v-for="person in event.people"
                        :key="person"
                        :src="`https://i.pravatar.cc/80?img=${person}`"
                        fallback="?"
                        class="ring-background size-6 ring-2"
                      />
                    </div>
                    <span class="text-muted-foreground text-xs"
                      >{{ event.people.length }} going</span
                    >
                  </div>
                </div>
                <div class="flex items-center gap-1 border-t p-2">
                  <UiButton size="sm" @click="useSonner.success(`Joining ${event.title}`)"
                    ><Icon name="lucide:video" class="size-4" />Join</UiButton
                  >
                  <UiButton variant="ghost" size="sm" @click="duplicate(event)"
                    ><Icon name="lucide:copy" class="size-4" />Duplicate</UiButton
                  >
                  <UiButton
                    variant="ghost"
                    size="sm"
                    class="text-destructive hover:text-destructive ml-auto"
                    :aria-label="`Delete ${event.title}`"
                    @click="remove(event)"
                    ><Icon name="lucide:trash-2" class="size-4"
                  /></UiButton>
                </div>
              </UiPopoverContent>
            </UiPopover>
            <p v-if="!eventsOn(day).length" class="text-muted-foreground px-1 text-xs">No events</p>
          </div>
        </section>
      </div>
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
    description: string;
    color: Color;
    people: number[];
  };

  const props = withDefaults(
    defineProps<{
      today?: string;
      events?: Event[];
    }>(),
    {
      today: "2026-10-19",
      events: () => [
        {
          id: "p1",
          title: "Standup",
          date: "2026-10-19",
          start: "09:00",
          end: "09:30",
          place: "Video call",
          description: "Quick round of updates and blockers.",
          color: "blue",
          people: [12, 15, 44],
        },
        {
          id: "p2",
          title: "Customer interview",
          date: "2026-10-19",
          start: "11:00",
          end: "12:00",
          place: "Video call",
          description: "Talk to a customer about how they use reports.",
          color: "amber",
          people: [32, 45],
        },
        {
          id: "p3",
          title: "1:1 with Sofia",
          date: "2026-10-20",
          start: "13:00",
          end: "14:00",
          place: "Cafe on 5th",
          description: "Career growth and next quarter goals.",
          color: "green",
          people: [45],
        },
        {
          id: "p4",
          title: "Sprint planning",
          date: "2026-10-21",
          start: "10:00",
          end: "11:30",
          place: "Meeting room 1",
          description: "Pick the stories for the next sprint and set the goal.",
          color: "violet",
          people: [12, 15, 45, 44],
        },
        {
          id: "p5",
          title: "Demo day",
          date: "2026-10-23",
          start: "16:00",
          end: "17:00",
          place: "Main hall",
          description: "Teams show what they shipped this month.",
          color: "rose",
          people: [33, 32, 12],
        },
      ],
    }
  );

  const items = ref<Event[]>(
    props.events.map((event) => ({ ...event, people: [...event.people] }))
  );
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
  const clock = (time: string) => {
    const hour = Number(time.slice(0, 2));
    return `${hour % 12 || 12}:${time.slice(3, 5)} ${hour < 12 ? "AM" : "PM"}`;
  };
  const weekday = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
  const longDate = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });

  const week = computed(() => {
    const date = parse(props.today);
    const offset = (date.getUTCDay() + 6) % 7;
    return Array.from({ length: 5 }, (_, index) => {
      const day = parse(props.today);
      day.setUTCDate(day.getUTCDate() - offset + index);
      return day.toISOString().slice(0, 10);
    });
  });

  const eventsOn = (day: string) =>
    items.value
      .filter((event) => event.date === day)
      .sort((a, b) => a.start.localeCompare(b.start));

  function duplicate(event: Event) {
    items.value.push({
      ...event,
      id: `${event.id}-copy-${items.value.length}`,
      title: `${event.title} (copy)`,
      people: [...event.people],
    });
    useSonner.success("Event duplicated");
  }

  function remove(event: Event) {
    items.value = items.value.filter((item) => item.id !== event.id);
    useSonner.success(`Deleted ${event.title}`);
  }
</script>
