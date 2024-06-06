<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script lang="ts" setup>
  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import FullCalendar from "@fullcalendar/vue3";
  import dayjs from "dayjs";
  import type { CalendarOptions } from "@fullcalendar/core";

  const calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    dateClick: (info) => {
      console.log(info.dateStr);
    },
    stickyHeaderDates: true,
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
        url: "https://ui-thing.behonbaker.com/",
      },
      {
        title: "Travel to Kingston for Manager's Meeting",
        date: dayjs().add(1, "day").format("YYYY-MM-DD"),
      },
    ],
  };
</script>

<style>
  /* Because the doc's navbar is blocking it 🙄 */
  .fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky > * {
    top: 55px;
  }
</style>
