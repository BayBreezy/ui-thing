---
title: Calendar
description: A calendar component allows you to display a calendar with events.
links:
  - title: VCalendar
    href: https://vcalendar.io/
    icon: "lucide:calendar-days"
  - title: API Reference
    href: https://vcalendar.io/calendar/api.html
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Calendar.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add calendar
```

You can optionally configure the vcalendar module in your `nuxt.config.js` file:

```ts
vcalendar: {
  calendarOptions: {
    masks: {
      weekdays: "WW",
    },
  },
},
```

## Usage

::ShowCase

:DocsCalendar

#code

<!-- automd:file src="../../app/components/content/Docs/DocsCalendar.vue" code lang="vue" -->

```vue [DocsCalendar.vue]
<template>
  <div>
    <div class="flex flex-wrap justify-center gap-5">
      <UiCalendar :attributes="attributes" />
      <UiCalendar title-position="right" />
      <UiCalendar show-weeknumbers>
        <template #header-title="{ title }">
          <div class="flex items-center gap-2">
            <p>{{ title }}</p>
            <Icon class="h-4 w-4 text-muted-foreground" name="lucide:chevron-down" />
          </div>
        </template>
      </UiCalendar>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { addDays, endOfMonth, startOfMonth, startOfToday } from "date-fns";

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
        end: addDays(startOfMonth(startOfToday()), 24).toString(),
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
```

<!-- /automd -->

::
