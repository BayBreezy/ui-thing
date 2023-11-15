---
title: Dialog
description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/dialog.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/dialog.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Dialog"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add dialog
```

## Usage

### Profile Dialog

::ShowCase{component="DocsDialog"}

#code

```vue [DocsDialog.vue]
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
            <UIButton
              @click="closeDialog(false)"
              variant="outline"
              type="button"
              class="mt-2 sm:mt-0"
              >Cancel</UIButton
            >
            <UIButton @click="closeDialog(true)" type="submit">Save</UIButton>
          </UIDialogFooter>
        </template>
      </UIDialogContent>
    </UIDialog>
  </div>
</template>

<script lang="ts" setup>
  const dialog = ref(false);

  const closeDialog = (save: boolean) => {
    useToast().toast({
      title: save ? "Profile updated" : "Changes discarded",
      description: `Your changes has been ${save ? "saved" : "discarded"}.`,
      duration: 5000,
      icon: save ? "lucide:check" : "lucide:x",
    });
    dialog.value = false;
  };
</script>
```

::

### Custom Close Button

::ShowCase{component="DocsDialogCustomClose"}

#code

```vue [DocsDialogCustomClose.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UIDialog>
      <UIDialogTrigger as-child>
        <UIButton variant="outline">Share</UIButton>
      </UIDialogTrigger>

      <UIDialogContent
        class="sm:max-w-md"
        title="Share link"
        description="Anyone who has this link will be able to view this."
      >
        <template #content>
          <div class="flex items-center space-x-2">
            <div class="grid flex-1 gap-2">
              <UILabel for="link" class="sr-only"> Link </UILabel>
              <UIInput id="link" model-value="https://ui.shadcn.com/docs/installation" readOnly />
            </div>
            <UIButton @click="copyValue" type="submit" size="icon" class="px-3">
              <span class="sr-only">Copy</span>
              <Icon name="lucide:copy" class="h-4 w-4" />
            </UIButton>
          </div>
        </template>
        <template #footer>
          <UIDialogFooter class="sm:justify-start">
            <UIDialogClose as-child>
              <UIButton variant="secondary">Close</UIButton>
            </UIDialogClose>
          </UIDialogFooter>
        </template>
      </UIDialogContent>
    </UIDialog>
  </div>
</template>

<script lang="ts" setup>
  const copyValue = () => {
    const { isSupported, copy } = useClipboard({ legacy: true });
    if (isSupported.value) {
      copy("https://ui.shadcn.com/docs/installation");
      useToast().toast({
        title: "Copied",
        description: `The link has been copied to your clipboard.`,
        duration: 5000,
        icon: "lucide:thumbs-up",
      });
      return;
    } else {
      useToast().toast({
        title: "Not supported",
        description: `Your browser does not support copying to clipboard.`,
        duration: 5000,
        icon: "lucide:thumbs-down",
      });
      return;
    }
  };
</script>
```

::
