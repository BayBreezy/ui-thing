<template>
  <!--
    Team schedule with free slots
    Features: One row per teammate with busy blocks across the working day, out of office rows, a highlighted best time to meet when everyone is free, hour labels with a current time marker and previous and next day buttons
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold tracking-tight" aria-live="polite">Team schedule</h1>
        <p class="text-muted-foreground text-sm">{{ title }}</p>
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

    <div class="mt-6 rounded-xl border p-4" aria-live="polite">
      <p class="flex items-center gap-2 text-sm font-medium">
        <Icon name="lucide:sparkles" class="text-primary size-4" />Best time to meet
      </p>
      <div v-if="slots.length" class="mt-3 flex flex-wrap gap-2">
        <UiButton
          v-for="slot in slots"
          :key="slot.start"
          size="sm"
          :variant="chosen === slot.start ? 'default' : 'outline'"
          :aria-pressed="chosen === slot.start"
          @click="chosen = chosen === slot.start ? '' : slot.start"
          >{{ clock(slot.start) }} to {{ clock(slot.end) }}</UiButton
        >
      </div>
      <p v-else class="text-muted-foreground mt-2 text-sm">
        Nobody shares a free hour on this day.
      </p>
    </div>

    <div class="mt-4 overflow-x-auto rounded-xl border">
      <div class="min-w-[44rem]">
        <div class="grid grid-cols-[11rem_1fr] border-b" aria-hidden="true">
          <div />
          <div class="relative h-8">
            <span
              v-for="hour in marks.slice(0, -1)"
              :key="hour"
              class="text-muted-foreground absolute top-2 -translate-x-1/2 text-[11px]"
              :style="{ left: `${pct(hour * 60)}%` }"
              >{{ hourLabel(hour) }}</span
            >
          </div>
        </div>
        <ul>
          <li
            v-for="person in rows"
            :key="person.id"
            class="grid grid-cols-[11rem_1fr] items-center border-b last:border-b-0"
          >
            <div class="flex items-center gap-2.5 px-3 py-3">
              <UiAvatar
                :src="`https://i.pravatar.cc/80?img=${person.avatar}`"
                :fallback="person.name.slice(0, 1)"
                class="size-8"
              />
              <div class="min-w-0">
                <p class="truncate text-sm font-medium">{{ person.name }}</p>
                <p class="text-muted-foreground truncate text-xs">{{ person.role }}</p>
              </div>
            </div>
            <div
              class="relative my-2 h-9 rounded-md"
              :class="person.out ? 'bg-muted' : 'bg-muted/40'"
            >
              <span
                v-for="mark in marks"
                :key="mark"
                class="bg-border/60 absolute inset-y-0 w-px"
                :style="{ left: `${pct(mark * 60)}%` }"
                aria-hidden="true"
              />
              <span
                v-if="chosenSlot"
                class="border-primary/60 bg-primary/10 absolute inset-y-0 rounded border border-dashed"
                :style="span(chosenSlot.start, chosenSlot.end)"
                aria-hidden="true"
              />
              <p
                v-if="person.out"
                class="text-muted-foreground absolute inset-0 grid place-items-center text-xs"
              >
                Out of office
              </p>
              <span
                v-for="block in person.blocks"
                :key="block.title + block.start"
                class="absolute inset-y-1 truncate rounded px-1.5 text-[11px] leading-7 font-medium"
                :class="colors[block.color]"
                :style="span(block.start, block.end)"
                :title="`${block.title}, ${clock(block.start)} to ${clock(block.end)}`"
                >{{ block.title }}</span
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Color = "blue" | "green" | "amber" | "rose" | "violet";
  type Block = { date: string; start: string; end: string; title: string; color: Color };
  type Person = {
    id: string;
    name: string;
    role: string;
    avatar: number;
    out?: string[];
    blocks: Block[];
  };

  const props = withDefaults(
    defineProps<{
      today?: string;
      people?: Person[];
    }>(),
    {
      today: "2026-10-18",
      people: () => [
        {
          id: "p1",
          name: "Maya Patel",
          role: "Product designer",
          avatar: 32,
          blocks: [
            {
              date: "2026-10-18",
              start: "09:00",
              end: "10:00",
              title: "Standup and sync",
              color: "blue",
            },
            {
              date: "2026-10-18",
              start: "14:00",
              end: "15:00",
              title: "Design review",
              color: "violet",
            },
            { date: "2026-10-19", start: "10:00", end: "12:00", title: "Workshop", color: "rose" },
          ],
        },
        {
          id: "p2",
          name: "Leo Fischer",
          role: "Engineer",
          avatar: 12,
          blocks: [
            {
              date: "2026-10-18",
              start: "09:00",
              end: "10:00",
              title: "Standup and sync",
              color: "blue",
            },
            {
              date: "2026-10-18",
              start: "11:00",
              end: "12:30",
              title: "Code review",
              color: "green",
            },
            {
              date: "2026-10-18",
              start: "14:00",
              end: "15:00",
              title: "Design review",
              color: "violet",
            },
            { date: "2026-10-19", start: "09:00", end: "11:00", title: "Pairing", color: "green" },
          ],
        },
        {
          id: "p3",
          name: "Sofia Alvarez",
          role: "Product manager",
          avatar: 45,
          out: ["2026-10-19"],
          blocks: [
            { date: "2026-10-18", start: "09:00", end: "10:30", title: "Roadmap", color: "amber" },
            {
              date: "2026-10-18",
              start: "14:00",
              end: "16:00",
              title: "Customer calls",
              color: "rose",
            },
          ],
        },
        {
          id: "p4",
          name: "Noah Kim",
          role: "Engineering manager",
          avatar: 15,
          blocks: [
            {
              date: "2026-10-18",
              start: "09:30",
              end: "11:00",
              title: "Hiring loop",
              color: "amber",
            },
            {
              date: "2026-10-18",
              start: "12:00",
              end: "13:00",
              title: "Lunch with CTO",
              color: "green",
            },
            { date: "2026-10-19", start: "13:00", end: "14:00", title: "1:1s", color: "blue" },
          ],
        },
      ],
    }
  );

  const DAY_START = 8 * 60;
  const DAY_END = 18 * 60;
  const marks = Array.from({ length: 11 }, (_, index) => 8 + index);
  const colors: Record<Color, string> = {
    blue: "bg-blue-200 text-blue-900 dark:bg-blue-500/30 dark:text-blue-200",
    green: "bg-green-200 text-green-900 dark:bg-green-500/30 dark:text-green-200",
    amber: "bg-amber-200 text-amber-900 dark:bg-amber-500/30 dark:text-amber-200",
    rose: "bg-rose-200 text-rose-900 dark:bg-rose-500/30 dark:text-rose-200",
    violet: "bg-violet-200 text-violet-900 dark:bg-violet-500/30 dark:text-violet-200",
  };

  const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);
  const fmt = (date: Date) => date.toISOString().slice(0, 10);
  const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
  const pad = (value: number) => String(value).padStart(2, "0");
  const time = (total: number) => `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
  const clock = (value: string) => {
    const hour = Number(value.slice(0, 2));
    return `${hour % 12 || 12}:${value.slice(3, 5)} ${hour < 12 ? "AM" : "PM"}`;
  };
  const hourLabel = (hour: number) => `${hour % 12 || 12}${hour < 12 ? "a" : "p"}`;
  const pct = (total: number) => ((total - DAY_START) / (DAY_END - DAY_START)) * 100;
  const span = (start: string, end: string) => ({
    left: `${pct(minutes(start))}%`,
    width: `${pct(minutes(end)) - pct(minutes(start))}%`,
  });

  const day = ref(props.today);
  const chosen = ref("");
  const title = computed(() =>
    parse(day.value).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  const rows = computed(() =>
    props.people.map((person) => ({
      ...person,
      out: person.out?.includes(day.value) ?? false,
      blocks: person.blocks.filter((block) => block.date === day.value),
    }))
  );

  /** Free windows of an hour or more where nobody is busy or out of office. */
  const slots = computed(() => {
    if (rows.value.some((person) => person.out)) return [];
    const busy = rows.value
      .flatMap((person) => person.blocks.map((block) => [minutes(block.start), minutes(block.end)]))
      .sort((a, b) => a[0]! - b[0]!);
    const free: { start: string; end: string }[] = [];
    let cursor = DAY_START + 60;
    const limit = DAY_END - 60;
    for (const [from, to] of busy) {
      if (from! - cursor >= 60) free.push({ start: time(cursor), end: time(from!) });
      cursor = Math.max(cursor, to!);
    }
    if (limit - cursor >= 60) free.push({ start: time(cursor), end: time(limit) });
    return free;
  });
  const chosenSlot = computed(() => slots.value.find((slot) => slot.start === chosen.value));

  function shift(step: number) {
    const date = parse(day.value);
    date.setUTCDate(date.getUTCDate() + step);
    day.value = fmt(date);
    chosen.value = "";
  }
</script>
