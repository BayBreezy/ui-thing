---
title: Datepicker
description: Allows the user to select a date from a calendar.
links:
  - title: VCalendar
    href: https://vcalendar.io/
    icon: "lucide:calendar-days"
  - title: API Reference
    href: https://vcalendar.io/datepicker/api.html
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Datepicker.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add datepicker"}

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

### Datetime Mode

::prose-show-case

:DocsDatepickerMode

#code

<!-- automd:file src="../../app/components/content/Docs/Datepicker/DocsDatepickerMode.vue" code lang="vue" -->

```vue [DocsDatepickerMode.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDatepicker
      v-model="today"
      is-required
      :select-attribute="{ dot: true }"
      mode="dateTime"
      title-position="right"
    />
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  const today = ref(dayjs().add(3, "days").toDate());
</script>
```

<!-- /automd -->

::

### Custom Title

::prose-show-case

:DocsDatepickerTitle

#code

<!-- automd:file src="../../app/components/content/Docs/Datepicker/DocsDatepickerTitle.vue" code lang="vue" -->

```vue [DocsDatepickerTitle.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDatepicker :model-value="new Date()" show-weeknumbers="left-outside">
      <template #header-title="{ title }">
        <div class="flex items-center gap-2">
          <p>{{ title }}</p>
          <Icon class="text-muted-foreground size-4" name="lucide:chevron-down" />
        </div>
      </template>
    </UiDatepicker>
  </div>
</template>
```

<!-- /automd -->

::

### Button Slot

::prose-show-case

:DocsDatepickerButton

#code

<!-- automd:file src="../../app/components/content/Docs/Datepicker/DocsDatepickerButton.vue" code lang="vue" -->

```vue [DocsDatepickerButton.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDatepicker v-model="date">
      <template #default="{ togglePopover }">
        <UiButton
          variant="outline"
          :class="[!date && 'text-muted-foreground', 'w-[260px] justify-start text-left']"
          @click="togglePopover"
        >
          <Icon name="lucide:calendar" class="size-4" />
          {{ date ? dayjs(date).format("MMMM DD, YYYY") : "Select a date" }}
        </UiButton>
      </template>
    </UiDatepicker>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  const date = ref();
</script>
```

<!-- /automd -->

::

### Input Slot

::prose-show-case

:DocsDatepickerInput

#code

<!-- automd:file src="../../app/components/content/Docs/Datepicker/DocsDatepickerInput.vue" code lang="vue" -->

```vue [DocsDatepickerInput.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDatepicker v-model="date">
      <template #default="{ inputValue, inputEvents }">
        <UiInput placeholder="DD/MM/YYYY" :value="inputValue" v-on="inputEvents" />
      </template>
    </UiDatepicker>
  </div>
</template>

<script lang="ts" setup>
  const date = ref();
</script>
```

<!-- /automd -->

::

### Responsive Layout

One a mobile screen, the `Datepicker` will expand to full width and display only one column. On larger screens, it will display two columns.

::prose-show-case

:DocsDatepickerResponsive

#code

<!-- automd:file src="../../app/components/content/Docs/Datepicker/DocsDatepickerResponsive.vue" code lang="vue" -->

```vue [DocsDatepickerResponsive.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDatepicker
      v-model.range="dates"
      :columns="isMobileScreen ? 1 : 2"
      :rows="isMobileScreen ? 2 : 1"
      :expanded="isMobileScreen"
    />
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  const isMobileScreen = useMediaQuery("(max-width: 640px)", { ssrWidth: 640 });
  const dates = ref({
    start: dayjs().toDate(),
    end: dayjs().add(2, "w").toDate(),
  });
</script>
```

<!-- /automd -->

::

### Time Rules

