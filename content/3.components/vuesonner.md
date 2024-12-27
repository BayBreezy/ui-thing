---
title: Vue Sonner
description: Vue Sonner is an opinionated toast component for Vue. It's customizable, but styled by default. Comes with a swipe to dismiss animation.
links:
  - title: API Reference
    href: https://github.com/xiaoluoboding/vue-sonner
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="VueSonner.client.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add vue-sonner
```

Add the `<UiVueSonner />` component to your `app.vue` file:

```vue [app.vue]
<template>
  <div>
    <NuxtPage />
    <UiVueSonner />
  </div>
</template>
```

Just so that we do not have to import the `toast` function from the vue-sonner package each time that we want to use it, we can instruct Nuxt to auto-import it by adding this to the `imports` object inside our `nuxt.config.ts` file:

```ts [nuxt.config.ts]
imports: {
  imports: [
    { from: "vue-sonner", name: "toast", as: "useSonner" },
  ],
},
```

We also have to add the code below to our `nuxt.config.ts` file in order to transpile the vue-sonner package:

```ts [nuxt.config.ts]
build: {
  transpile: ["vue-sonner"],
},
```

## Usage

### Full example

::ShowCase

:DocsVueSonner

#code

<!-- automd:file src="../../app/components/content/Docs/VueSonner/DocsVueSonner.vue" code lang="vue" -->

```vue [DocsVueSonner.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiButton
      variant="outline"
      @click="
        useSonner('Default', {
          description: 'This is a description',
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
  </div>
</template>

<script lang="ts" setup>
  import Headless from "./DocsVueSonnerHeadless.vue";

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

<!-- automd:file src="../../app/components/content/Docs/VueSonner/DocsVueSonnerHeadless.vue" code lang="vue" -->

```vue [DocsVueSonnerHeadless.vue]
<template>
  <div
    class="relative z-[999] box-border flex w-full gap-4 rounded-md border bg-background p-3 px-5 shadow-lg md:w-[360px]"
  >
    <UiAvatar
      class="ring-1 ring-border"
      src="https://behonbaker.com/icon.png"
      fallback="BB"
      alt="Behon Baker"
    />
    <div>
      <p>Add user</p>
      <p class="text-sm font-normal text-muted-foreground">
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
    useSonner.success("", { description: "User added" });
    emits("closeToast");
  };
  const cancel = () => {
    useSonner.warning("", { description: "User not added" });
    emits("closeToast");
  };
</script>
```

<!-- /automd -->
