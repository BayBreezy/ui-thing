---
title: Carousel
description: A carousel with motion and swipe built using Embla.
links:
  - title: Embla Carousel
    href: https://www.embla-carousel.com/
    icon: "lucide:gallery-horizontal-end"
  - title: API Reference
    href: https://www.embla-carousel.com/api/
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Carousel"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## About

The carousel component is built using the [Embla Carousel](https://www.embla-carousel.com/) library.

## Installation

```bash
npx ui-thing@latest add carousel
```

## Usage

<!-- automd:file src="../../app/components/content/Docs/Carousel/DocsCarouselUsage.vue" code lang="vue" -->

```vue [DocsCarouselUsage.vue]
<template>
  <UiCarousel>
    <UiCarouselContent>
      <UiCarouselItem>...</UiCarouselItem>
      <UiCarouselItem>...</UiCarouselItem>
      <UiCarouselItem>...</UiCarouselItem>
    </UiCarouselContent>
    <UiCarouselPrevious />
    <UiCarouselNext />
  </UiCarousel>
</template>
```

<!-- /automd -->

## Examples

### Sizes

To set the size of the items, you can use the `basis` utility class on the `<UiCarouselItem />`.

::ShowCase

:DocsCarouselSizes

#code

<!-- automd:file src="../../app/components/content/Docs/Carousel/DocsCarouselSizes.vue" code lang="vue" -->

```vue [DocsCarouselSizes.vue]
<template>
  <div class="flex items-center justify-center">
    <UiCarousel class="relative w-full max-w-sm" :opts="{ align: 'start' }">
      <UiCarouselContent>
        <UiCarouselItem
          v-for="(_, index) in 5"
          :key="index"
          grab-cursor
          class="md:basis-1/2 lg:basis-1/3"
        >
          <div class="p-1">
            <UiCard>
              <UiCardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-3xl font-semibold">{{ index + 1 }}</span>
              </UiCardContent>
            </UiCard>
          </div>
        </UiCarouselItem>
      </UiCarouselContent>
      <UiCarouselPrevious />
      <UiCarouselNext />
    </UiCarousel>
  </div>
</template>
```

<!-- /automd -->

::

Other Size Example

<!-- automd:file src="../../app/components/content/Docs/Carousel/DocsCarouselSizesExample.vue" code lang="html" -->

```html [DocsCarouselSizesExample.vue]
<template>
  <!-- 33% of the carousel width. -->
  <UiCarousel>
    <UiCarouselContent>
      <UiCarouselItem class="basis-1/3">...</UiCarouselItem>
      <UiCarouselItem class="basis-1/3">...</UiCarouselItem>
      <UiCarouselItem class="basis-1/3">...</UiCarouselItem>
    </UiCarouselContent>
  </UiCarousel>
</template>
```

<!-- /automd -->

Responsive

<!-- automd:file src="../../app/components/content/Docs/Carousel/DocsCarouselSizesResponsive.vue" code lang="html" -->

```html [DocsCarouselSizesResponsive.vue]
<template>
  <!-- 50% on small screens and 33% on larger screens. -->
  <UiCarousel>
    <UiCarouselContent>
      <UiCarouselItem class="md:basis-1/2 lg:basis-1/3">...</UiCarouselItem>
      <UiCarouselItem class="md:basis-1/2 lg:basis-1/3">...</UiCarouselItem>
      <UiCarouselItem class="md:basis-1/2 lg:basis-1/3">...</UiCarouselItem>
    </UiCarouselContent>
  </UiCarousel>
</template>
```

<!-- /automd -->

### Spacing

To set the spacing between the items, we use a `pl-[VALUE]` utility on the `<UiCarouselItem />` and a negative `-ml-[VALUE]` on the `<UiCarouselContent />`.

<Callout class="my-6">

**Why:** I tried to use the `gap` property or a `grid` layout on the `
CarouselContent` but it required a lot of math and mental effort to get the
spacing right. I found `pl-[VALUE]` and `-ml-[VALUE]` utilities much easier to
use.
<br/><br/>
You can always adjust this in your own project if you need to.

</Callout>

::ShowCase

:DocsCarouselSpacing

#code

<!-- automd:file src="../../app/components/content/Docs/Carousel/DocsCarouselSpacing.vue" code lang="vue" -->

```vue [DocsCarouselSpacing.vue]
<template>
  <div class="flex items-center justify-center">
    <UiCarousel class="relative w-full max-w-sm" :opts="{ align: 'start' }">
      <UiCarouselContent class="-ml-1">
        <UiCarouselItem
          v-for="(_, index) in 5"
          :key="index"
          grab-cursor
          class="pl-1 md:basis-1/2 lg:basis-1/3"
        >
          <div class="p-1">
            <UiCard>
              <UiCardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-2xl font-semibold">{{ index + 1 }}</span>
              </UiCardContent>
            </UiCard>
          </div>
        </UiCarouselItem>
      </UiCarouselContent>
      <UiCarouselPrevious />
      <UiCarouselNext />
    </UiCarousel>
  </div>
</template>
```

<!-- /automd -->

::

Other Spacing Example

<!-- automd:file src="../../app/components/content/Docs/Carousel/DocsCarouselSpacingExample.vue" code lang="html" -->

```html [DocsCarouselSpacingExample.vue]
<template>
  <UiCarousel>
    <UiCarouselContent class="-ml-4">
      <UiCarouselItem class="pl-4"> ... </UiCarouselItem>
      <UiCarouselItem class="pl-4"> ... </UiCarouselItem>
      <UiCarouselItem class="pl-4"> ... </UiCarouselItem>
    </UiCarouselContent>
  </UiCarousel>
</template>
```

<!-- /automd -->

Responsive

<!-- automd:file src="../../app/components/content/Docs/Carousel/DocsCarouselSpacingResponsive.vue" code lang="html" -->

```html [DocsCarouselSpacingResponsive.vue]
<template>
  <UiCarousel>
    <UiCarouselContent class="-ml-2 md:-ml-4">
      <UiCarouselItem class="pl-2 md:pl-4"> ... </UiCarouselItem>
      <UiCarouselItem class="pl-2 md:pl-4"> ... </UiCarouselItem>
      <UiCarouselItem class="pl-2 md:pl-4"> ... </UiCarouselItem>
    </UiCarouselContent>
  </UiCarousel>
</template>
```

<!-- /automd -->

### Orientation

Use the `orientation` prop to set the orientation of the carousel.

::ShowCase

:DocsCarouselOrientation

#code

<!-- automd:file src="../../app/components/content/Docs/Carousel/DocsCarouselOrientation.vue" code lang="vue" -->

```vue [DocsCarouselOrientation.vue]
<template>
  <div class="flex items-center justify-center">
    <UiCarousel
      orientation="vertical"
      class="max-w-xsw-full relative w-full max-w-xs"
      :opts="{ align: 'start' }"
    >
      <UiCarouselContent class="-mt-1 h-[200px]">
        <UiCarouselItem v-for="(_, index) in 5" :key="index" grab-cursor class="p-1 md:basis-1/2">
          <div class="p-1">
            <UiCard>
              <UiCardContent class="flex items-center justify-center p-6">
                <span class="text-3xl font-semibold">{{ index + 1 }}</span>
              </UiCardContent>
            </UiCard>
          </div>
        </UiCarouselItem>
      </UiCarouselContent>
      <UiCarouselPrevious />
      <UiCarouselNext />
    </UiCarousel>
  </div>
</template>
```

<!-- /automd -->

::

### Thumbnail

::ShowCase

:DocsCarouselThumbnail

#code

<!-- automd:file src="../../app/components/content/Docs/Carousel/DocsCarouselThumbnail.vue" code lang="vue" -->

```vue [DocsCarouselThumbnail.vue]
<template>
  <div class="flex justify-center">
    <ClientOnly>
      <div class="w-full sm:w-auto">
        <UiCarousel class="relative w-full max-w-xs" @init-api="(val) => (emblaMainApi = val)">
          <UiCarouselContent>
            <UiCarouselItem v-for="(_, index) in 10" :key="index" grab-cursor>
              <div class="p-1">
                <UiCard>
                  <UiCardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-4xl font-semibold">{{ index + 1 }}</span>
                  </UiCardContent>
                </UiCard>
              </div>
            </UiCarouselItem>
          </UiCarouselContent>
          <UiCarouselPrevious />
          <UiCarouselNext />
        </UiCarousel>

        <UiCarousel class="relative w-full max-w-xs" @init-api="(val) => (emblaThumbnailApi = val)">
          <UiCarouselContent class="ml-0 flex gap-1">
            <UiCarouselItem
              v-for="(_, index) in 10"
              :key="index"
              class="basis-1/4 cursor-pointer pl-0"
              @click="onThumbClick(index)"
            >
              <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
                <UiCard>
                  <UiCardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-4xl font-semibold">{{ index + 1 }}</span>
                  </UiCardContent>
                </UiCard>
              </div>
            </UiCarouselItem>
          </UiCarouselContent>
        </UiCarousel>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
  import type { CarouselApi } from "~/composables/useCarousel";

  const emblaMainApi = ref<CarouselApi>();
  const emblaThumbnailApi = ref<CarouselApi>();
  const selectedIndex = ref(0);

  function onSelect() {
    if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
    selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
    emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
  }

  function onThumbClick(index: number) {
    if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
    emblaMainApi.value.scrollTo(index);
  }

  watchOnce(emblaMainApi, (emblaMainApi) => {
    if (!emblaMainApi) return;

    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  });
</script>
```

<!-- /automd -->

::

## Options

You can pass options to the carousel using the `opts` prop. See the [Embla Carousel docs](https://www.embla-carousel.com/api/options/) for more information.

```vue
<template>
  <UiCarousel :opts="{ align: 'start', loop: true }">
    <UiCarouselContent>
      <UiCarouselItem>...</UiCarouselItem>
      <UiCarouselItem>...</UiCarouselItem>
      <UiCarouselItem>...</UiCarouselItem>
    </UiCarouselContent>
  </UiCarousel>
</template>
```

## API

### Method 1

Use the `@init-api` emit method on `<UiCarousel />` component to set the instance of the API.

::ShowCase

:DocsCarouselMethod1

#code

<!-- automd:file src="../../app/components/content/Docs/Carousel/DocsCarouselMethod1.vue" code lang="vue" -->

```vue [DocsCarouselMethod1.vue]
<template>
  <div class="flex flex-col items-center gap-5">
    <UiCarousel class="relative w-full max-w-xs" @init-api="setApi">
      <UiCarouselContent>
        <UiCarouselItem v-for="(_, index) in 5" :key="index" grab-cursor>
          <div class="p-1">
            <UiCard>
              <UiCardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-4xl font-semibold">{{ index + 1 }}</span>
              </UiCardContent>
            </UiCard>
          </div>
        </UiCarouselItem>
      </UiCarouselContent>
      <UiCarouselPrevious />
      <UiCarouselNext />
    </UiCarousel>

    <div class="py-2 text-center text-sm text-muted-foreground">
      Slide {{ current }} of {{ totalCount }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { CarouselApi } from "~/composables/useCarousel";

  const api = ref<CarouselApi>();
  const totalCount = ref(0);
  const current = ref(0);

  function setApi(val: CarouselApi) {
    api.value = val;
  }

  watchOnce(api, (api) => {
    if (!api) return;

    totalCount.value = api.scrollSnapList().length;
    current.value = api.selectedScrollSnap() + 1;

    api.on("select", () => {
      current.value = api.selectedScrollSnap() + 1;
    });
  });
</script>
```

<!-- /automd -->

::

### Method 2

You can access it through setting a template ref on the `<UiCarousel />` component.

```vue
<template>
  <UiCarousel ref="carouselContainerRef"> ... </UiCarousel>
</template>

<script setup lang="ts">
  import { UiCarousel } from "#components";

  const carouselContainerRef = ref<InstanceType<typeof UiCarousel> | null>(null);

  function accessApi() {
    carouselContainerRef.value?.carouselApi.on("select", () => {});
  }
</script>
```

## Events

You can listen to events using the API. To get the API instance use the `@init-api` emit method on the `<UiCarousel />` component

```vue
<template>
  <UiCarousel @init-api="setApi"> ... </UiCarousel>
</template>

<script setup lang="ts">
  import type { CarouselApi } from "~/utils/useCarousel";

  const api = ref<CarouselApi>();
  function setApi(val: CarouselApi) {
    api.value = val;
  }
  const stop = watch(api, (api) => {
    if (!api) return;
    // Watch only once or use watchOnce() in @vueuse/core
    nextTick(() => stop());
    api.on("select", () => {
      // Do something on select.
    });
  });
</script>
```

See the [Embla Carousel docs](https://www.embla-carousel.com/api/events/) for more information on using events.

## Slot Props

You can get the reactive slot props like `carouselRef, canScrollNext..Prev, scrollNext..Prev` using the `v-slot` directive in the `<UiCarousel v-slot="slotProps" />` component to extend the functionality.

```vue
<template>
  <UiCarousel v-slot="{ canScrollNext, canScrollPrev }">
    ...
    <UiCarouselPrevious v-if="canScrollPrev" />
    <UiCarouselNext v-if="canScrollNext" />
  </UiCarousel>
</template>
```

## Plugins

You can use the `plugins` prop to add plugins to the carousel.

```bash
npm i embla-carousel-autoplay
```

```vue
<template>
  <UiCarousel class="w-full max-w-xs" :plugins="[Autoplay({ delay: 2000 })]"> ... </UiCarousel>
</template>

<script setup lang="ts">
  import Autoplay from "embla-carousel-autoplay";
</script>
```

::ShowCase

:DocsCarouselPlugin

#code

<!-- automd:file src="../../app/components/content/Docs/Carousel/DocsCarouselPlugin.vue" code lang="vue" -->

```vue [DocsCarouselPlugin.vue]
<template>
  <div class="flex flex-col items-center gap-5">
    <UiCarousel
      class="relative w-full max-w-xs"
      :plugins="[plugin]"
      @mouseenter="plugin.stop"
      @mouseleave="[plugin.reset(), plugin.play(), console.log('Running')]"
    >
      <UiCarouselContent>
        <UiCarouselItem v-for="(_, index) in 5" :key="index" grab-cursor>
          <div class="p-1">
            <UiCard>
              <UiCardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-4xl font-semibold">{{ index + 1 }}</span>
              </UiCardContent>
            </UiCard>
          </div>
        </UiCarouselItem>
      </UiCarouselContent>
      <UiCarouselPrevious />
      <UiCarouselNext />
    </UiCarousel>
  </div>
</template>

<script lang="ts" setup>
  import Autoplay from "embla-carousel-autoplay";

  const plugin = Autoplay({
    delay: 2000,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
  });
</script>
```

<!-- /automd -->

::

See the [Embla Carousel docs](https://www.embla-carousel.com/api/plugins/) for more information on using plugins.
