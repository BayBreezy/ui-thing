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

::ShowCase{component="DocsSheet"}

#code

```vue [DocsSheet.vue]
<template>
  <div class="flex w-full justify-center">
    <UISheet>
      <UISheetTrigger as-child>
        <UIButton variant="outline">Open Sheet</UIButton>
      </UISheetTrigger>

      <UISheetContent
        side="right"
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <template #content>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <UILabel for="name" class="text-right"> Name </UILabel>
              <UIInput id="name" value="Pedro Duarte" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <UILabel for="username" class="text-right"> Username </UILabel>
              <UIInput id="username" value="@peduarte" class="col-span-3" />
            </div>
          </div>
        </template>
        <template #footer>
          <UISheetFooter>
            <UISheetClose as-child>
              <UIButton variant="outline" type="button" class="mt-2 sm:mt-0">Cancel</UIButton>
            </UISheetClose>
            <UISheetClose as-child>
              <UIButton type="submit">Save</UIButton>
            </UISheetClose>
          </UISheetFooter>
        </template>
      </UISheetContent>
    </UISheet>
  </div>
</template>
```

::
