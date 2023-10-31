---
title: Dropdown Menu
description: Displays a menu to the user—such as a set of actions or functions—triggered by a button.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/dropdown-menu.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/dropdown-menu.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="DropdownMenu"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add dropdown-menu
```

## Usage

### Full Example

::ShowCase{component="DocsDropdownMenuBasic"}

#code

```vue [DocsDropdownMenuBasic.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UIDialog v-model:open="dialog">
      <UIDialogTrigger as-child>
        <UIButton variant="outline">Edit Profile</UIButton>
      </UIDialogTrigger>

      <UIDialogContent
        class="sm:max-w-[425px]"
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <template #content>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <UILabel for="name" class="text-right"> Name </UILabel>
              <UIInput id="name" model-value="Pedro Duarte" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <UILabel for="username" class="text-right"> Username </UILabel>
              <UIInput id="username" model-value="@peduarte" class="col-span-3" />
            </div>
          </div>
        </template>
        <template #footer>
          <UIDialogFooter>
            <UIButton @click="dialog = false" variant="outline" type="button" class="mt-2 sm:mt-0"
              >Cancel</UIButton
            >
            <UIButton @click="dialog = false" type="submit">Save</UIButton>
          </UIDialogFooter>
        </template>
      </UIDialogContent>
    </UIDialog>
  </div>
</template>

<script lang="ts" setup>
  const dialog = ref(false);
</script>
```

::
