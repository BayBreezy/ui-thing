---
title: Calendar
description: A calendar component allows you to display a calendar with events.
---

## Source code

Click :SourceCodeLink{component="Calendar.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add calendar
```

## Usage

::ShowCase{component="DocsCalendar"}

#code

```vue [DocsBadge.vue]
<template>
  <div>
    <div class="flex flex-wrap gap-5">
      <UIButton>Default</UIButton>
      <UIButton variant="secondary">Secondary</UIButton>
      <UIButton><Icon class="h-4 w-4" name="lucide:mail" /> Login with Email</UIButton>
      <UIButton loading
        ><Icon class="h-4 w-4 animate-spin" name="lucide:loader-2" /> Please wait</UIButton
      >
      <UIButton variant="outline">Outline</UIButton>
      <UIButton variant="destructive">Destructive</UIButton>
      <UIButton variant="ghost">Ghost</UIButton>
      <UIButton variant="link">Link Btn</UIButton>
      <UIButton variant="outline" size="icon"
        ><Icon class="h-4 w-4" name="lucide:activity"
      /></UIButton>
    </div>
  </div>
</template>
```

::
