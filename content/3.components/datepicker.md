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

::ShowCase

:DocsDatepickerMode

#code

<!-- automd:file src="../../app/components/content/Docs/Datepicker/DocsDatepickerMode.vue" code lang="vue" -->

```vue [DocsDatepickerMode.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDatepicker v-model="today" mode="dateTime" title-position="right" />
  </div>
</template>

<script lang="ts" setup>
  import { addDays } from "date-fns";

  const today = addDays(new Date(), 3);
</script>
```

<!-- /automd -->

::

### Custom Title

::ShowCase

:DocsDatepickerTitle

#code

<!-- automd:file src="../../app/components/content/Docs/Datepicker/DocsDatepickerTitle.vue" code lang="vue" -->

```vue [DocsDatepickerTitle.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDatepicker show-weeknumbers>
      <template #header-title="{ title }">
        <div class="flex items-center gap-2">
          <p>{{ title }}</p>
          <Icon class="h-4 w-4 text-muted-foreground" name="lucide:chevron-down" />
        </div>
      </template>
    </UiDatepicker>
  </div>
</template>
```

<!-- /automd -->

::

### Button Slot

::ShowCase

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
          <Icon name="lucide:calendar" class="h-4 w-4" />
          {{ date ? format(date, "MMMM dd, yyyy") : "Select a date" }}
        </UiButton>
      </template>
    </UiDatepicker>
  </div>
</template>

<script lang="ts" setup>
  import { format } from "date-fns";

  const date = ref();
</script>
```

<!-- /automd -->

::

### Input Slot

::ShowCase

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
