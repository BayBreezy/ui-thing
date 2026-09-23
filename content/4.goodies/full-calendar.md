---
title: Full Calendar
description: Display a full calendar in your nuxt app.
label: Updated
---

## Getting Started

:::prose-steps

::prose-step

### Installation

To get started, you can install the package with the following command. Since v7, the core, the standard plugins (`daygrid`, `timegrid`, `list`, `multimonth`, `interaction`) and the themes all ship inside `@fullcalendar/vue3`, and `temporal-polyfill` is a required peer dependency.

:prose-pm-install{name="@fullcalendar/vue3@7 temporal-polyfill"}

::

::prose-step

### Add Plugins

Plugins are now imported from `@fullcalendar/vue3/*` entrypoints, so there is nothing else to install:

```ts
import interactionPlugin from "@fullcalendar/vue3/interaction";
import dayGridPlugin from "@fullcalendar/vue3/daygrid";
import timeGridPlugin from "@fullcalendar/vue3/timegrid";
import listPlugin from "@fullcalendar/vue3/list";
import multiMonthPlugin from "@fullcalendar/vue3/multimonth";
import classicTheme from "@fullcalendar/vue3/themes/classic";
```

The theme is also a plugin, so remember to add it to the `plugins` option.

::

::prose-step

### Update CSS

In order to make the calendar match the UI Thing theme, I had to create the `full-calendar.css` file and import it in the `nuxt.config.ts` file. FullCalendar v7 no longer ships default styles, so this file loads the skeleton and the classic theme, then maps the theme's palette variables to the UI Thing tokens.

:prose-code-snippet{file="/assets/css/full-calendar.css" language="css" title="Full Calendar"}

::
:::

## Usage

### Month View

::prose-show-case

:DocsFullCalendar

#code

<!-- automd:file src="../../app/components/content/Docs/FullCalendar/DocsFullCalendar.vue" code lang="vue" -->

```vue [DocsFullCalendar.vue]
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
```

<!-- /automd -->

::

### List View

::prose-show-case

:DocsFullCalendarList

#code

<!-- automd:file src="../../app/components/content/Docs/FullCalendar/DocsFullCalendarList.vue" code lang="vue" -->

```vue [DocsFullCalendarList.vue]
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
```

<!-- /automd -->

::

### TimeGrid View

::prose-show-case

:DocsFullCalendarTimeGrid

#code

<!-- automd:file src="../../app/components/content/Docs/FullCalendar/DocsFullCalendarTimeGrid.vue" code lang="vue" -->

```vue [DocsFullCalendarTimeGrid.vue]
<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script lang="ts" setup>
  import type { CalendarOptions } from "@fullcalendar/vue3";
  import FullCalendar from "@fullcalendar/vue3";
  import interactionPlugin from "@fullcalendar/vue3/interaction";
  import classicTheme from "@fullcalendar/vue3/themes/classic";
  import timeGridPlugin from "@fullcalendar/vue3/timegrid";
  import dayjs from "dayjs";

  const calendarOptions: CalendarOptions = {
    plugins: [classicTheme, timeGridPlugin, interactionPlugin],
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
    tableHeaderSticky: true,
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
```

<!-- /automd -->

::

### MultiMonth View

::prose-show-case

:DocsFullCalendarMultiMonth

#code

<!-- automd:file src="../../app/components/content/Docs/FullCalendar/DocsFullCalendarMultiMonth.vue" code lang="vue" -->

```vue [DocsFullCalendarMultiMonth.vue]
<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script lang="ts" setup>
  import type { CalendarOptions } from "@fullcalendar/vue3";
  import FullCalendar from "@fullcalendar/vue3";
  import interactionPlugin from "@fullcalendar/vue3/interaction";
  import multiMonthPlugin from "@fullcalendar/vue3/multimonth";
  import classicTheme from "@fullcalendar/vue3/themes/classic";
  import dayjs from "dayjs";

  const calendarOptions: CalendarOptions = {
    plugins: [classicTheme, multiMonthPlugin, interactionPlugin],
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
    tableHeaderSticky: true,

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
```

<!-- /automd -->

::

### Select And Add Events

Enable `selectable` and use the `select` callback to open a dialog. Drag across the grid to create an event.

::prose-show-case

:DocsFullCalendarSelect

