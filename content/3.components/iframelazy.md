---
title: Iframe (Lazy)
description: A lazy-loaded iframe component that loads content only when it comes into view, with customizable placeholder and intersection options.
links:
  - title: Intersection Observer API
    href: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    icon: "lucide:scroll-text"
  - title: VueUse
    href: https://vueuse.org/core/useIntersectionObserver/
    icon: "logos:vue"
---

## Source code

Click :SourceCodeLink{component="IframeLazy.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add iframe-lazy"}

## Usage

### Basic

The simplest way to use the component is by passing a `src` prop. The iframe will load only when it comes into view.

::ShowCase

:DocsIframeLazy

#code

```vue [DocsIframeLazy.vue]
<template>
  <div class="space-y-4">
    <p class="text-sm text-muted-foreground">Scroll down to load the iframe</p>
    <div class="h-[600px] w-full rounded-lg border">
      <UiIframeLazy src="https://ui.nuxt.com" class="h-full w-full rounded-lg" />
    </div>
  </div>
</template>
```

::

### Custom Placeholder

You can customize the placeholder shown before the iframe loads using the `#placeholder` slot.

::ShowCase

:DocsIframeLazyCustomPlaceholder

#code

```vue [DocsIframeLazyCustomPlaceholder.vue]
<template>
  <div class="space-y-4">
    <p class="text-sm text-muted-foreground">Scroll down to see custom placeholder</p>
    <div class="h-[500px] w-full rounded-lg border">
      <UiIframeLazy src="https://originui.com" class="h-full w-full rounded-lg">
        <template #placeholder>
          <div
            class="flex size-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5"
          >
            <div class="flex flex-col items-center gap-3">
              <Icon name="lucide:loader-2" class="size-8 animate-spin text-primary" />
              <p class="text-sm font-medium">Loading content...</p>
            </div>
          </div>
        </template>
      </UiIframeLazy>
    </div>
  </div>
</template>
```

::

### Eager Loading

Set `loading="eager"` to load the iframe immediately without waiting for intersection.

::ShowCase

:DocsIframeLazyEager

#code

```vue [DocsIframeLazyEager.vue]
<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <UiBadge variant="secondary">Eager Loading</UiBadge>
      <p class="text-sm text-muted-foreground">Loads immediately</p>
    </div>
    <div class="h-[400px] w-full rounded-lg border">
      <UiIframeLazy src="https://ui.shadcn.com" loading="eager" class="h-full w-full rounded-lg" />
    </div>
  </div>
</template>
```

::

### No Placeholder

Disable the placeholder by setting `placeholder` to `false`.

::ShowCase

:DocsIframeLazyNoPlaceholder

#code

```vue [DocsIframeLazyNoPlaceholder.vue]
<template>
  <div class="space-y-4">
    <p class="text-sm text-muted-foreground">No placeholder will be shown</p>
    <div class="h-[450px] w-full rounded-lg border">
      <UiIframeLazy
        src="https://reka-ui.com"
        :placeholder="false"
        class="h-full w-full rounded-lg"
      />
    </div>
  </div>
</template>
```

::

### With Load Event

Listen to the `@load` event to know when the iframe has finished loading.

::ShowCase

:DocsIframeLazyLoadEvent

#code

```vue [DocsIframeLazyLoadEvent.vue]
<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <UiBadge :variant="loaded ? 'default' : 'secondary'">
        {{ loaded ? "Loaded" : "Loading..." }}
      </UiBadge>
      <p class="text-sm text-muted-foreground">
        {{ loaded ? "Content is ready" : "Waiting for content" }}
      </p>
    </div>
    <div class="h-[400px] w-full rounded-lg border">
      <UiIframeLazy
        src="https://ui.nuxt.com/getting-started"
        class="h-full w-full rounded-lg"
        @load="handleLoad"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const loaded = ref(false);

  const handleLoad = (event: Event) => {
    loaded.value = true;
    console.log("Iframe loaded:", event);
  };
</script>
```

::

### Custom Root Margin

Adjust when the iframe loads by changing the `rootMargin`. Positive values trigger loading earlier, negative values later.

::ShowCase

:DocsIframeLazyRootMargin

#code

