---
title: Toggle
description: A two-state button that can be either on or off.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/toggle.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/toggle.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Toggle.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add toggle"}

## Usage

### Basic example

::prose-show-case

:DocsToggle

#code

<!-- automd:file src="../../app/components/content/Docs/Toggle/DocsToggle.vue" code lang="vue" -->

```vue [DocsToggle.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiToggle aria-label="Toggle italic">
      <Icon name="lucide:bold" class="size-4" />
    </UiToggle>
  </div>
</template>
```

<!-- /automd -->

::
