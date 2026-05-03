---
title: Scroll Area
description: Augments native scroll functionality for custom, cross-browser styling.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/scroll-area.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/scroll-area.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="ScrollArea"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add scroll-area"}

## Usage

```vue
<template>
  <UiScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
    Jokester began sneaking into the castle in the middle of the night and leaving jokes all over
    the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious,
    but he couldn't seem to stop Jokester. And then, one day, the people of the kingdom discovered
    that the jokes left by Jokester were so funny that they couldn't help but laugh. And once
    theystarted laughing, they couldn't stop.
  </UiScrollArea>
</template>
```

### Basic example

::prose-show-case

:DocsScrollArea

#code

<!-- automd:file src="../../app/components/content/Docs/ScrollArea/DocsScrollArea.vue" code lang="vue" -->

```vue [DocsScrollArea.vue]
<template>
  <div class="flex w-full justify-center">
    <UiScrollArea class="h-72 w-48 rounded-md border">
      <div class="p-4">
        <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
        <template v-for="(tag, i) in tags" :key="i">
          <div class="text-sm">{{ tag }}</div>
          <UiSeparator class="my-2" />
        </template>
      </div>
    </UiScrollArea>
  </div>
</template>

<script lang="ts" setup>
  const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
</script>
```

<!-- /automd -->

::

### Programmatic scroll

Use the `scrollTo` method and `top` property exposed by `UiScrollArea` to scroll programmatically.

::prose-show-case

:DocsScrollAreaScrollTo

#code

<!-- automd:file src="../../app/components/content/Docs/ScrollArea/DocsScrollAreaScrollTo.vue" code lang="vue" -->

```vue [DocsScrollAreaScrollTo.vue]
<template>
  <div class="flex w-full flex-col items-center gap-4">
    <UiScrollArea ref="scrollAreaRef" class="h-72 w-48 rounded-md border">
      <div class="p-4">
        <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
        <template v-for="(tag, i) in tags" :key="i">
          <div
            :data-tag-index="i"
            :class="['text-sm', i === targetIndex && 'text-primary font-semibold']"
          >
            {{ tag }}
          </div>
          <UiSeparator v-if="i !== tags.length - 1" class="my-2" />
        </template>
      </div>
    </UiScrollArea>
    <div class="flex flex-wrap justify-center gap-2">
      <UiButton size="sm" variant="outline" @click="jumpScrollToTop">Jump Top</UiButton>
      <UiButton size="sm" variant="outline" @click="smoothScrollToTop">Smooth Top</UiButton>
      <UiButton size="sm" variant="outline" @click="scrollToTag">{{ tags[targetIndex] }}</UiButton>
      <UiButton size="sm" variant="outline" @click="scrollToBottom">Bottom</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const scrollAreaRef = useTemplateRef("scrollAreaRef");
  const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
  const targetIndex = 24;

  const jumpScrollToTop = () => {
    scrollAreaRef.value?.scrollTop?.();
  };

  const smoothScrollToTop = () => {
    scrollAreaRef.value?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    scrollAreaRef.value?.scrollToBottom?.();
  };

  const scrollToTag = () => {
    const viewport = scrollAreaRef.value?.viewport;
    if (!viewport) return;
    const el = viewport.querySelector(`[data-tag-index="${targetIndex}"]`) as HTMLElement | null;
    if (!el) return;
    const elRect = el.getBoundingClientRect();
    const vpRect = viewport.getBoundingClientRect();
    const top =
      viewport.scrollTop +
      elRect.top -
      vpRect.top -
      viewport.clientHeight / 2 +
      el.clientHeight / 2;
    scrollAreaRef.value?.scrollTo({ top, behavior: "smooth" });
  };
</script>
```

<!-- /automd -->

::

### Horizontal scroll

::prose-show-case

:DocsScrollAreaHorizontal

#code

<!-- automd:file src="../../app/components/content/Docs/ScrollArea/DocsScrollAreaHorizontal.vue" code lang="vue" -->

```vue [DocsScrollAreaHorizontal.vue]
<template>
  <UiScrollArea orientation="horizontal" class="rounded-md border whitespace-nowrap">
    <div class="flex w-max gap-4 p-4">
      <figure v-for="artwork in works" :key="artwork.artist" class="shrink-0">
        <div class="overflow-hidden rounded-md">
          <img
            :src="artwork.art"
            :alt="`Photo by ${artwork.artist}`"
            class="aspect-[3/4] h-[400px] w-[300px] object-cover"
            width="300px"
            height="400px"
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption class="text-muted-foreground pt-2 text-xs">
          Photo by
          <span class="text-foreground font-semibold">
            {{ artwork.artist }}
          </span>
        </figcaption>
      </figure>
    </div>
  </UiScrollArea>
</template>

<script lang="ts" setup>
  export interface Artwork {
    artist: string;
    art: string;
  }

  const works: Artwork[] = [
    {
      artist: "Ornella Binni",
      art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    },
    {
      artist: "Tom Byrom",
      art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
    },
    {
      artist: "Vladimir Malyavko",
      art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
    },
  ];
</script>
```

<!-- /automd -->

::
