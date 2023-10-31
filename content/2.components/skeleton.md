---
title: Skeleton
description: Use to show a placeholder while content is loading.
---

## Source code

Click :SourceCodeLink{component="Skeleton.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add skeleton
```

## Usage

### Basic example

::ShowCase{component="DocsSkeleton"}

#code

```vue [DocsSkeleton.vue]
<template>
  <div class="flex w-full justify-center">
    <div class="flex items-center space-x-4">
      <UISkeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <UISkeleton class="h-4 w-[250px]" />
        <UISkeleton class="h-4 w-[200px]" />
      </div>
    </div>
  </div>
</template>
```

::
