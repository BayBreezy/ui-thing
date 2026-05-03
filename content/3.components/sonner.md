---
title: Sonner
description: Sonner is an opinionated toast component for Vue. It's customizable, but styled by default. Comes with a swipe to dismiss animation.
links:
  - title: API Reference
    href: https://github.com/xiaoluoboding/vue-sonner
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Sonner.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add sonner"}

Add the `<UiSonner />` component to your `app.vue` file:

```vue [app.vue] noFormat
<template>
  <div>
    <NuxtPage />
    <UiSonner />
  </div>
</template>
```

## Usage

### Full example

::prose-show-case

:DocsSonner

#code

<!-- automd:file src="../../app/components/content/Docs/VueSonner/DocsSonner.vue" code lang="vue" -->

```vue [DocsSonner.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiButton
      variant="outline"
      @click="
        useSonner('Default', {
          description: 'This is a description',
          duration: Infinity,
        })
      "
      >Show default</UiButton
    >
    <UiButton
      variant="outline"
      @click="
        useSonner('', {
          description: 'Send new notification to customer?',
          duration: Infinity,
          onDismiss() {
            useSonner.warning('', { description: 'Notification not sent' });
          },
          onAutoClose() {
            useSonner.warning('', { description: 'Notification not sent' });
          },
          action: {
            label: 'Send',
            onClick() {
              useSonner.success('', { description: 'Notification sent' });
            },
          },
        })
      "
      >Show action</UiButton
    >
    <UiButton
      v-for="(t, i) in types"
      :key="i"
      variant="outline"
      @click="
        (useSonner[t](t),
        {
          description: `This is a ${t} message`,
        })
      "
      >Show {{ t }}</UiButton
    >
    <UiButton
      variant="outline"
      @click="
        useSonner.promise(promise, {
          loading: 'Checking API for tools...',
          success: (d: any) => d,
          error: (d: any) => 'API returned error',
        })
      "
      >Show promise</UiButton
    >
    <UiButton
      variant="outline"
      @click="
        useSonner.custom(markRaw(Headless), {
          duration: Infinity,
        })
      "
      >Show custom</UiButton
    >
    <UiButton
      variant="outline"
      @click="
        useSonner.success('Rich Success', {
          description: 'This is a rich success message with custom colors',
          richColors: true,
          duration: Infinity,
        })
      "
      >Rich Success</UiButton
    >
  </div>
</template>

<script lang="ts" setup>
  import Headless from "./DocsSonnerHeadless.vue";

  const types = ["success", "info", "warning", "error"] as const;

  const promise = () =>
    new Promise<string>((resolve) =>
      setTimeout(() => resolve("There are 16 tools ready for use"), 2000)
    );
</script>
```

<!-- /automd -->

::

For the custom element, this is what the code looks like

<!-- automd:file src="../../app/components/content/Docs/VueSonner/DocsSonnerHeadless.vue" code lang="vue" -->

```vue [DocsSonnerHeadless.vue]
<template>
  <div
    class="bg-background relative z-[999] box-border flex w-full gap-4 rounded-md border p-3 px-5 shadow-lg md:w-[360px]"
  >
    <UiAvatar
      class="ring-border ring-1"
      src="https://behonbaker.com/icon.png"
      fallback="BB"
      alt="Behon Baker"
    />
    <div>
      <p class="text-sm font-semibold">Add user</p>
      <p class="text-muted-foreground text-sm font-normal">
        Would you like to add this user to the list?
      </p>
      <div class="mt-2 flex items-center gap-2">
        <UiButton class="h-7 text-xs" @click="addUser">Yes</UiButton>
        <UiButton variant="outline" class="h-7 text-xs" @click="cancel">No</UiButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const emits = defineEmits<{
    closeToast: [];
  }>();

  const addUser = () => {
    useSonner.success("User Added", {
      description: "User was added successfully",
      richColors: true,
    });
    emits("closeToast");
  };
  const cancel = () => {
    useSonner.warning("", { description: "User not added" });
    emits("closeToast");
  };
</script>
```

<!-- /automd -->
