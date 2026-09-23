<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script lang="ts" setup>
  import type { CalendarOptions } from "@fullcalendar/vue3";
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/vue3/daygrid";
  import interactionPlugin from "@fullcalendar/vue3/interaction";
  import classicTheme from "@fullcalendar/vue3/themes/classic";
  import dayjs from "dayjs";

  const calendarOptions: CalendarOptions = {
    plugins: [classicTheme, dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    dateClick: (info) => {
      console.log(info.dateStr);
    },
    tableHeaderSticky: true,
    editable: true,
    headerToolbar: {
      left: "prevYear,prev,today,next,nextYear",
      center: "title",
      right: "dayGridDay,dayGridWeek,dayGridMonth,dayGridYear",
    },
    footerToolbar: {
      left: "prevYear,prev,today,next,nextYear",
      center: "",
      right: "dayGridDay,dayGridWeek,dayGridMonth,dayGridYear",
    },
    events: [
      {
        title: "Attend Data Protection Act Webinar",
        date: dayjs().toDate().toISOString(),
        url: "https://uithing.com/",
      },
      {
        title: "Travel to Kingston for Manager's Meeting",
        date: dayjs().add(1, "day").format("YYYY-MM-DD"),
      },
    ],
  };
</script>
