---
title: Meteors
description: Shower your UI with meteors.... For whatever reason you want to do that.
---

## Credits

Shout out to [Magic UI](https://magicui.design/docs/components/meteors) for the inspiration. I actually discovered this package while browsing their website.

## Getting Started

:::Steps

::Step

### Add Animation

You will need to add this to your `tailwind.css` file.

```css
@theme inline {
  --animate-meteor: meteor 5s linear infinite;

  @keyframes meteor {
    0% {
      transform: rotate(var(--angle)) translateX(0);
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      transform: rotate(var(--angle)) translateX(-500px);
      opacity: 0;
    }
  }
}
```

::

::Step

### Create Component

Create the component `Meteors.client.vue` in the `components` directory.

:prose-code-snippet{file="/components/Ui/Meteors.client.vue" language="vue" title="Meteors Component"}

::
:::

## Usage

### Basic

We can add the `UiMeteors` component to trigger the meteors.

::ShowCase

:DocsMeteors

#code

<!-- automd:file src="../../app/components/content/Docs/Meteors/DocsMeteors.vue" code lang="vue" -->

```vue [DocsMeteors.vue]
<template>
  <div
    class="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border"
  >
    <UiMeteors :number="30" />
    <span
      class="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10"
    >
      Meteors
    </span>
  </div>
</template>
```

<!-- /automd -->

::
