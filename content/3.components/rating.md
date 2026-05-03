---
title: Rating
description: A component for displaying and selecting star ratings.
---

## Source code

Click :SourceCodeLink{component="Rating.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add rating"}

## Usage

### Basic

::prose-show-case

:DocsRating

#code

<!-- automd:file src="../../app/components/content/Docs/Rating/DocsRating.vue" code lang="vue" -->

```vue [DocsRating.vue]
<template>
  <div class="text-center">
    <UiRating :model-value="4" />
  </div>
</template>
```

<!-- /automd -->

::

### Decimal

::prose-show-case

:DocsRatingDecimal

#code

<!-- automd:file src="../../app/components/content/Docs/Rating/DocsRatingDecimal.vue" code lang="vue" -->

```vue [DocsRatingDecimal.vue]
<template>
  <div class="text-center">
    <UiRating :model-value="3.5" />
  </div>
</template>
```

<!-- /automd -->

::

### Show Rating

::prose-show-case

:DocsRatingShowValue

#code

<!-- automd:file src="../../app/components/content/Docs/Rating/DocsRatingShowValue.vue" code lang="vue" -->

```vue [DocsRatingShowValue.vue]
<template>
  <div class="text-center">
    <UiRating :model-value="3.5" show-value />
  </div>
</template>
```

<!-- /automd -->

::

### Editable

::prose-show-case

:DocsRatingEditable

#code

<!-- automd:file src="../../app/components/content/Docs/Rating/DocsRatingEditable.vue" code lang="vue" -->

```vue [DocsRatingEditable.vue]
<template>
  <div class="text-center">
    <UiRating v-model="rating" show-value editable />
  </div>
</template>

<script lang="ts" setup>
  const rating = ref(2.5);
</script>
```

<!-- /automd -->

::

### Size

::prose-show-case

:DocsRatingSize

#code

<!-- automd:file src="../../app/components/content/Docs/Rating/DocsRatingSize.vue" code lang="vue" -->

```vue [DocsRatingSize.vue]
<template>
  <div class="flex flex-col items-center gap-4">
    <UiRating :model-value="4" size="sm" />
    <UiRating :model-value="4" />
    <UiRating :model-value="4" size="lg" />
  </div>
</template>
```

<!-- /automd -->

::

### Icons

::prose-show-case

:DocsRatingIcons

#code

<!-- automd:file src="../../app/components/content/Docs/Rating/DocsRatingIcons.vue" code lang="vue" -->

```vue [DocsRatingIcons.vue]
<template>
  <div class="flex flex-col items-center gap-4">
    <UiRating :model-value="4" icon="lucide:heart" filled-icon-class-name="text-red-500" />
    <UiRating
      editable
      :model-value="4"
      icon="lucide:sun-medium"
      filled-icon-class-name="text-green-500"
      empty-icon-class-name="text-green-500/30"
    />
  </div>
</template>
```

<!-- /automd -->

::

### Statistics

::prose-show-case

:DocsRatingStatistics

#code

<!-- automd:file src="../../app/components/content/Docs/Rating/DocsRatingStatistics.vue" code lang="vue" -->

```vue [DocsRatingStatistics.vue]
<template>
  <UiCard class="mx-auto w-full max-w-sm">
    <UiCardHeader class="min-h-auto border-b-0">
      <UiCardTitle>Customer Reviews Summary</UiCardTitle>
      <UiCardDescription
        >Based on {{ Intl.NumberFormat().format(totalReviews) }} reviews</UiCardDescription
      >
    </UiCardHeader>
    <UiCardContent class="space-y-3">
      <div
        v-for="item in ratings"
        :key="item.stars"
        class="flex items-center justify-between gap-3"
      >
        <div class="flex items-center gap-2.5">
          <span class="w-2 text-sm font-medium">{{ item.stars }}</span>
          <UiRating :model-value="item.stars" />
        </div>
        <div class="text-muted-foreground flex items-center gap-0.5 text-sm">
          <span>{{ Intl.NumberFormat().format(item.count) }}</span>
          <span>({{ item.percentage }}%)</span>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const ratings = [
    { stars: 5, count: 745, percentage: 59.7 },
    { stars: 4, count: 312, percentage: 25.0 },
    { stars: 3, count: 124, percentage: 9.9 },
    { stars: 2, count: 41, percentage: 3.3 },
    { stars: 1, count: 25, percentage: 2.0 },
  ];

  const totalReviews = computed(() => ratings.reduce((total, item) => total + item.count, 0));
</script>
```

<!-- /automd -->

::
