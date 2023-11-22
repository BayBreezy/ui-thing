---
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/alert-dialog.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/alert-dialog.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="AlertDialog"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add alert-dialog
```

## Usage

::ShowCase{component="DocsAlertDialog"}

#code

```vue [DocsAlertDialog.vue]
<template>
  <div class="flex justify-center">
    <UiAlertDialog v-model:open="model">
      <UiAlertDialogTrigger as-child>
        <UiButton variant="outline">Show Dialog</UiButton>
      </UiAlertDialogTrigger>
      <UiAlertDialogContent @escape-key-down="showMessage('Escape key pressed')">
        <UiAlertDialogHeader>
          <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
          <UiAlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
        <UiAlertDialogFooter>
          <UiAlertDialogCancel @click="showMessage('Action cancelled')" />
          <UiAlertDialogAction @click="showMessage('Action confirmed!')" />
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>
  </div>
</template>

<script lang="ts" setup>
  const showMessage = (message: string) => {
    useSonner(message);
  };
  const model = ref(false);
</script>
```

::
