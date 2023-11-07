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

Add the `<UIVueSonner />` component to your `app.vue` file:

```vue [app.vue]
<template>
  <div>
    <NuxtPage />
    <UIVueSonner />
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

::ShowCase{component="DocsVueSonner"}

#code

```vue [DocsVueSonner.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UIButton
      @click="
        useSonner('Default', {
          description: 'This is a description',
        })
      "
      variant="outline"
      >Show default</UIButton
    >
    <UIButton
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
      variant="outline"
      >Show action</UIButton
    >
    <UIButton
      v-for="(t, i) in types"
      @click="
        useSonner[t](useCapitalize(t), {
          description: `This is a ${t} message`,
        })
      "
      variant="outline"
      >Show {{ t }}</UIButton
    >
    <UIButton
      @click="
        useSonner.promise(promise, {
          loading: 'Checking API for tools...',
          success: (d) => d,
          error: (d) => 'API returned error',
        })
      "
      variant="outline"
      >Show promise</UIButton
    >
    <UIButton
      @click="
        useSonner(markRaw(Headless), {
          duration: Infinity,
        })
      "
      variant="outline"
      >Show custom</UIButton
    >
  </div>
</template>

<script lang="ts" setup>
  import Headless from "./DocsVueSonnerHeadless.vue";

  const types = ["success", "info", "warning", "error"] as const;

  const promise = () =>
    new Promise<string>((resolve, reject) =>
      setTimeout(() => resolve("There are 16 tools ready for use"), 2000)
    );
</script>
```

::
