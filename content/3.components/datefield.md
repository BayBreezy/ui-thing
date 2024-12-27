---
title: Date Field
description: Enables users to input specific dates within a designated field.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/date-field
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/date-field#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="DateField.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add date-field
```

## Usage

::ShowCase

:DocsDateField

#code

<!-- automd:file src="../../app/components/content/Docs/DateField/DocsDateField.vue" code lang="vue" -->

```vue [DocsDateField.vue]
<template>
  <div class="flex w-full flex-col justify-center">
    <UiLabel v-if="value" for="text-date" class="mb-2 text-sm text-muted-foreground">
      The entered date is {{ formattedValue }}
    </UiLabel>
    <UiDateField id="text-date" v-model="value" />
  </div>
</template>

<script lang="ts" setup>
  import { getLocalTimeZone, parseDate } from "@internationalized/date";
  import { format } from "date-fns";

  const value = ref(parseDate(new Date().toISOString().substring(0, 10)));

  const formattedValue = computed(() =>
    format(value.value.toDate(getLocalTimeZone()), "eeee, MMMM d, yyyy")
  );
</script>
```

<!-- /automd -->

::
