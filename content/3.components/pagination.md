---
title: Pagination
description: Displays data in paged format and provides navigation between pages.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/pagination.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/pagination.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Pagination"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add pagination
```

## Anatomy

```vue
<template>
  <UiPagination>
    <UiPaginationList v-slot="{ items }">
      <UiPaginationFirst asChild :icon="firstIcon" />
      <UiPaginationPrev asChild :icon="prevIcon" />

      <template v-for="(page, index) in items" :key="index">
        <UiPaginationItem asChild v-if="page.type === 'page'" v-bind="page" />
        <UiPaginationEllipsis
          asChild
          v-else-if="page.type === 'ellipsis'"
          v-bind="page"
          :icon="ellipsisIcon"
        />
      </template>

      <UiPaginationNext asChild :icon="nextIcon" />
      <UiPaginationLast asChild :icon="lastIcon" />
    </UiPaginationList>
  </UiPagination>
</template>
```

## Usage

### Full example

::ShowCase{component="DocsPagination"}

#code

```vue [DocsPagination.vue]
<template>
  <div class="flex w-full justify-center">
    <UiPagination :total="100" :sibling-count="1"></UiPagination>
  </div>
</template>
```

::
