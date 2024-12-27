---
title: Popover
description: Displays rich content in a portal, triggered by a button.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/popover.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/popover.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Popover"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add popover
```

## Anatomy

```vue
<template>
  <UiPopover>
    <UiPopoverTrigger />
    <UiPopoverContent>
      <!-- Some markup -->
    </UiPopoverContent>
  </UiPopover>
</template>
```

## Usage

### Full example

::ShowCase

:DocsPopover

#code

<!-- automd:file src="../../app/components/content/Docs/Popover/DocsPopover.vue" code lang="vue" -->

```vue [DocsPopover.vue]
<template>
  <div class="flex w-full justify-center">
    <UiPopover>
      <UiPopoverTrigger as-child>
        <UiButton variant="outline">Open popover</UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-80 p-6">
        <div class="flex h-full flex-col gap-1.5">
          <p class="font-semibold leading-none">Dimensions</p>
          <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          <div class="mt-5 grid gap-3">
            <div class="grid grid-cols-3 items-center gap-4">
              <UiLabel for="width">Width</UiLabel>
              <UiInput id="width" type="text" value="100%" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <UiLabel for="maxWidth">Max. width</UiLabel>
              <UiInput id="maxWidth" type="text" value="300px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <UiLabel for="height">Height</UiLabel>
              <UiInput id="height" type="text" value="25px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <UiLabel for="maxHeight">Max. height</UiLabel>
              <UiInput id="maxHeight" type="text" value="none" class="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>
```

<!-- /automd -->

::
