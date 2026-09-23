<template>
  <FullCalendar :options="calendarOptions">
    <template #eventContent="{ event, timeText }">
      <UiPopover>
        <UiPopoverTrigger as-child>
          <div class="flex h-full w-full cursor-pointer items-center gap-1.5 overflow-hidden px-1">
            <UiBadge :variant="event.extendedProps.variant" size="sm" class="shrink-0">
              {{ event.extendedProps.category }}
            </UiBadge>
            <span class="truncate text-xs font-medium">{{ event.title }}</span>
          </div>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-64">
          <p class="text-sm font-semibold">{{ event.title }}</p>
          <p class="text-muted-foreground text-sm">{{ timeText || "All day" }}</p>
          <p class="mt-2 text-sm">{{ event.extendedProps.details }}</p>
        </UiPopoverContent>
      </UiPopover>
    </template>
  </FullCalendar>
</template>

<script lang="ts" setup>
  import type { CalendarOptions } from "@fullcalendar/vue3";
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/vue3/daygrid";
  import classicTheme from "@fullcalendar/vue3/themes/classic";
  import dayjs from "dayjs";

  const calendarOptions: CalendarOptions = {
    plugins: [classicTheme, dayGridPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,today,next",
      center: "title",
      right: "dayGridWeek,dayGridMonth",
    },
    eventColor: "transparent",
    eventContrastColor: "var(--color-foreground)",
    events: [
      {
        title: "Design review",
        date: dayjs().format("YYYY-MM-DD"),
        category: "Design",
        variant: "info",
        details: "Review the new dashboard mockups with the team.",
      },
      {
        title: "Release v2.4",
        date: dayjs().add(2, "day").format("YYYY-MM-DD"),
        category: "Release",
        variant: "success",
        details: "Ship the release and announce it in the changelog.",
      },
      {
        title: "Fix login bug",
        date: dayjs().add(4, "day").format("YYYY-MM-DD"),
        category: "Bug",
        variant: "destructive",
        details: "Users are being logged out after refreshing the page.",
      },
    ],
  };
</script>
