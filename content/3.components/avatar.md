---
title: Avatar
description: An image element with a fallback for representing the user.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/avatar.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/avatar.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Avatar"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add avatar
```

## Usage

::ShowCase

:DocsAvatar

#code

```vue [DocsAvatar.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiAvatar
      src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      alt="Colm Tuite"
      fallback="CT"
      :delay-ms="600"
    />
    <UiAvatar fallback="JD" />
  </div>
</template>
```

::
