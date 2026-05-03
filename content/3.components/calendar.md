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

:prose-pm-x{command="ui-thing@latest add calendar"}

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

### Attributes

Attributes are visual decorators that can be applied to specific calendar dates. Learn more about them <a href="https://vcalendar.io/calendar/attributes.html" target="_blank">here</a>.

::prose-show-case

:DocsCalendarAttributes

#code

<!-- automd:file src="../../app/components/content/Docs/Calendar/DocsCalendarAttributes.vue" code lang="vue" -->

```vue [DocsCalendarAttributes.vue]
<template>
  <div class="flex flex-wrap justify-center gap-5">
    <UiCalendar :attributes="attributes" />
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";
  import type { CSSProperties } from "vue";

  import type { AttributeConfig } from "~/components/Ui/Calendar.vue";

  const attributes = ref<AttributeConfig[]>([
    {
      highlight: true,
      popover: {
        label: "Out of town business trip",
      },
      dates: [
        {
          start: dayjs().startOf("month").toString(),
          span: 3,
        },
      ],
    },
    {
      popover: {
        label: "Take the dog to the vet",
      },
      dot: "red",
      dates: dayjs().startOf("month").add(5, "days").toString(),
    },
    {
      bar: "green",
      popover: {
        label: "Dinner with friends",
      },
      dates: dayjs().startOf("month").add(8, "days").toString(),
    },
    {
      dot: "purple",
      popover: {
        label: "Take the car to the mechanic",
      },
      dates: dayjs().startOf("month").add(14, "days").toString(),
    },
    {
      highlight: true,
      popover: {
        label: "Family vacation in Ibiza",
      },
      dates: {
        start: dayjs().startOf("month").add(16, "days").toString(),
        end: dayjs().startOf("month").add(24, "days").toString(),
      },
    },
    {
      dot: true,
      popover: {
        label: "Take Noah to the football game",
      },
      dates: dayjs().startOf("month").add(22, "days").toString(),
    },
    {
      highlight: true,
      popover: {
        label: "Visit the in-laws",
      },
      dates: dayjs().endOf("month").toString(),
    },
    {
      popover: { label: "Therapy Session", hideIndicator: true },
      bar: {
        style: {
          backgroundImage: "linear-gradient(to right, #f0f, #0ff)",
          borderRadius: "10px",
        } as CSSProperties,
      },
      dates: [
        {
          // get last sunday in month's date
          start: dayjs().endOf("month").day(0).toString(),
          repeat: {
            every: "month",
            ordinalWeekdays: [-1, 1],
          },
        },
      ],
    },
  ]);
</script>
```

<!-- /automd -->

::

### Right Title - Left Nav

::prose-show-case

:DocsCalendarRightTitle

#code

<!-- automd:file src="../../app/components/content/Docs/Calendar/DocsCalendarRightTitle.vue" code lang="vue" -->

```vue [DocsCalendarRightTitle.vue]
<template>
  <div class="flex flex-wrap justify-center gap-5">
    <UiCalendar title-position="right" />
  </div>
</template>
```

<!-- /automd -->

::

### Header Slot

::prose-show-case

:DocsCalendarHeaderSlot

#code

<!-- automd:file src="../../app/components/content/Docs/Calendar/DocsCalendarHeaderSlot.vue" code lang="vue" -->

```vue [DocsCalendarHeaderSlot.vue]
<template>
  <div class="flex flex-wrap justify-center gap-5">
    <UiCalendar show-weeknumbers>
      <template #header-title="{ title }">
        <div class="flex items-center gap-2">
          <p>{{ title }}</p>
          <Icon class="text-muted-foreground size-4" name="lucide:chevron-down" />
        </div>
      </template>
    </UiCalendar>
  </div>
</template>
```

<!-- /automd -->

::

### Date Range

::prose-show-case

:DocsCalendarRange

#code

<!-- automd:file src="../../app/components/content/Docs/Calendar/DocsCalendarRange.vue" code lang="vue" -->

```vue [DocsCalendarRange.vue]
<template>
  <div class="flex flex-wrap justify-center gap-5">
    <UiCalendar :attributes />
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  import type { AttributeConfig } from "~/components/Ui/Calendar.vue";

  const attributes = ref<AttributeConfig[]>([
    {
      highlight: true,
      dates: [[dayjs().toDate(), dayjs().add(1.5, "w").toDate()]],
    },
  ]);
</script>
```

<!-- /automd -->

::

### Disabled Dates

::prose-show-case

:DocsCalendarDisabledDate

#code

<!-- automd:file src="../../app/components/content/Docs/Calendar/DocsCalendarDisabledDate.vue" code lang="vue" -->

```vue [DocsCalendarDisabledDate.vue]
<template>
  <div class="flex flex-wrap justify-center gap-5">
    <UiCalendar :disabled-dates />
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  const disabledDates = ref([
    // disable today
    dayjs().toDate(),
    // disable the next 8 days
    dayjs().add(8, "day").toDate(),
    // disable the 22nd of the month
    dayjs().date(22).toDate(),
  ]);
</script>
```

<!-- /automd -->

::

### Footer Slot

::prose-show-case

:DocsCalendarFooterSlot

#code

<!-- automd:file src="../../app/components/content/Docs/Calendar/DocsCalendarFooterSlot.vue" code lang="vue" -->

```vue [DocsCalendarFooterSlot.vue]
<template>
  <div class="flex flex-wrap justify-center gap-5">
    <UiCalendar ref="cal">
      <template #footer>
        <div class="grid grid-cols-2 gap-3 p-4 pt-0">
          <UiButton size="sm" variant="outline" @click="moveToRandomMonth">Random Month</UiButton>
          <UiButton size="sm" effect="ringHover" @click="moveToThisMonth">This Month</UiButton>
        </div>
      </template>
    </UiCalendar>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  const cal = useTemplateRef("cal");
  const moveToRandomMonth = () => {
    const randomMonth = dayjs().add(Math.floor(Math.random() * 12), "month");
    cal.value?.calendarRef?.move(randomMonth.toDate());
  };
  const moveToThisMonth = () => {
    cal.value?.calendarRef?.move(new Date());
  };
</script>
```

<!-- /automd -->

::

### Week View

::prose-show-case

:DocsCalendarWeekView

#code

<!-- automd:file src="../../app/components/content/Docs/Calendar/DocsCalendarWeekView.vue" code lang="vue" -->

```vue [DocsCalendarWeekView.vue]
<template>
  <div class="flex flex-wrap justify-center gap-5">
    <UiCalendar view="weekly" />
  </div>
</template>
```

<!-- /automd -->

::
