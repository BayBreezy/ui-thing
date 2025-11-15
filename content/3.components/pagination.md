---
title: Pagination
description: Displays data in paged format and provides navigation between pages.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/pagination.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/pagination.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Pagination"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add pagination"}

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

::ShowCase

:DocsPagination

#code

<!-- automd:file src="../../app/components/content/Docs/Pagination/DocsPagination.vue" code lang="vue" -->

```vue [DocsPagination.vue]
<template>
  <div class="flex w-full justify-center">
    <UiPagination :items-per-page="10" :total="100" :sibling-count="1" />
  </div>
</template>
```

<!-- /automd -->

::

## Origin UI Examples

These are some examples that I found today over here [Origin UI](https://originui.com/breadcrumbs-paginations) ❤️. I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### Apart

::ShowCase

:DocsPaginationApart

#code

<!-- automd:file src="../../app/components/content/Docs/Pagination/DocsPaginationApart.vue" code lang="vue" -->

```vue [DocsPaginationApart.vue]
<template>
  <div class="flex w-full flex-col items-center gap-10">
    <UiPagination :total="2" :items-per-page="1" class="mx-auto w-full max-w-md">
      <UiPaginationList class="w-full justify-between">
        <UiPaginationPrev as-child>
          <UiButton variant="outline" size="default">
            <span class="sr-only">Previous</span>
            <Icon name="lucide:chevron-left" class="size-4" />
            Previous
          </UiButton>
        </UiPaginationPrev>
        <UiPaginationNext as-child>
          <UiButton variant="outline" size="default">
            <span class="sr-only">Next</span>
            Next
            <Icon name="lucide:chevron-right" class="size-4" />
          </UiButton>
        </UiPaginationNext>
      </UiPaginationList>
    </UiPagination>
    <UiPagination :total="2" :items-per-page="1" class="mx-auto w-full max-w-md">
      <UiPaginationList class="w-full justify-between">
        <UiPaginationPrev as-child>
          <UiButton class="group" variant="ghost" size="default">
            <span class="sr-only">Previous</span>
            <Icon
              name="lucide:arrow-left"
              class="size-4 transition-transform group-hover:-translate-x-0.5"
            />
            Previous
          </UiButton>
        </UiPaginationPrev>
        <UiPaginationNext as-child>
          <UiButton class="group" variant="ghost" size="default">
            <span class="sr-only">Next</span>
            Next
            <Icon
              name="lucide:arrow-right"
              class="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </UiButton>
        </UiPaginationNext>
      </UiPaginationList>
    </UiPagination>
  </div>
</template>
```

<!-- /automd -->

::

### Info Center

::ShowCase

:DocsPaginationInfoCenter

#code

<!-- automd:file src="../../app/components/content/Docs/Pagination/DocsPaginationInfoCenter.vue" code lang="vue" -->

```vue [DocsPaginationInfoCenter.vue]
<template>
  <div class="flex flex-col items-center gap-10">
    <UiPagination v-model:page="page1" :total :items-per-page class="mx-auto w-full max-w-md">
      <UiPaginationList class="w-full justify-between">
        <UiPaginationPrev as-child>
          <UiButton variant="outline" size="icon-sm">
            <span class="sr-only">Previous</span>
            <Icon name="lucide:chevron-left" class="size-4" />
          </UiButton>
        </UiPaginationPrev>
        <div class="text-sm text-muted-foreground">
          Page <span class="text-foreground">{{ page1 }}</span> of
          <span class="text-foreground">{{ itemsPerPage }}</span>
        </div>
        <UiPaginationNext as-child>
          <UiButton variant="outline" size="icon-sm">
            <span class="sr-only">Next</span>
            <Icon name="lucide:chevron-right" class="size-4" />
          </UiButton>
        </UiPaginationNext>
      </UiPaginationList>
    </UiPagination>
    <UiPagination v-model:page="page2" :total :items-per-page class="mx-auto w-full max-w-md">
      <UiPaginationList class="w-full justify-between gap-5">
        <UiPaginationPrev as-child>
          <UiButton variant="ghost" size="icon-sm">
            <span class="sr-only">Previous</span>
            <Icon name="lucide:chevron-left" class="size-4" />
          </UiButton>
        </UiPaginationPrev>
        <div class="text-sm text-muted-foreground">
          Page <span class="text-foreground">{{ page2 }}</span> of
          <span class="text-foreground">{{ itemsPerPage }}</span>
        </div>
        <UiPaginationNext as-child>
          <UiButton variant="ghost" size="icon-sm">
            <span class="sr-only">Next</span>
            <Icon name="lucide:chevron-right" class="size-4" />
          </UiButton>
        </UiPaginationNext>
      </UiPaginationList>
    </UiPagination>
  </div>
</template>

<script lang="ts" setup>
  const page1 = ref(1);
  const page2 = ref(1);
  const total = 100;
  const itemsPerPage = 10;
</script>
```

<!-- /automd -->

::

### Info Start & End

::ShowCase

:DocsPaginationInfoStartEnd

#code

<!-- automd:file src="../../app/components/content/Docs/Pagination/DocsPaginationInfoStartEnd.vue" code lang="vue" -->

```vue [DocsPaginationInfoStartEnd.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col items-center gap-10">
    <UiPagination v-model:page="page1" :total :items-per-page>
      <UiPaginationList class="w-full justify-between">
        <div class="text-sm text-muted-foreground">
          Page <span class="text-foreground">{{ page1 }}</span> of
          <span class="text-foreground">{{ itemsPerPage }}</span>
        </div>
        <div class="flex items-center gap-3">
          <UiPaginationPrev as-child>
            <UiButton variant="outline" size="sm">
              <span>Previous</span>
            </UiButton>
          </UiPaginationPrev>
          <UiPaginationNext as-child>
            <UiButton variant="outline" size="sm">
              <span>Next</span>
            </UiButton>
          </UiPaginationNext>
        </div>
      </UiPaginationList>
    </UiPagination>
    <UiPagination v-model:page="page1" :total :items-per-page class="mx-auto w-full max-w-md">
      <UiPaginationList class="w-full justify-between">
        <div class="text-sm text-muted-foreground">
          Page <span class="text-foreground">{{ page1 }}</span> of
          <span class="text-foreground">{{ itemsPerPage }}</span>
        </div>
        <div class="flex items-center gap-3">
          <UiPaginationPrev as-child>
            <UiButton variant="outline" size="icon-sm">
              <span class="sr-only">Previous</span>
              <Icon name="lucide:arrow-left" class="size-4" />
            </UiButton>
          </UiPaginationPrev>
          <UiPaginationNext as-child>
            <UiButton variant="outline" size="icon-sm">
              <span class="sr-only">Next</span>
              <Icon name="lucide:arrow-right" class="size-4" />
            </UiButton>
          </UiPaginationNext>
        </div>
      </UiPaginationList>
    </UiPagination>
    <UiPagination v-model:page="page2" :total :items-per-page class="mx-auto w-full max-w-md">
      <UiPaginationList class="w-full justify-between">
        <div class="flex items-center gap-3">
          <UiPaginationPrev as-child>
            <UiButton variant="outline" size="sm">
              <span>Previous</span>
            </UiButton>
          </UiPaginationPrev>
          <UiPaginationNext as-child>
            <UiButton variant="outline" size="sm">
              <span>Next</span>
            </UiButton>
          </UiPaginationNext>
        </div>
        <div class="text-sm text-muted-foreground">
          Page <span class="text-foreground">{{ page2 }}</span> of
          <span class="text-foreground">{{ itemsPerPage }}</span>
        </div>
      </UiPaginationList>
    </UiPagination>
    <UiPagination v-model:page="page2" :total :items-per-page class="mx-auto w-full max-w-md">
      <UiPaginationList class="w-full justify-between">
        <div class="flex items-center gap-3">
          <UiPaginationPrev as-child>
            <UiButton variant="outline" size="icon-sm">
              <span class="sr-only">Previous</span>
              <Icon name="lucide:arrow-left" class="size-4" />
            </UiButton>
          </UiPaginationPrev>
          <UiPaginationNext as-child>
            <UiButton variant="outline" size="icon-sm">
              <span class="sr-only">Next</span>
              <Icon name="lucide:arrow-right" class="size-4" />
            </UiButton>
          </UiPaginationNext>
        </div>
        <div class="text-sm text-muted-foreground">
          Page <span class="text-foreground">{{ page2 }}</span> of
          <span class="text-foreground">{{ itemsPerPage }}</span>
        </div>
      </UiPaginationList>
    </UiPagination>
  </div>
</template>

<script lang="ts" setup>
  const page1 = ref(1);
  const page2 = ref(1);
  const total = 100;
  const itemsPerPage = 10;
</script>
```

<!-- /automd -->

::

### Bootstrap

::ShowCase

:DocsPaginationBootstrap

#code

<!-- automd:file src="../../app/components/content/Docs/Pagination/DocsPaginationBootstrap.vue" code lang="vue" -->

```vue [DocsPaginationBootstrap.vue]
<template>
  <div class="flex flex-col items-center gap-10">
    <UiPagination v-model:page="page1" :items-per-page :sibling-count="1" :total class="mx-auto">
      <UiPaginationList v-slot="{ items }" class="gap-0 rounded-lg border">
        <UiPaginationPrev class="h-full rounded-e-none" as-child icon="lucide:chevron-left" />
        <template v-for="(page, index) in items" :key="index">
          <UiPaginationItem v-if="page.type === 'page'" as-child v-bind="page">
            <UiButton
              class="size-9 rounded-none border-0 shadow-none data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground dark:bg-transparent dark:data-[selected=true]:bg-primary dark:data-[selected=true]:text-primary-foreground"
              variant="outline"
              size="icon-sm"
              >{{ page.value }}</UiButton
            >
          </UiPaginationItem>
          <UiPaginationEllipsis
            v-else-if="page.type === 'ellipsis'"
            as-child
            v-bind="page"
            icon="lucide:ellipsis"
          />
        </template>
        <UiPaginationNext class="h-full rounded-s-none" as-child icon="lucide:chevron-right" />
      </UiPaginationList>
    </UiPagination>
  </div>
</template>

<script lang="ts" setup>
  const page1 = ref(6);
  const total = 100;
  const itemsPerPage = 10;
</script>
```

<!-- /automd -->

::

### Table

::ShowCase

:DocsPaginationTable

#code

<!-- automd:file src="../../app/components/content/Docs/Pagination/DocsPaginationTable.vue" code lang="vue" -->

```vue [DocsPaginationTable.vue]
<template>
  <div class="@container flex w-full items-center justify-between gap-5">
    <div class="flex items-center gap-3">
      <UiLabel :for="id1" class="hidden text-sm @[450px]:inline-block">Rows per page</UiLabel>
      <UiSelect v-model="itemsPerPage">
        <UiSelectTrigger :id="id1" class="h-8 w-fit whitespace-nowrap" />
        <UiSelectContent class="min-w-fit">
          <UiSelectItem v-for="item in selectOptions" :key="item" :text="item" :value="item" />
        </UiSelectContent>
      </UiSelect>
    </div>
    <div class="grow text-right text-sm whitespace-nowrap text-muted-foreground">
      <span class="text-foreground">{{ page1 }}</span> of
      <span class="text-foreground">{{ pageTotal }}</span>
    </div>
    <div>
      <UiPagination
        v-model:page="page1"
        :items-per-page="Number(itemsPerPage)"
        :sibling-count="1"
        :total
      >
        <UiPaginationList class="justify-end">
          <UiPaginationFirst as-child variant="outline" icon="lucide:chevron-first" />
          <UiPaginationPrev as-child variant="outline" icon="lucide:chevron-left" />
          <UiPaginationNext as-child variant="outline" icon="lucide:chevron-right" />
          <UiPaginationLast as-child variant="outline" icon="lucide:chevron-last" />
        </UiPaginationList>
      </UiPagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const page1 = ref(1);
  const total = 100;
  const itemsPerPage = ref("10");
  const id1 = useId();

  const selectOptions = ["10", "20", "50", "100"];

  const pageTotal = computed(() => Math.ceil(total / Number(itemsPerPage.value)));
</script>
```

<!-- /automd -->

::
