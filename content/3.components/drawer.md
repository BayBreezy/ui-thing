---
title: Drawer
description: A drawer component that can be used as a Dialog replacement on tablet and mobile devices.
links:
  - title: Reka UI Drawer Docs
    href: https://reka-ui.com/docs/components/drawer
---

## Source code

Click :SourceCodeLink{component="Drawer"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add drawer"}

## Usage

### Mobile form with a software keyboard

Place `UiDrawerVirtualKeyboardProvider` inside `UiDrawer` and set the `viewport` prop on `UiDrawerContent`. The prop wraps the content in `UiDrawerViewport`, which applies the keyboard inset so the scrollable form keeps its controls reachable. Save applies the draft. Discard restores the saved value.

::prose-show-case

:DocsDrawerKeyboardForm

#code

<!-- automd:file src="../../app/components/content/Docs/Drawer/DocsDrawerKeyboardForm.vue" code lang="vue" -->

```vue [DocsDrawerKeyboardForm.vue]
<template>
  <UiDrawer :open="open" @update:open="onOpenChange">
    <div class="flex justify-center">
      <UiDrawerTrigger as-child>
        <UiButton variant="outline">Edit display name</UiButton>
      </UiDrawerTrigger>
    </div>
    <UiDrawerVirtualKeyboardProvider>
      <UiDrawerContent viewport>
        <UiDrawerHeader>
          <UiDrawerTitle>Edit display name</UiDrawerTitle>
          <UiDrawerDescription>Save or discard your changes before closing.</UiDrawerDescription>
        </UiDrawerHeader>
        <form class="min-h-0 space-y-4 overflow-y-auto p-4" @submit.prevent="save">
          <div class="space-y-2">
            <UiLabel :for="inputId">Display name</UiLabel>
            <UiInput :id="inputId" v-model="draft" required />
          </div>
          <div class="flex flex-wrap gap-2">
            <UiButton type="submit">Save</UiButton>
            <UiButton type="button" variant="outline" @click="discard">Discard</UiButton>
          </div>
        </form>
      </UiDrawerContent>
    </UiDrawerVirtualKeyboardProvider>
  </UiDrawer>
</template>

<script setup lang="ts">
  import type { DrawerRootEmits } from "reka-ui";

  const inputId = useId();
  const open = ref(false);
  const saved = ref("Taylor");
  const draft = ref(saved.value);

  function onOpenChange(nextOpen: boolean, details: DrawerRootEmits["update:open"][1]) {
    if (!nextOpen && draft.value !== saved.value) {
      details.cancel();
      return;
    }
    open.value = nextOpen;
  }

  function save() {
    saved.value = draft.value;
    open.value = false;
  }

  function discard() {
    draft.value = saved.value;
    open.value = false;
  }
</script>
```

<!-- /automd -->

::

### Indent the page

Wrap the page in `UiDrawerProvider`, then put the content that should scale back in `UiDrawerIndent` and the colour revealed behind it in `UiDrawerIndentBackground`. `UiDrawerIndent` exposes `--drawer-swipe-progress` and `data-active`, so it grows back to full size as the drawer is swiped away. In a real app, place the provider, indent and background at the root of your layout.

::prose-show-case

:DocsDrawerIndent

#code

<!-- automd:file src="../../app/components/content/Docs/Drawer/DocsDrawerIndent.vue" code lang="vue" -->

```vue [DocsDrawerIndent.vue]
<template>
  <UiDrawerProvider>
    <div class="relative overflow-hidden rounded-lg border">
      <UiDrawerIndentBackground />
      <UiDrawerIndent
        class="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-center"
      >
        <p class="text-muted-foreground text-sm">
          This page scales back while the drawer is open and grows again as you swipe it away.
        </p>
        <UiDrawer v-model:open="open">
          <UiDrawerTrigger as-child>
            <UiButton variant="outline">Open drawer</UiButton>
          </UiDrawerTrigger>
          <UiDrawerContent>
            <UiDrawerHeader>
              <UiDrawerTitle>Indented page</UiDrawerTitle>
              <UiDrawerDescription
                >Swipe down to dismiss and watch the page return.</UiDrawerDescription
              >
            </UiDrawerHeader>
            <UiDrawerFooter>
              <UiDrawerClose as-child>
                <UiButton variant="outline">Close</UiButton>
              </UiDrawerClose>
            </UiDrawerFooter>
          </UiDrawerContent>
        </UiDrawer>
      </UiDrawerIndent>
    </div>
  </UiDrawerProvider>
</template>

<script setup lang="ts">
  const open = ref(false);
</script>
```

<!-- /automd -->

::

### Basic Form

We can bring the different components together to make a simple drawer.

::prose-show-case

:DocsDrawerBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Drawer/DocsDrawerBasic.vue" code lang="vue" -->

```vue [DocsDrawerBasic.vue]
<template>
  <div class="text-center">
    <UiDrawer v-model:open="isOpen">
      <UiDrawerTrigger as-child>
        <UiButton variant="outline">Open Drawer</UiButton>
      </UiDrawerTrigger>
      <UiDrawerVirtualKeyboardProvider>
        <UiDrawerContent viewport>
          <div class="mx-auto w-full max-w-sm rounded-t-lg p-4 pb-10">
            <UiDrawerTitle class="mb-1.5">Drawer Title</UiDrawerTitle>
            <UiDrawerDescription>
              This is a basic drawer with a title and description.
            </UiDrawerDescription>

            <div class="relative">
              <form class="mt-7" @submit="submit">
                <fieldset :disabled="isSubmitting" class="grid gap-6">
                  <UiVeeInput
                    name="email"
                    label="Email"
                    type="email"
                    model-value="baybreezy@example.com"
                  />
                  <UiVeeInput name="username" label="Username" model-value="baybreezy" />
                  <UiDrawerClose as-child>
                    <UiButton type="submit">Update</UiButton>
                  </UiDrawerClose>
                </fieldset>
              </form>
            </div>

            <UiDrawerClose class="absolute top-3 right-4 h-7 w-7" as-child>
              <UiButton variant="ghost" size="icon-sm" class="opacity-50 hover:opacity-100">
                <Icon name="lucide:x" />
              </UiButton>
            </UiDrawerClose>
          </div>
        </UiDrawerContent>
      </UiDrawerVirtualKeyboardProvider>
    </UiDrawer>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const isOpen = defineModel<boolean>();

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
      object({
        email: string().label("Email").email().required().trim(),
        username: string().label("Username").min(3).required().trim().lowercase(),
      })
    ),
  });
  const submit = handleSubmit((_) => {
    useSonner.success("Updated", {
      description: "Your account has been updated",
    });
  });
</script>
```

<!-- /automd -->

::

### With Image

We can add an image inside as well.

::prose-show-case

:DocsDrawerImage

#code

<!-- automd:file src="../../app/components/content/Docs/Drawer/DocsDrawerImage.vue" code lang="vue" -->

```vue [DocsDrawerImage.vue]
<template>
  <div class="text-center">
    <UiDrawer v-model:open="isOpen">
      <UiDrawerTrigger as-child>
        <UiButton variant="outline">View image</UiButton>
      </UiDrawerTrigger>
      <UiDrawerContent>
        <div class="mx-auto w-full max-w-screen-md rounded-t-lg p-4 pb-10">
          <UiDrawerTitle class="mb-1.5">Image</UiDrawerTitle>
          <UiDrawerDescription>
            Right click on the image to see the context menu.
          </UiDrawerDescription>

          <div class="relative min-h-[400px]">
            <UiAspectRatio :ratio="16 / 9" class="mt-6">
              <UiContextMenu>
                <UiContextMenuTrigger as-child>
                  <img
                    src="https://cdn.pixabay.com/photo/2023/05/02/21/08/river-7966163_1280.png"
                    alt="Snow Lake"
                    class="h-full w-full rounded-md object-cover"
                  />
                </UiContextMenuTrigger>
                <UiContextMenuContent class="w-[150px]">
                  <UiContextMenuGroup>
                    <UiContextMenuItem @select="showMessage('Now sharing...')"
                      >Share</UiContextMenuItem
                    >
                    <UiContextMenuItem @select="showMessage('Moving image...')"
                      >Move</UiContextMenuItem
                    >
                    <UiContextMenuItem
                      @select="showMessage('Please hold as we rename the image...')"
                      >Rename</UiContextMenuItem
                    >
                  </UiContextMenuGroup>
                  <UiContextMenuSeparator />
                  <UiContextMenuGroup>
                    <UiContextMenuItem @select="showMessage('Deleting the image...')"
                      >Delete</UiContextMenuItem
                    >
                  </UiContextMenuGroup>
                </UiContextMenuContent>
              </UiContextMenu>
            </UiAspectRatio>
          </div>

          <UiDrawerClose class="absolute top-3 right-4 h-7 w-7" as-child>
            <UiButton variant="ghost" size="icon-sm" class="opacity-50 hover:opacity-100">
              <Icon name="lucide:x" />
            </UiButton>
          </UiDrawerClose>
        </div>
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script lang="ts" setup>
  const showMessage = (message: string) => {
    useSonner(message);
  };
  const isOpen = defineModel<boolean>();
</script>
```

<!-- /automd -->

::

### Responsive Dialog

You can combine the `Dialog` and `Drawer` components to create a responsive dialog. This renders a `Dialog` component on desktop and a `Drawer` on mobile.

::prose-show-case

:DocsDrawerResponsiveDialog

#code

<!-- automd:file src="../../app/components/content/Docs/Drawer/DocsDrawerResponsiveDialog.vue" code lang="vue" -->

```vue [DocsDrawerResponsiveDialog.vue]
<template>
  <div class="flex justify-center">
    <DefinedForm>
      <form class="">
        <fieldset class="grid items-start gap-4">
          <UiVeeInput name="email" label="Email" type="email" model-value="baybreezy@example.com" />
          <UiVeeInput name="username" label="Username" model-value="baybreezy" />
          <UiButton type="submit"> Save changes </UiButton>
        </fieldset>
      </form>
    </DefinedForm>

    <UiDialog v-if="isDesktop" v-model:open="isOpen">
      <UiDialogTrigger as-child>
        <UiButton variant="outline" text="Edit Profile" />
      </UiDialogTrigger>
      <UiDialogContent class="sm:max-w-[400px]">
        <UiDialogHeader>
          <UiDialogTitle>Edit profile</UiDialogTitle>
          <UiDialogDescription>
            Make changes to your profile here. Click save when you're done.
          </UiDialogDescription>
        </UiDialogHeader>
        <ReusableForm />
      </UiDialogContent>
    </UiDialog>

    <UiDrawer v-else v-model:open="isOpen">
      <UiDrawerTrigger as-child>
        <UiButton variant="outline" text="Edit Profile" />
      </UiDrawerTrigger>
      <UiDrawerVirtualKeyboardProvider>
        <UiDrawerContent viewport class="mx-2">
          <UiDrawerHeader class="text-left">
            <UiDrawerTitle>Edit profile</UiDrawerTitle>
            <UiDrawerDescription>
              Make changes to your profile here. Click save when you're done.
            </UiDrawerDescription>
          </UiDrawerHeader>
          <div class="px-4">
            <ReusableForm />
          </div>
          <UiDrawerFooter class="pt-2">
            <UiDrawerClose as-child>
              <UiButton variant="outline"> Cancel </UiButton>
            </UiDrawerClose>
          </UiDrawerFooter>
        </UiDrawerContent>
      </UiDrawerVirtualKeyboardProvider>
    </UiDrawer>
  </div>
</template>

<script lang="ts" setup>
  // Reuse `form` section
  const [DefinedForm, ReusableForm] = createReusableTemplate();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isOpen = ref(false);
</script>
```

<!-- /automd -->

::
