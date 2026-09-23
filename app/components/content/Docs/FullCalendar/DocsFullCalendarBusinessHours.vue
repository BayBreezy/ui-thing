<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script lang="ts" setup>
  import type { CalendarOptions } from "@fullcalendar/vue3";
  import FullCalendar from "@fullcalendar/vue3";
  import classicTheme from "@fullcalendar/vue3/themes/classic";
  import timeGridPlugin from "@fullcalendar/vue3/timegrid";
  import dayjs from "dayjs";

  const calendarOptions: CalendarOptions = {
    plugins: [classicTheme, timeGridPlugin],
    initialView: "timeGridWeek",
    nowIndicator: true,
    weekends: false,
    slotMinTime: "07:00:00",
    slotMaxTime: "19:00:00",
    scrollTime: "08:00:00",
    // Anything outside of these hours is shaded
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5],
      startTime: "09:00",
      endTime: "17:00",
    },
    headerToolbar: {
      left: "prev,today,next",
      center: "title",
      right: "timeGridWeek,timeGridDay",
    },
    events: [
      {
        title: "Lunch break",
        display: "background",
        color: "green",
        start: dayjs().hour(12).minute(0).toDate(),
        end: dayjs().hour(13).minute(0).toDate(),
      },
      {
        title: "Client call",
        start: dayjs().hour(10).minute(0).toDate(),
        end: dayjs().hour(11).minute(0).toDate(),
      },
    ],
  };
</script>
