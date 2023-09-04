<template>
  <div>
    <Heading
      title="Calendar"
      subtext="Displays a calendar that allows the user to select & view dates & events."
    />

    <div class="flex flex-wrap gap-5">
      <UICalendar :attributes="attributes" />
      <UICalendar title-position="right" />
      <UICalendar show-weeknumbers>
        <template #header-title="{ title }">
          <div class="flex items-center gap-2">
            <p>{{ title }}</p>
            <Icon class="h-4 w-4 text-muted-foreground" name="lucide:chevron-down" />
          </div>
        </template>
      </UICalendar>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { addDays, startOfMonth, startOfToday, endOfMonth } from "date-fns";

  const attributes = ref([
    {
      highlight: true,
      popover: {
        label: "Out of town bussiness trip",
      },
      dates: {
        start: startOfMonth(startOfToday()).toString(),
        end: addDays(startOfMonth(startOfToday()), 3).toString(),
      },
    },
    {
      popover: {
        label: "Take the dog to the vet",
      },
      dot: "red",
      dates: addDays(startOfMonth(startOfToday()), 5).toString(),
    },
    {
      bar: "green",
      popover: {
        label: "Dinner with friends",
      },
      dates: addDays(startOfMonth(startOfToday()), 8).toString(),
    },
    {
      dot: "purple",
      popover: {
        label: "Take the car to the mechanic",
      },
      dates: addDays(startOfMonth(startOfToday()), 14).toString(),
    },
    {
      highlight: true,
      popover: {
        label: "Family vacation in Ibiza",
      },
      dates: {
        start: addDays(startOfMonth(startOfToday()), 16).toString(),
        end: addDays(startOfMonth(startOfToday()), 20).toString(),
      },
    },
    {
      dot: true,
      popover: {
        label: "Take Noah to the football game",
      },
      dates: addDays(startOfMonth(startOfToday()), 22).toString(),
    },
    {
      highlight: true,
      popover: {
        label: "Visit the in-laws",
      },
      dates: endOfMonth(startOfToday()).toString(),
    },
  ]);
</script>