Limit the time selection by setting [Time Rules](https://vcalendar.io/datepicker/time-rules.html) on the `Datepicker`.

Here the user can set an appointment between 9 AM and 5 PM, with a 30-minute interval. Weekends are disabled.

::prose-show-case

:DocsDatepickerTimeRules

#code

<!-- automd:file src="../../app/components/content/Docs/Datepicker/DocsDatepickerTimeRules.vue" code lang="vue" -->

```vue [DocsDatepickerTimeRules.vue]
<template>
  <div class="flex w-full flex-col items-center justify-center gap-5">
    <p class="text-muted-foreground text-sm">Select your appointment date & time</p>
    <p class="text-sm font-semibold">
      Selected:
      <span class="text-emerald-500">{{
        dayjs(appointmentDate).format("MMM DD, YYYY [at] h:mmA")
      }}</span>
    </p>
    <UiDatepicker
      v-model="appointmentDate"
      mode="dateTime"
      is24hr
      is-required
      :rules="{ hours: { min: 9, max: 17 }, minutes: { interval: 15 } }"
      :min-date="new Date()"
      :disabled-dates="[
        {
          repeat: {
            weekdays: [1, 7],
          },
        },
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  const appointmentDate = ref(new Date());
</script>
```

<!-- /automd -->

::

### Presets

::prose-show-case

:DocsDatepickerPresets

#code

<!-- automd:file src="../../app/components/content/Docs/Datepicker/DocsDatepickerPresets.vue" code lang="vue" -->

```vue [DocsDatepickerPresets.vue]
<template>
  <div class="flex w-full flex-col items-center justify-center gap-5">
    <UiCard>
      <UiCardContent class="flex gap-x-3 max-sm:flex-col">
        <div class="relative py-4 max-sm:order-1 max-sm:border-t sm:w-32">
          <div class="h-full sm:border-e">
            <div class="flex flex-col gap-1 px-2">
              <UiButton
                size="sm"
                variant="ghost"
                class="w-full justify-start"
                @click="date = new Date()"
                >Today</UiButton
              >
              <UiButton
                size="sm"
                variant="ghost"
                class="w-full justify-start"
                @click="date = dayjs().subtract(1, 'day').toDate()"
                >Yesterday</UiButton
              >
              <UiButton
                size="sm"
                variant="ghost"
                class="w-full justify-start"
                @click="date = dayjs().add(1, 'week').toDate()"
                >Next Week</UiButton
              >
              <UiButton
                size="sm"
                variant="ghost"
                class="w-full justify-start"
                @click="date = dayjs().subtract(1, 'week').toDate()"
                >Last Week</UiButton
              >
              <UiButton
                size="sm"
                variant="ghost"
                class="w-full justify-start"
                @click="date = dayjs().subtract(1, 'month').toDate()"
                >Last Month</UiButton
              >
              <UiButton
                size="sm"
                variant="ghost"
                class="w-full justify-start"
                @click="date = dayjs().add(1, 'month').toDate()"
                >Next Month</UiButton
              >
              <UiButton
                size="sm"
                variant="ghost"
                class="w-full justify-start"
                @click="date = dayjs().add(1, 'y').toDate()"
                >Next Year</UiButton
              >
            </div>
          </div>
        </div>
        <UiDatepicker ref="datepicker" v-model="date" borderless transparent />
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  const date = ref(new Date());
  const datepicker = useTemplateRef("datepicker");

  watch(date, (newDate) => {
    datepicker.value?.datepickerRef?.move(newDate);
  });
</script>
```

<!-- /automd -->

::

### Custom Day Content

::prose-show-case

:DocsDatepickerCustomDayContent

#code

<!-- automd:file src="../../app/components/content/Docs/Datepicker/DocsDatepickerCustomDayContent.vue" code lang="vue" -->

```vue [DocsDatepickerCustomDayContent.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDatepicker v-model="today" is-required :min-date="new Date()">
      <template #day-content="{ day, dayEvents, dayProps }">
        <div :class="[day.classes]" v-bind="dayProps" v-on="dayEvents">
          <div class="flex flex-col items-center justify-center gap-0.5 text-xs">
            <span class="font-medium">{{ day.label }} </span>
            <span
              class="text-[10px]"
              :class="[!faker.datatype.boolean(0.2) ? 'opacity-70' : 'text-green-500']"
              >{{ faker.commerce.price({ min: 80, max: 250, symbol: "$", dec: 0 }) }}</span
            >
          </div>
        </div>
      </template>
    </UiDatepicker>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import dayjs from "dayjs";

  const today = ref(dayjs().add(3, "days").toDate());
</script>

<style scoped>
  :deep(.vc-day) {
    width: 50px;
    height: 50px;
    .vc-day-content,
    .vc-highlight,
    .vc-highlights {
      width: 100%;
      height: 100%;
    }
  }
</style>
```

<!-- /automd -->

::
