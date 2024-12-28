---
title: Scroll Area
description: Augments native scroll functionality for custom, cross-browser styling.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/scroll-area.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/scroll-area.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="ScrollArea"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add scroll-area
```

## Usage

```vue
<template>
  <UiScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
    Jokester began sneaking into the castle in the middle of the night and leaving jokes all over
    the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious,
    but he couldn't seem to stop Jokester. And then, one day, the people of the kingdom discovered
    that the jokes left by Jokester were so funny that they couldn't help but laugh. And once
    theystarted laughing, they couldn't stop.
  </UiScrollArea>
</template>
```

### Basic example

::ShowCase

:DocsScrollArea

#code

<!-- automd:file src="../../app/components/content/Docs/ScrollArea/DocsScrollArea.vue" code lang="vue" -->

```vue [DocsScrollArea.vue]
<template>
  <div class="flex w-full justify-center">
    <UiScrollArea class="h-72 w-48 rounded-md border">
      <div class="p-4">
        <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
        <template v-for="(tag, i) in tags" :key="i">
          <div class="text-sm">{{ tag }}</div>
          <UiSeparator class="my-2" />
        </template>
      </div>
    </UiScrollArea>
  </div>
</template>

<script lang="ts" setup>
  const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
</script>
```

<!-- /automd -->

::
