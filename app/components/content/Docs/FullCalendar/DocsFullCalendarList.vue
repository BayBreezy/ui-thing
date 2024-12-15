<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script lang="ts" setup>
  import listPlugin from "@fullcalendar/list";
  import FullCalendar from "@fullcalendar/vue3";
  import dayjs from "dayjs";
  import type { CalendarOptions } from "@fullcalendar/core";

  const calendarOptions: CalendarOptions = {
    plugins: [listPlugin],
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
    buttonText: { listWeek: "List Week", listDay: "List Day", listMonth: "List Month" },
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