#code

<!-- automd:file src="../../app/components/content/Docs/FullCalendar/DocsFullCalendarSelect.vue" code lang="vue" -->

```vue [DocsFullCalendarSelect.vue]
<template>
  <div>
    <FullCalendar ref="calendarRef" :options="calendarOptions" />

    <UiDialog v-model:open="open">
      <UiDialogContent
        title="Add event"
        :description="selection ? formatRange(selection) : 'Create a new event on your calendar.'"
      >
        <template #content>
          <form id="add-event-form" class="grid gap-4" @submit.prevent="addEvent">
            <div class="grid gap-2">
              <UiLabel for="event-title">Title</UiLabel>
              <UiInput id="event-title" v-model="title" placeholder="Team lunch" autofocus />
            </div>
            <div class="grid gap-2">
              <UiLabel for="event-notes">Notes</UiLabel>
              <UiTextarea
                id="event-notes"
                v-model="notes"
                placeholder="Add any details (optional)"
              />
            </div>
          </form>
        </template>
        <template #footer>
          <UiDialogFooter>
            <UiDialogClose as-child>
              <UiButton type="button" variant="outline">Cancel</UiButton>
            </UiDialogClose>
            <UiButton type="submit" form="add-event-form" :disabled="!title.trim()">
              Save event
            </UiButton>
          </UiDialogFooter>
        </template>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import type { CalendarOptions, DateSelectInfo } from "@fullcalendar/vue3";
  import FullCalendar from "@fullcalendar/vue3";
  import interactionPlugin from "@fullcalendar/vue3/interaction";
  import classicTheme from "@fullcalendar/vue3/themes/classic";
  import timeGridPlugin from "@fullcalendar/vue3/timegrid";
  import dayjs from "dayjs";

  const calendarRef = ref<InstanceType<typeof FullCalendar> | null>(null);
  const open = ref(false);
  const title = ref("");
  const notes = ref("");
  const selection = ref<DateSelectInfo | null>(null);

  const calendarOptions: CalendarOptions = {
    plugins: [classicTheme, timeGridPlugin, interactionPlugin],
    initialView: "timeGridWeek",
    selectable: true,
    selectMirror: true,
    editable: true,
    nowIndicator: true,
    tableHeaderSticky: true,
    select(info) {
      selection.value = info;
      title.value = "";
      notes.value = "";
      open.value = true;
    },
    headerToolbar: {
      left: "prev,today,next",
      center: "title",
      right: "timeGridWeek,timeGridDay",
    },
    events: [
      {
        title: "Team standup",
        start: dayjs().hour(9).minute(0).toDate(),
        end: dayjs().hour(9).minute(30).toDate(),
      },
    ],
  };

  function formatRange(info: DateSelectInfo) {
    const start = dayjs(info.start);
    if (info.allDay) return start.format("dddd, MMMM D, YYYY");
    return `${start.format("dddd, MMMM D, YYYY")} · ${start.format("h:mm A")} – ${dayjs(info.end).format("h:mm A")}`;
  }

  function addEvent() {
    if (!selection.value || !title.value.trim()) return;
    calendarRef.value?.getApi().addEvent({
      title: title.value,
      start: selection.value.start,
      end: selection.value.end,
      allDay: selection.value.allDay,
      extendedProps: { notes: notes.value },
    });
    calendarRef.value?.getApi().unselect();
    open.value = false;
  }
</script>
```

<!-- /automd -->

::

### Business Hours And Background Events

Use `businessHours` to shade time outside working hours, and `display: "background"` events to highlight ranges.

::prose-show-case

:DocsFullCalendarBusinessHours

#code

<!-- automd:file src="../../app/components/content/Docs/FullCalendar/DocsFullCalendarBusinessHours.vue" code lang="vue" -->

```vue [DocsFullCalendarBusinessHours.vue]
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
```

<!-- /automd -->

::

### Custom Event Content

Use the `eventContent` slot to render events with UI Thing components. Click an event to see a popover.

::prose-show-case

:DocsFullCalendarCustomEvent

#code

<!-- automd:file src="../../app/components/content/Docs/FullCalendar/DocsFullCalendarCustomEvent.vue" code lang="vue" -->

```vue [DocsFullCalendarCustomEvent.vue]
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
```

<!-- /automd -->

::
