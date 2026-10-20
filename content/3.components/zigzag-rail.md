---
title: Zigzag Rail
description: A rail that follows the nesting depth of a list of links and highlights the ones that are in view.
links:
  - title: Scrollspy
    href: /components/scrollspy
    icon: lucide:scroll-text
---

## Source code

Click :SourceCodeLink{component="ZigZagRail.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add zigzag-rail"}

## About

`UiZigZagRail` wraps a list of links and draws a thin line beside them. The line shifts sideways as the nesting depth changes, which gives the zigzag. This is the same rail used by the table of contents on this site.

It is built to pair with [Scrollspy](/components/scrollspy) in `mode="multiple"`: every link that has `data-active="true"` gets a highlighted section on the rail.

Each link that the rail should follow needs:

- a `data-depth` attribute with its nesting level (a missing value is treated as `0`)
- `data-active="true"` while active. `UiScrollspy` sets this for you on elements with `data-scrollspy-anchor`

The rail is decorative (`aria-hidden`) and does not change how the links behave for keyboards or screen readers.

The demos below set `:history="false"` on `UiScrollspy`. By default Scrollspy writes the active id into the URL hash, so only leave it on for the one spy that drives the page, such as a table of contents.

## Usage

::prose-show-case

:DocsZigZagRailDemo

#code

<!-- automd:file src="../../app/components/content/Docs/ZigZagRail/DocsZigZagRailDemo.vue" code lang="vue" -->

```vue [DocsZigZagRailDemo.vue]
<template>
  <div class="flex grow gap-8">
    <div class="w-[180px] shrink-0">
      <UiScrollspy
        :target="parentRef"
        mode="multiple"
        :offset="10"
        :history="false"
        class="sticky top-16"
      >
        <UiZigZagRail>
          <nav class="flex flex-col gap-2 text-sm">
            <button
              v-for="item in nav"
              :key="item.id"
              type="button"
              :data-scrollspy-anchor="item.id"
              :data-depth="item.depth"
              :style="{ marginInlineStart: `${(item.depth - 2) * 8}px` }"
              class="text-muted-foreground hover:text-primary data-[active=true]:text-primary line-clamp-1 text-start transition-colors"
            >
              {{ item.label }}
            </button>
          </nav>
        </UiZigZagRail>
      </UiScrollspy>
    </div>
    <div class="grow">
      <div ref="parentRef" class="-me-5 h-[300px] overflow-y-auto pe-5">
        <div class="space-y-8">
          <div v-for="item in nav" :id="item.id" :key="item.id" class="space-y-2.5">
            <h3 class="text-foreground text-base">{{ item.label }}</h3>
            <div class="bg-muted h-[160px] rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const parentRef = useTemplateRef("parentRef");
  const nav = [
    { id: useId(), label: "Introduction", depth: 2 },
    { id: useId(), label: "Installation", depth: 2 },
    { id: useId(), label: "Requirements", depth: 3 },
    { id: useId(), label: "Setup", depth: 3 },
    { id: useId(), label: "Usage", depth: 2 },
    { id: useId(), label: "Basic example", depth: 3 },
    { id: useId(), label: "With options", depth: 4 },
    { id: useId(), label: "API", depth: 2 },
  ];
</script>
```

<!-- /automd -->

::

### Dashed

Set `dashed` to render the track as a dashed line. The highlighted sections stay solid.

::prose-show-case

:DocsZigZagRailDashed

#code

<!-- automd:file src="../../app/components/content/Docs/ZigZagRail/DocsZigZagRailDashed.vue" code lang="vue" -->

```vue [DocsZigZagRailDashed.vue]
<template>
  <div class="flex grow gap-8">
    <div class="w-[180px] shrink-0">
      <UiScrollspy
        :target="parentRef"
        mode="multiple"
        :offset="10"
        :history="false"
        class="sticky top-16"
      >
        <UiZigZagRail dashed>
          <nav class="flex flex-col gap-2 text-sm">
            <button
              v-for="item in nav"
              :key="item.id"
              type="button"
              :data-scrollspy-anchor="item.id"
              :data-depth="item.depth"
              :style="{ marginInlineStart: `${(item.depth - 2) * 8}px` }"
              class="text-muted-foreground hover:text-primary data-[active=true]:text-primary line-clamp-1 text-start transition-colors"
            >
              {{ item.label }}
            </button>
          </nav>
        </UiZigZagRail>
      </UiScrollspy>
    </div>
    <div class="grow">
      <div ref="parentRef" class="-me-5 h-[300px] overflow-y-auto pe-5">
        <div class="space-y-8">
          <div v-for="item in nav" :id="item.id" :key="item.id" class="space-y-2.5">
            <h3 class="text-foreground text-base">{{ item.label }}</h3>
            <div class="bg-muted h-[160px] rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const parentRef = useTemplateRef("parentRef");
  const nav = [
    { id: useId(), label: "Overview", depth: 2 },
    { id: useId(), label: "Features", depth: 3 },
    { id: useId(), label: "Details", depth: 4 },
    { id: useId(), label: "Pricing", depth: 2 },
    { id: useId(), label: "FAQ", depth: 2 },
  ];
</script>
```

<!-- /automd -->

::

### Custom selector

By default the rail follows `[data-scrollspy-anchor]`. Use `selector` for any other set of links.

```vue
<UiZigZagRail selector='[data-toc-link="true"]'>
  <!-- links with data-toc-link, data-depth and data-active -->
</UiZigZagRail>
```

## Props

| Prop         | Type      | Default                    | Description                                                      |
| ------------ | --------- | -------------------------- | ---------------------------------------------------------------- |
| `selector`   | `string`  | `"[data-scrollspy-anchor]"` | CSS selector for the links the rail follows.                     |
| `dashed`     | `boolean` | `false`                    | Render the track as a dashed line.                               |
| `width`      | `number`  | `20`                       | Width of the rail in px.                                         |
| `curveSpan`  | `number`  | `8`                        | Vertical distance in px over which the line bends between depths. |
| `class`      | `string`  |                            | Custom class for the wrapper.                                    |

The component also exposes a `measure()` method that you can call if you change the links in a way the rail cannot observe.
