---
title: V-Wave
description: The material-ripple directive for Vue that actually works!
---

## Getting Started

:::Steps
::Step

### Installation

To get started, you will need to install the package. You can visit the [V-Wave](https://github.com/justintaddei/v-wave) page for more details... All the details 🙂.

```bash
npm install v-wave
```

::
::Step

### Add it to `nuxt.config.ts`

Once installed, you can add it to your `nuxt.config.ts` file.

```ts
modules: ["v-wave/nuxt"];
```

::
:::

## Usage

### Buttons

You can add the `v-wave` directive to any button. Be sure to check out the available options in the repo.

::ShowCase

:DocsVWaveButton

#code

<!-- automd:file src="../../app/components/content/Docs/VWave/DocsVWaveButton.vue" code lang="vue" -->

```vue [DocsVWaveButton.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButton v-wave>Button</UiButton>
  </div>
</template>
```

<!-- /automd -->

::

### Options

You can change the color of the ripple effect by passing a color to the directive. Even background images are allowed.

::ShowCase

:DocsVWaveColor

#code

<!-- automd:file src="../../app/components/content/Docs/VWave/DocsVWaveColor.vue" code lang="vue" -->

```vue [DocsVWaveColor.vue]
<template>
  <div class="flex items-center justify-center">
    <div
      v-wave="{
        color: 'no-repeat url(/icon.png) 0 0 / cover',
        initialOpacity: 0.7,
        duration: 1,
      }"
      class="flex size-[250px] cursor-pointer items-center justify-center rounded-md border shadow-sm"
    />
  </div>
</template>
```

<!-- /automd -->

::
