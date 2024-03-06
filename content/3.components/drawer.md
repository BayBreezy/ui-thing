---
title: Drawer
description: A drawer component that can be used as a Dialog replacement on tablet and mobile devices.
links:
  - title: Vaul Vue Docs
    href: https://github.com/radix-vue/vaul-vue/tree/main?tab=readme-ov-file#vaul-vue
---

## Source code

Click :SourceCodeLink{component="Drawer"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add drawer
```

## Usage

### Basic Form

We can bring the different components together to make a simple drawer.

::ShowCase{component="DocsDrawerBasic"}

#code

```vue [DocsDrawerBasic.vue]
<template>
  <div class="text-center">
    <UiDrawer>
      <UiDrawerTrigger asChild>
        <UiButton variant="outline">Open Drawer</UiButton>
      </UiDrawerTrigger>
      <UiDrawerContent>
        <div class="mx-auto w-full max-w-sm rounded-t-lg p-4 pb-10">
          <UiDrawerTitle class="mb-1.5">Drawer Title</UiDrawerTitle>
          <UiDrawerDescription>
            This is a basic drawer with a title and description.
            <br />
            For some strange reason the Vaul won't pull to close when a form i s present inside it
          </UiDrawerDescription>

          <div class="relative">
            <form @submit="submit" class="mt-7">
              <fieldset :disabled="isSubmitting" class="grid gap-6">
                <UiVeeInput
                  name="email"
                  label="Email"
                  type="email"
                  modelValue="baybreezy@example.com"
                />
                <UiVeeInput name="username" label="Username" modelValue="baybreezy" />
                <UiDrawerClose asChild>
                  <UiButton type="submit">Update</UiButton>
                </UiDrawerClose>
              </fieldset>
            </form>
          </div>
        </div>
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        email: z.string().email(),
        username: z.string().min(3),
      })
    ),
  });
  const submit = handleSubmit((values) => {
    useSonner.success("Updated", {
      description: "Your account has been updated",
    });
  });
</script>
```

::

### With Image

We can add an image inside as well.

::ShowCase{component="DocsDrawerImage"}

#code

```vue [DocsDrawerImage.vue]
<template>
  <div class="text-center">
    <UiDrawer>
      <UiDrawerTrigger asChild>
        <UiButton variant="outline">View image</UiButton>
      </UiDrawerTrigger>
      <UiDrawerContent>
        <div class="mx-auto w-full max-w-screen-md rounded-t-lg p-4 pb-10">
          <UiDrawerTitle class="mb-1.5">Image</UiDrawerTitle>
          <UiDrawerDescription>
            Right click on the image to see the context menu. This drawer seems to not have the pull
            down issue.
          </UiDrawerDescription>

          <div class="relative min-h-[400px]">
            <UiAspectRatio :ratio="16 / 9" class="mt-6">
              <UiContextMenu>
                <UiContextMenuTrigger asChild>
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

          <UiDrawerClose class="absolute right-4 top-3 h-7 w-7" asChild>
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
</script>
```

::