```vue [DocsIframeLazyRootMargin.vue]
<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <UiBadge variant="outline">Root Margin: 500px</UiBadge>
      <p class="text-sm text-muted-foreground">Loads 500px before entering viewport</p>
    </div>
    <div class="h-[400px] w-full rounded-lg border">
      <UiIframeLazy
        src="https://tailwindcss.com"
        root-margin="500px"
        class="h-full w-full rounded-lg"
      >
        <template #placeholder>
          <div class="flex size-full items-center justify-center bg-muted">
            <div class="flex flex-col items-center gap-2">
              <Icon name="lucide:clock" class="size-6 text-muted-foreground" />
              <p class="text-xs text-muted-foreground">Waiting to load...</p>
            </div>
          </div>
        </template>
      </UiIframeLazy>
    </div>
  </div>
</template>
```

::

### Multiple Iframes

Use multiple lazy-loaded iframes on the same page for better performance.

::ShowCase

:DocsIframeLazyMultiple

#code

```vue [DocsIframeLazyMultiple.vue]
<template>
  <div class="space-y-6">
    <p class="text-sm text-muted-foreground">
      Each iframe loads independently when scrolled into view
    </p>

    <div v-for="(site, index) in sites" :key="index" class="space-y-2">
      <div class="flex items-center gap-2">
        <UiBadge variant="outline">{{ site.name }}</UiBadge>
      </div>
      <div class="h-[350px] w-full rounded-lg border">
        <UiIframeLazy :src="site.url" class="h-full w-full rounded-lg">
          <template #placeholder>
            <div class="flex size-full items-center justify-center bg-muted/50">
              <div class="flex flex-col items-center gap-2">
                <Icon :name="site.icon" class="size-8 text-muted-foreground" />
                <p class="text-sm text-muted-foreground">Loading {{ site.name }}...</p>
              </div>
            </div>
          </template>
        </UiIframeLazy>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const sites = [
    {
      name: "Nuxt UI",
      url: "https://ui.nuxt.com",
      icon: "simple-icons:nuxtdotjs",
    },
    {
      name: "Origin UI",
      url: "https://originui.com",
      icon: "lucide:layout-template",
    },
    {
      name: "Reka UI",
      url: "https://reka-ui.com",
      icon: "lucide:layers",
    },
  ];
</script>
```

::

## Props

| Prop            | Type                 | Default     | Description                                                                    |
| --------------- | -------------------- | ----------- | ------------------------------------------------------------------------------ |
| `src`           | `string`             | `undefined` | The URL of the page to embed in the iframe                                     |
| `class`         | `string`             | `undefined` | Additional classes to apply to the wrapper element                             |
| `iframeClass`   | `string`             | `undefined` | Additional classes to apply to the iframe element                              |
| `loading`       | `"lazy" \| "eager"`  | `"lazy"`    | When to load the iframe - lazy waits for intersection, eager loads immediately |
| `placeholder`   | `boolean`            | `true`      | Whether to show a placeholder before the iframe loads                          |
| `rootMargin`    | `string`             | `"150px"`   | Margin around the root for intersection detection (e.g., "150px", "20%")       |
| `threshold`     | `number \| number[]` | `0`         | Threshold for intersection detection (0.0 to 1.0)                              |
| `disableScroll` | `boolean`            | `false`     | Disable scrolling within the iframe                                            |

## Events

| Event  | Payload | Description                              |
| ------ | ------- | ---------------------------------------- |
| `load` | `Event` | Emitted when the iframe finishes loading |

## Slots

| Slot          | Props | Description                                    |
| ------------- | ----- | ---------------------------------------------- |
| `placeholder` | -     | Custom content to show before the iframe loads |

## Features

- **Lazy Loading**: Iframes only load when they enter the viewport, improving page performance
- **Intersection Observer**: Uses modern browser API for efficient viewport detection
- **Custom Placeholders**: Show loading states, skeletons, or custom content while waiting
- **Flexible Configuration**: Control when loading triggers with `rootMargin` and `threshold`
- **Load Events**: React to iframe load completion with the `@load` event
- **Performance**: Reduces initial page load time and bandwidth usage
- **Accessible**: Maintains proper iframe attributes like `allowfullscreen`

## Use Cases

- Embedding third-party content (YouTube, maps, documentation)
- Loading multiple iframes on documentation pages
- Deferring heavy content until needed
- Improving Core Web Vitals scores
- Reducing initial page weight and load time
