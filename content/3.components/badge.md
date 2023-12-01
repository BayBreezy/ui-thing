---
title: Badge
description: A badge is a component that is used to highlight an item's status for quick recognition.
---

## Source code

Click :SourceCodeLink{component="Badge.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add badge
```

## Usage

::ShowCase{component="DocsBadge"}

#code

```vue [DocsBadge.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-5">
    <UiBadge>Default</UiBadge>
    <UiBadge variant="destructive">Destructive</UiBadge>
    <UiBadge variant="outline">Outline</UiBadge>
    <UiBadge variant="secondary">Secondary</UiBadge>
  </div>
</template>
```

::
