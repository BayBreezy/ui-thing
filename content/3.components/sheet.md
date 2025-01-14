---
title: Sheet
description: Extends the Dialog component to display content that complements the main content of the screen.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/dialog.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/dialog.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Sheet"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add sheet
```

## Usage

### Basic example

::ShowCase

:DocsSheet

#code

<!-- automd:file src="../../app/components/content/Docs/Sheet/DocsSheet.vue" code lang="vue" -->

```vue [DocsSheet.vue]
<template>
  <div class="flex w-full justify-center">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton variant="outline">Open Sheet</UiButton>
      </UiSheetTrigger>

      <UiSheetContent
        class="sm:max-w-none md:w-[450px]"
        side="right"
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <template #content>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <UiLabel for="name" class="text-right"> Name </UiLabel>
              <UiInput id="name" model-value="Pedro Duarte" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <UiLabel for="username" class="text-right"> Username </UiLabel>
              <UiInput id="username" model-value="@peduarte" class="col-span-3" />
            </div>
          </div>
        </template>
        <template #footer>
          <UiSheetFooter>
            <UiSheetClose as-child>
              <UiButton variant="outline" type="button" class="mt-2 sm:mt-0">Cancel</UiButton>
            </UiSheetClose>
            <UiSheetClose as-child>
              <UiButton type="submit">Save</UiButton>
            </UiSheetClose>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>
```

<!-- /automd -->

::
