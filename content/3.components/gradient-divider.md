---
title: Gradient Divider
description: A divider that has a gradient background
---

## Source code

Click :SourceCodeLink{component="GradientDivider.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add gradient-divider"}

## Usage

::prose-show-case

:DocsGradientDivider

#code

<!-- automd:file src="../../app/components/content/Docs/GradientDivider/DocsGradientDivider.vue" code lang="vue" -->

```vue [DocsGradientDivider.vue]
<template>
  <div class="flex w-full">
    <UiGradientDivider />
  </div>
</template>
```

<!-- /automd -->

::

## Vertical

::prose-show-case

:DocsGradientDividerVertical

#code

<!-- automd:file src="../../app/components/content/Docs/GradientDivider/DocsGradientDividerVertical.vue" code lang="vue" -->

```vue [DocsGradientDividerVertical.vue]
<template>
  <div class="flex h-24 items-center justify-center gap-6">
    <span class="text-muted-foreground text-sm">Start</span>
    <UiGradientDivider orientation="vertical" />
    <span class="text-muted-foreground text-sm">End</span>
  </div>
</template>
```

<!-- /automd -->

::
