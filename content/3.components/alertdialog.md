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

### Simple

::ShowCase

:DocsAlertDialog

#code

<!-- automd:file src="../../app/components/content/Docs/AlertDialog/DocsAlertDialog.vue" code lang="vue" -->

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

<!-- /automd -->

::

### Stacked Left

::ShowCase

:DocsAlertDialogStackedLeft

#code

<!-- automd:file src="../../app/components/content/Docs/AlertDialog/DocsAlertDialogStackedLeft.vue" code lang="vue" -->

```vue [DocsAlertDialogStackedLeft.vue]
<template>
  <div class="flex justify-center">
    <UiAlertDialog>
      <UiAlertDialogTrigger as-child>
        <UiButton variant="outline">Save Changes</UiButton>
      </UiAlertDialogTrigger>
      <UiAlertDialogContent class="max-w-[400px]">
        <UiFancyIcon type="light" color="success" circle icon="lucide:check" />
        <UiAlertDialogHeader>
          <UiAlertDialogTitle class="text-left">Save Successfully</UiAlertDialogTitle>
          <UiAlertDialogDescription class="text-left">
            Your changes have been saved successfully. Feel free to continue editing or close this
            dialog.
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
        <UiAlertDialogFooter class="grid grid-cols-2">
          <UiAlertDialogCancel />
          <UiAlertDialogAction />
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>
  </div>
</template>
```

<!-- /automd -->

::

### Media

::ShowCase

:DocsAlertDialogMedia

#code

<!-- automd:file src="../../app/components/content/Docs/AlertDialog/DocsAlertDialogMedia.vue" code lang="vue" -->

```vue [DocsAlertDialogMedia.vue]
<template>
  <div class="flex justify-center">
    <UiAlertDialog>
      <UiAlertDialogTrigger as-child>
        <UiButton variant="outline">Post Blog</UiButton>
      </UiAlertDialogTrigger>
      <UiAlertDialogContent class="max-w-[400px]">
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          src="https://images.unsplash.com/photo-1515865404355-ddb5b0910878?q=60&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="h-[200px] w-full rounded-lg object-cover shadow-sm"
        />
        <UiAlertDialogHeader>
          <UiAlertDialogTitle class="text-center">Blog post published</UiAlertDialogTitle>
          <UiAlertDialogDescription class="text-center">
            This blog post has been published. Team members will be able to edit this post and
            republish changes.
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
        <UiAlertDialogFooter class="grid grid-cols-2">
          <UiAlertDialogCancel> <Icon name="lucide:copy" /> Copy Link </UiAlertDialogCancel>
          <UiAlertDialogAction>Finish</UiAlertDialogAction>
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>
  </div>
</template>
```

<!-- /automd -->

::

### Alert w/ Icon

::ShowCase

:DocsAlertDialogWithIcon

#code

<!-- automd:file src="../../app/components/content/Docs/AlertDialog/DocsAlertDialogWithIcon.vue" code lang="vue" -->

```vue [DocsAlertDialogWithIcon.vue]
<template>
  <div class="flex justify-center">
    <UiAlertDialog>
      <UiAlertDialogTrigger as-child>
        <UiButton variant="outline">Alert dialog with icon</UiButton>
      </UiAlertDialogTrigger>
      <UiAlertDialogContent>
        <div class="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <Icon name="lucide:circle-alert" class="size-4 opacity-80" />
          </div>
          <UiAlertDialogHeader>
            <UiAlertDialogTitle>Are you sure?</UiAlertDialogTitle>
            <UiAlertDialogDescription>
              Are you sure you want to delete your account? All your data will be removed.
            </UiAlertDialogDescription>
          </UiAlertDialogHeader>
        </div>
        <UiAlertDialogFooter>
          <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
          <UiAlertDialogAction>Confirm</UiAlertDialogAction>
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>
  </div>
</template>
```

<!-- /automd -->

::
