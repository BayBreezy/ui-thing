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

::ShowCase

:DocsDrawerBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Drawer/DocsDrawerBasic.vue" code lang="vue" -->

```vue [DocsDrawerBasic.vue]
<template>
  <div class="text-center">
    <UiDrawer v-model:open="isOpen" should-scale-background>
      <UiDrawerTrigger as-child>
        <UiButton variant="outline">Open Drawer</UiButton>
      </UiDrawerTrigger>
      <UiDrawerContent>
        <div class="mx-auto w-full max-w-sm rounded-t-lg p-4 pb-10">
          <UiDrawerTitle class="mb-1.5">Drawer Title</UiDrawerTitle>
          <UiDrawerDescription>
            This is a basic drawer with a title and description.
            <!-- eslint-disable-next-line vue/html-self-closing -->
            <br />
            For some strange reason the Vaul won't pull to close when a form is present inside it
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

          <UiDrawerClose class="absolute right-4 top-3 h-7 w-7" as-child>
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
  import { z } from "zod";

  const isOpen = defineModel<boolean>();

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        email: z.string().email(),
        username: z.string().min(3),
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

::ShowCase

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
            Right click on the image to see the context menu. This drawer seems to not have the pull
            down issue.
          </UiDrawerDescription>

          <div class="relative min-h-[400px]">
            <UiAspectRatio :ratio="16 / 9" class="mt-6">
              <UiContextMenu>
                <UiContextMenuTrigger as-child>
                  <!-- eslint-disable-next-line vue/html-self-closing -->
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

          <UiDrawerClose class="absolute right-4 top-3 h-7 w-7" as-child>
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

::ShowCase

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

    <UiDrawer v-else v-model:open="isOpen" should-scale-background>
      <UiDrawerTrigger as-child>
        <UiButton variant="outline" text="Edit Profile" />
      </UiDrawerTrigger>
      <UiDrawerContent class="mx-2">
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
