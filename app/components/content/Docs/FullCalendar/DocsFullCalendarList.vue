<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script lang="ts" setup>
  import type { CalendarOptions } from "@fullcalendar/vue3";
  import FullCalendar from "@fullcalendar/vue3";
  import listPlugin from "@fullcalendar/vue3/list";
  import classicTheme from "@fullcalendar/vue3/themes/classic";
  import dayjs from "dayjs";

  const calendarOptions: CalendarOptions = {
    plugins: [classicTheme, listPlugin],
    initialView: "listMonth",
    headerToolbar: {
      left: "prevYear,prev,today,next,nextYear",
      center: "title",
      right: "listDay,listWeek,listMonth",
    },
    footerToolbar: {
      left: "prevYear,prev,today,next,nextYear",
      center: "",
      right: "listWeek,listDay,listMonth",
    },
    buttons: {
      listWeek: { text: "List Week" },
      listDay: { text: "List Day" },
      listMonth: { text: "List Month" },
    },
    events: [
      {
        title: "Attend Data Protection Act Webinar",
        date: dayjs().add(1, "day").hour(9).toDate(),
        url: "https://uithing.com/",
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
