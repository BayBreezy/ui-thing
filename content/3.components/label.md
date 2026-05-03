---
title: Label
description: Renders an accessible label associated with controls.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/label.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/label.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Label.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add label"}

## Usage

### Input

::prose-show-case

:DocsInputLabel

#code

<!-- automd:file src="../../app/components/content/Docs/Input/DocsInputLabel.vue" code lang="vue" -->

```vue [DocsInputLabel.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <div class="grid w-full max-w-sm gap-2">
      <UiLabel for="picture">Picture</UiLabel>
      <UiInput id="picture" type="file" />
    </div>
  </div>
</template>
```

<!-- /automd -->

::
