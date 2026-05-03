---
title: Skeleton
description: Use to show a placeholder while content is loading.
---

## Source code

Click :SourceCodeLink{component="Skeleton.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add skeleton"}

## Usage

### Profile skeleton

::prose-show-case

:DocsSkeleton

#code

<!-- automd:file src="../../app/components/content/Docs/Skeleton/DocsSkeleton.vue" code lang="vue" -->

```vue [DocsSkeleton.vue]
<template>
  <div class="flex w-full justify-center">
    <div class="flex items-center space-x-4">
      <UiSkeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <UiSkeleton class="h-4 w-[250px]" />
        <UiSkeleton class="h-4 w-[200px]" />
      </div>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Text skeleton

::prose-show-case

:DocsSkeletonText

#code

<!-- automd:file src="../../app/components/content/Docs/Skeleton/DocsSkeletonText.vue" code lang="vue" -->

```vue [DocsSkeletonText.vue]
<template>
  <div class="flex w-full justify-center">
    <div class="w-full max-w-md space-y-3">
      <UiSkeleton class="h-4 w-full" />
      <UiSkeleton class="h-4 w-5/6" />
      <UiSkeleton class="h-4 w-4/5" />
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Card skeleton

::prose-show-case

:DocsSkeletonCard

#code

<!-- automd:file src="../../app/components/content/Docs/Skeleton/DocsSkeletonCard.vue" code lang="vue" -->

```vue [DocsSkeletonCard.vue]
<template>
  <div class="flex w-full justify-center">
    <div class="border-border w-full max-w-md space-y-4 rounded-lg border p-4">
      <div class="space-y-3">
        <UiSkeleton class="h-4 w-3/4" />
        <UiSkeleton class="h-4 w-1/2" />
      </div>
      <UiSkeleton class="h-40 w-full" />
      <div class="flex gap-2">
        <UiSkeleton class="h-10 flex-1" />
        <UiSkeleton class="h-10 flex-1" />
      </div>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### List skeleton

::prose-show-case

:DocsSkeletonList

#code

<!-- automd:file src="../../app/components/content/Docs/Skeleton/DocsSkeletonList.vue" code lang="vue" -->

```vue [DocsSkeletonList.vue]
<template>
  <div class="flex w-full justify-center">
    <div class="w-full max-w-md space-y-3">
      <div v-for="i in 4" :key="i" class="flex items-center space-x-3">
        <UiSkeleton class="h-12 w-12 shrink-0 rounded-full" />
        <div class="flex-1 space-y-2">
          <UiSkeleton class="h-4 w-3/4" />
          <UiSkeleton class="h-3 w-1/2" />
        </div>
      </div>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Form skeleton

::prose-show-case

:DocsSkeletonForm

#code

<!-- automd:file src="../../app/components/content/Docs/Skeleton/DocsSkeletonForm.vue" code lang="vue" -->

```vue [DocsSkeletonForm.vue]
<template>
  <div class="flex w-full justify-center">
    <div class="border-border w-full max-w-md space-y-4 rounded-lg border p-4">
      <div class="space-y-2">
        <UiSkeleton class="h-4 w-1/4" />
        <UiSkeleton class="h-10 w-full" />
      </div>
      <div class="space-y-2">
        <UiSkeleton class="h-4 w-1/4" />
        <UiSkeleton class="h-10 w-full" />
      </div>
      <div class="space-y-2">
        <UiSkeleton class="h-4 w-1/4" />
        <UiSkeleton class="h-24 w-full" />
      </div>
      <div class="flex gap-2">
        <UiSkeleton class="h-10 flex-1" />
        <UiSkeleton class="h-10 flex-1" />
      </div>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Table skeleton

::prose-show-case

:DocsSkeletonTable

#code

<!-- automd:file src="../../app/components/content/Docs/Skeleton/DocsSkeletonTable.vue" code lang="vue" -->

```vue [DocsSkeletonTable.vue]
<template>
  <div class="flex w-full justify-center">
    <div class="border-border w-full max-w-md space-y-3 overflow-hidden rounded-lg border">
      <table class="w-full">
        <thead>
          <tr class="border-border bg-muted/50 border-b">
            <th class="p-3 text-left">
              <UiSkeleton class="h-4 w-20" />
            </th>
            <th class="p-3 text-left">
              <UiSkeleton class="h-4 w-24" />
            </th>
            <th class="p-3 text-left">
              <UiSkeleton class="h-4 w-16" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 3" :key="i" class="border-border border-b">
            <td class="p-3">
              <UiSkeleton class="h-4 w-20" />
            </td>
            <td class="p-3">
              <UiSkeleton class="h-4 w-24" />
            </td>
            <td class="p-3">
              <UiSkeleton class="h-4 w-16" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
```

<!-- /automd -->

::
