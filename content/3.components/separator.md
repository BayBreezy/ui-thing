---
title: Separator
description: Visually or semantically separates content.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/separator.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/separator.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Separator.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add separator"}

## Usage

### Basic example

::prose-show-case

:DocsSeparator

#code

<!-- automd:file src="../../app/components/content/Docs/Separator/DocsSeparator.vue" code lang="vue" -->

```vue [DocsSeparator.vue]
<template>
  <div class="mx-auto max-w-fit">
    <div class="gap-y-1">
      <h4 class="text-sm leading-none font-semibold">UI Thing</h4>
      <p class="text-muted-foreground text-sm">An open-source UI component library for Nuxt.</p>
    </div>
    <UiSeparator class="my-4" />
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div class="hover:text-primary transition-colors">Documentation</div>
      <UiSeparator orientation="vertical" />
      <div class="hover:text-primary transition-colors">Components</div>
      <UiSeparator orientation="vertical" />
      <div class="hover:text-primary transition-colors">Examples</div>
    </div>
  </div>
</template>
```

<!-- /automd -->

::
