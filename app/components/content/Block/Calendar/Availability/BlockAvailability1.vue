<template>
  <!--
    Weekly hours editor
    Features: A row for each weekday with an on and off switch, one or more time ranges per day, add and remove range buttons, a copy to other days action, range validation and a weekly total
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-2xl gap-0 py-0">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4">
        <div>
          <h1 class="font-semibold">Weekly hours</h1>
          <p class="text-muted-foreground text-sm" aria-live="polite">{{ total }} hours a week</p>
        </div>
        <UiButton size="sm" :disabled="!valid" @click="save">Save</UiButton>
      </div>
      <ul class="divide-y">
        <li
          v-for="day in days"
          :key="day.name"
          class="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-start"
        >
          <div class="flex w-36 shrink-0 items-center gap-3 sm:pt-1.5">
            <UiSwitch
              :model-value="day.on"
              :aria-label="`${day.name} available`"
              @update:model-value="toggle(day, $event)"
            />
            <span class="text-sm font-medium" :class="day.on ? '' : 'text-muted-foreground'">{{
              day.name
            }}</span>
          </div>
          <div class="flex-1">
            <p v-if="!day.on" class="text-muted-foreground pt-1.5 text-sm">Unavailable</p>
            <ul v-else class="space-y-2">
              <li v-for="(range, index) in day.ranges" :key="index">
                <div class="flex items-center gap-2">
                  <UiInput
                    v-model="range.start"
                    type="time"
                    class="w-32"
                    :aria-label="`${day.name} start ${index + 1}`"
                  />
                  <span class="text-muted-foreground">to</span>
                  <UiInput
                    v-model="range.end"
                    type="time"
                    class="w-32"
                    :aria-label="`${day.name} end ${index + 1}`"
                    :aria-invalid="range.end <= range.start"
                  />
                  <UiButton
                    variant="ghost"
                    size="icon-sm"
                    :aria-label="`Remove ${day.name} range ${index + 1}`"
                    @click="removeRange(day, index)"
                    ><Icon name="lucide:x" class="size-4"
                  /></UiButton>
                </div>
                <p v-if="range.end <= range.start" class="text-destructive mt-1 text-xs">
                  The end must be after the start.
                </p>
              </li>
            </ul>
          </div>
          <div v-if="day.on" class="flex gap-1">
            <UiButton
              variant="ghost"
              size="icon-sm"
              :aria-label="`Add a range on ${day.name}`"
              @click="day.ranges.push({ start: '13:00', end: '17:00' })"
              ><Icon name="lucide:plus" class="size-4"
            /></UiButton>
            <UiButton
              variant="ghost"
              size="icon-sm"
              :aria-label="`Copy ${day.name} to weekdays`"
              @click="copyToWeekdays(day)"
              ><Icon name="lucide:copy" class="size-4"
            /></UiButton>
          </div>
        </li>
      </ul>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Range = { start: string; end: string };
  type Day = { name: string; on: boolean; ranges: Range[] };

  const props = withDefaults(
    defineProps<{
      hours?: Day[];
    }>(),
    {
      hours: () => [
        { name: "Sunday", on: false, ranges: [] },
        {
          name: "Monday",
          on: true,
          ranges: [
            { start: "09:00", end: "12:00" },
            { start: "13:00", end: "17:00" },
          ],
        },
        { name: "Tuesday", on: true, ranges: [{ start: "09:00", end: "17:00" }] },
        { name: "Wednesday", on: true, ranges: [{ start: "09:00", end: "17:00" }] },
        { name: "Thursday", on: true, ranges: [{ start: "10:00", end: "16:00" }] },
        { name: "Friday", on: true, ranges: [{ start: "09:00", end: "13:00" }] },
        { name: "Saturday", on: false, ranges: [] },
      ],
    }
  );

  const days = ref<Day[]>(
    props.hours.map((day) => ({ ...day, ranges: day.ranges.map((range) => ({ ...range })) }))
  );

  const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
  const valid = computed(() =>
    days.value.every(
      (day) => !day.on || day.ranges.every((range) => range.start && range.end > range.start)
    )
  );
  const total = computed(() => {
    const sum = days.value.reduce(
      (all, day) =>
        all +
        (day.on
          ? day.ranges.reduce(
              (hours, range) => hours + Math.max(0, minutes(range.end) - minutes(range.start)),
              0
            )
          : 0),
      0
    );
    return Math.round((sum / 60) * 10) / 10;
  });

  function toggle(day: Day, value: boolean | string) {
    day.on = value === true;
    if (day.on && !day.ranges.length) day.ranges.push({ start: "09:00", end: "17:00" });
  }

  function removeRange(day: Day, index: number) {
    day.ranges.splice(index, 1);
    if (!day.ranges.length) day.on = false;
  }

  function copyToWeekdays(source: Day) {
    for (const day of days.value) {
      if (day === source || day.name === "Sunday" || day.name === "Saturday") continue;
      day.on = true;
      day.ranges = source.ranges.map((range) => ({ ...range }));
    }
    useSonner.success(`Copied ${source.name} to every weekday`);
  }

  function save() {
    useSonner.success("Weekly hours saved");
  }
</script>
