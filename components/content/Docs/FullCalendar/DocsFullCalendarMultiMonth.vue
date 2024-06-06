<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script lang="ts" setup>
  import interactionPlugin from "@fullcalendar/interaction";
  import multiMonthPlugin from "@fullcalendar/multimonth";
  import FullCalendar from "@fullcalendar/vue3";
  import dayjs from "dayjs";
  import type { CalendarOptions } from "@fullcalendar/core";

  const calendarOptions: CalendarOptions = {
    plugins: [multiMonthPlugin, interactionPlugin],
    initialView: "multiMonthYear",
    editable: true,
    dateClick(arg) {
      useSonner("Date clicked", {
        description: dayjs(arg.dateStr).format("dddd, MMMM D, YYYY h:mm A"),
      });
    },
    eventClick(arg) {
      useSonner("Event clicked", {
        description: arg.event.title,
      });
    },
    stickyHeaderDates: true,

    headerToolbar: {
      left: "title",
      center: "",
      right: "prevYear,prev,today,next,nextYear",
    },
    footerToolbar: {
      left: "title",
      center: "",
      right: "prevYear,prev,today,next,nextYear",
    },
    events: [
      {
        title: "Attend Data Protection Act Webinar",
        date: dayjs().add(1, "day").hour(9).toDate(),
        url: "https://ui-thing.behonbaker.com/",
      },
      {
        title: "Travel to Kingston for Manager's Meeting",
        date: dayjs().add(3, "day").hour(10).toDate(),
      },
      {
        title: "Vacation in Montego Bay",
        allDay: true,
        color: "green",
        date: dayjs().add(1, "week").toDate(),
        end: dayjs().add(2, "week").toDate(),
      },
    ],
  };
</script>
