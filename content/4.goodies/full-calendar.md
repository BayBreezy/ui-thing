---
title: Full Calendar
description: Display a full calendar in your nuxt app.
---

## Getting Started

:::Steps

::Step

### Installation

To get started, you can install the package with the following command:

:prose-pm-install{name="@fullcalendar/core @fullcalendar/vue3"}

::

::Step

### Add Plugins

You can also install the plugins for Full Calendar:

:prose-pm-install{name="@fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/timegrid @fullcalendar/list @fullcalendar/multimonth @fullcalendar/scrollgrid"}

::

::Step

### Update CSS

In order to make the calendar match the UI Thing theme, I had to create the `full-calendar.css` file and import it in the `nuxt.config.ts` file.

:prose-code-snippet{file="/assets/css/full-calendar.css" language="css" title="Full Calendar"}

::
:::

## Usage

### Month View

::ShowCase

:DocsFullCalendar

#code

<!-- automd:file src="../../app/components/content/Docs/FullCalendar/DocsFullCalendar.vue" code lang="vue" -->

```vue [DocsFullCalendar.vue]
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
```

<!-- /automd -->

::

### List View

::ShowCase

:DocsFullCalendarList

#code

<!-- automd:file src="../../app/components/content/Docs/FullCalendar/DocsFullCalendarList.vue" code lang="vue" -->

```vue [DocsFullCalendarList.vue]
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
```

<!-- /automd -->

::

### TimeGrid View

::ShowCase

:DocsFullCalendarTimeGrid

#code

<!-- automd:file src="../../app/components/content/Docs/FullCalendar/DocsFullCalendarTimeGrid.vue" code lang="vue" -->

```vue [DocsFullCalendarTimeGrid.vue]
<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script lang="ts" setup>
  import interactionPlugin from "@fullcalendar/interaction";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import FullCalendar from "@fullcalendar/vue3";
  import dayjs from "dayjs";
  import type { CalendarOptions } from "@fullcalendar/core";

  const calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, interactionPlugin],
    initialView: "timeGridWeek",
    editable: true,
    nowIndicator: true,
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
      left: "prevYear,prev,today,next,nextYear",
      center: "title",
      right: "timeGridWeek,timeGridDay",
    },
    footerToolbar: {
      left: "prevYear,prev,today,next,nextYear",
      center: "",
      right: "timeGridWeek,timeGridDay",
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
```

<!-- /automd -->

::

### MultiMonth View

::ShowCase

:DocsFullCalendarMultiMonth

#code

<!-- automd:file src="../../app/components/content/Docs/FullCalendar/DocsFullCalendarMultiMonth.vue" code lang="vue" -->

```vue [DocsFullCalendarMultiMonth.vue]
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
```

<!-- /automd -->

::
