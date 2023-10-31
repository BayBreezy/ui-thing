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

```bash
npx ui-thing@latest add datepicker
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

### Datetime Mode

::ShowCase{component="DocsDatepickerMode"}

#code

```vue [DocsDatepickerMode.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UIDatepicker v-model="today" mode="dateTime" title-position="right" />
  </div>
</template>

<script lang="ts" setup>
  import { addDays } from "date-fns";

  const today = addDays(new Date(), 3);
</script>
```

::

### Custom Title

::ShowCase{component="DocsDatepickerTitle"}

#code

```vue [DocsDatepickerTitle.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UIDatepicker show-weeknumbers>
      <template #header-title="{ title }">
        <div class="flex items-center gap-2">
          <p>{{ title }}</p>
          <Icon class="h-4 w-4 text-muted-foreground" name="lucide:chevron-down" />
        </div>
      </template>
    </UIDatepicker>
  </div>
</template>
```

::

### Button Slot

::ShowCase{component="DocsDatepickerButton"}

#code

```vue [DocsDatepickerButton.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UIDatepicker v-model="date">
      <template #default="{ togglePopover }">
        <UIButton
          variant="outline"
          :class="[!date && 'text-muted-foreground', 'w-[260px] justify-start text-left']"
          @click="togglePopover"
        >
          <Icon name="lucide:calendar" class="h-4 w-4" />
          {{ date ? format(date, "MMMM dd, yyyy") : "Select a date" }}
        </UIButton>
      </template>
    </UIDatepicker>
  </div>
</template>

<script lang="ts" setup>
  import { addDays, format } from "date-fns";

  const date = ref();
</script>
```

::

### Input Slot

::ShowCase{component="DocsDatepickerInput"}

#code

```vue [DocsDatepickerInput.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UIDatepicker v-model="date">
      <template #default="{ inputValue, inputEvents }">
        <UIInput placeholder="DD/MM/YYYY" :value="inputValue" v-on="inputEvents" />
      </template>
    </UIDatepicker>
  </div>
</template>

<script lang="ts" setup>
  const date = ref();
</script>
```

::
