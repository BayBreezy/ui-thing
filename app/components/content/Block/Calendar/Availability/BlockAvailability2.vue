<template>
  <!--
    Date overrides
    Features: Add a date with unavailable all day or custom hours, quick add chips for common holidays, upcoming overrides sorted by date with a type badge, remove buttons and a count of how many are in the past
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-[18rem_1fr]">
      <UiCard class="gap-4 self-start">
        <UiCardHeader>
          <UiCardTitle class="text-base">Add an override</UiCardTitle>
          <UiCardDescription>Change your hours for a single day.</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <form class="space-y-4" novalidate @submit.prevent="add">
            <div class="space-y-2">
              <UiLabel for="override-date">Date</UiLabel>
              <UiInput id="override-date" v-model="draft.date" type="date" :min="today" />
              <p v-if="error" class="text-destructive text-sm">{{ error }}</p>
            </div>
            <UiRadioGroup v-model="draft.kind" class="grid gap-2" aria-label="Type">
              <label class="flex items-center gap-2 text-sm"
                ><UiRadioGroupItem value="off" />Unavailable all day</label
              >
              <label class="flex items-center gap-2 text-sm"
                ><UiRadioGroupItem value="custom" />Custom hours</label
              >
            </UiRadioGroup>
            <div v-if="draft.kind === 'custom'" class="flex items-center gap-2">
              <UiInput v-model="draft.start" type="time" aria-label="Start time" />
              <span class="text-muted-foreground">to</span>
              <UiInput v-model="draft.end" type="time" aria-label="End time" />
            </div>
            <UiButton type="submit" class="w-full">Add override</UiButton>
          </form>
          <div class="mt-5 border-t pt-4">
            <p class="text-muted-foreground mb-2 text-xs font-medium">Quick add</p>
            <div class="flex flex-wrap gap-2">
              <UiButton
                v-for="holiday in holidays"
                :key="holiday.date"
                variant="outline"
                size="sm"
                :disabled="items.some((item) => item.date === holiday.date)"
                @click="addHoliday(holiday)"
                >{{ holiday.name }}</UiButton
              >
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <section aria-live="polite">
        <h1 class="text-xl font-bold tracking-tight">Date overrides</h1>
        <p class="text-muted-foreground text-sm">
          {{ upcoming.length }} upcoming<span v-if="past > 0">, {{ past }} past hidden</span>
        </p>
        <ul v-if="upcoming.length" class="mt-4 divide-y rounded-xl border">
          <li v-for="item in upcoming" :key="item.date" class="flex items-center gap-3 px-4 py-3">
            <span
              class="bg-muted flex w-12 shrink-0 flex-col items-center rounded-md py-1 text-[10px] leading-tight font-semibold uppercase"
            >
              {{ month(item.date) }}<span class="text-base">{{ Number(item.date.slice(8)) }}</span>
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium">
                {{ weekday(item.date)
                }}<span v-if="item.label" class="text-muted-foreground font-normal">
                  · {{ item.label }}</span
                >
              </p>
              <p class="text-muted-foreground text-sm">
                {{
                  item.kind === "off" ? "Unavailable" : `${clock(item.start)} to ${clock(item.end)}`
                }}
              </p>
            </div>
            <UiBadge variant="soft" shape="pill" :color="item.kind === 'off' ? 'red' : 'blue'">{{
              item.kind === "off" ? "Off" : "Custom"
            }}</UiBadge>
            <UiButton
              variant="ghost"
              size="icon-sm"
              :aria-label="`Remove override for ${weekday(item.date)}`"
              @click="remove(item.date)"
              ><Icon name="lucide:trash-2" class="size-4"
            /></UiButton>
          </li>
        </ul>
        <div
          v-else
          class="text-muted-foreground mt-4 rounded-xl border border-dashed py-12 text-center text-sm"
        >
          No overrides. Your weekly hours apply every day.
        </div>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Kind = "off" | "custom";
  type Override = { date: string; kind: Kind; start: string; end: string; label?: string };

  const props = withDefaults(
    defineProps<{
      today?: string;
      overrides?: Override[];
    }>(),
    {
      today: "2026-10-18",
      overrides: () => [
        { date: "2026-10-09", kind: "off", start: "", end: "", label: "Offsite" },
        {
          date: "2026-10-23",
          kind: "custom",
          start: "09:00",
          end: "12:00",
          label: "Doctor in the afternoon",
        },
        { date: "2026-11-26", kind: "off", start: "", end: "", label: "Thanksgiving" },
      ],
    }
  );

  const holidays = [
    { name: "Thanksgiving", date: "2026-11-26" },
    { name: "Christmas Eve", date: "2026-12-24" },
    { name: "Christmas Day", date: "2026-12-25" },
    { name: "New Year's Day", date: "2027-01-01" },
  ];

  const items = ref<Override[]>(props.overrides.map((item) => ({ ...item })));
  const draft = reactive({ date: "", kind: "off" as Kind, start: "10:00", end: "14:00" });
  const error = ref("");

  const upcoming = computed(() =>
    items.value
      .filter((item) => item.date >= props.today)
      .sort((a, b) => a.date.localeCompare(b.date))
  );
  const past = computed(() => items.value.length - upcoming.value.length);

  const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);
  const month = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const weekday = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  const clock = (time: string) => {
    const hour = Number(time.slice(0, 2));
    return `${hour % 12 || 12}:${time.slice(3, 5)} ${hour < 12 ? "AM" : "PM"}`;
  };

  function add() {
    if (!draft.date) {
      error.value = "Pick a date.";
      return;
    }
    if (draft.date < props.today) {
      error.value = "Pick a date in the future.";
      return;
    }
    if (draft.kind === "custom" && draft.end <= draft.start) {
      error.value = "The end must be after the start.";
      return;
    }
    error.value = "";
    items.value = [
      ...items.value.filter((item) => item.date !== draft.date),
      {
        date: draft.date,
        kind: draft.kind,
        start: draft.kind === "custom" ? draft.start : "",
        end: draft.kind === "custom" ? draft.end : "",
      },
    ];
    draft.date = "";
  }

  function addHoliday(holiday: { name: string; date: string }) {
    items.value.push({ date: holiday.date, kind: "off", start: "", end: "", label: holiday.name });
  }

  function remove(date: string) {
    items.value = items.value.filter((item) => item.date !== date);
  }
</script>
