---
title: Vue Tippy
description: VueTippy is a Vue 3 wrapper for the Tippy.js library, which allows you to use the tooltips as a Vue component and as a directive.
links:
  - title: Vue Tippy
    href: https://vue-tippy.netlify.app/
    icon: "lucide:message-square-dot"
  - title: API Reference
    href: https://vue-tippy.netlify.app/props
    icon: "icon-park-solid:api"
---

## Getting Started

<Steps>

<Step>

### Installation

Run the command below to install the Vue Tippy package.

```bash
npm install vue-tippy@v6
```

</Step>

<Step>

### Create Plugin

Create a plugin to add Vue Tippy globally to your Nuxt application.

Here I added some configurations to the plugin, like the default animation, delay, trigger, and touch.

Feel free to change these configurations to fit your needs.

<!-- automd:file src="../../app/plugins/tippy.ts" code lang="ts" -->

```ts [tippy.ts]
import VueTippy from "vue-tippy";
import type { TippyPluginOptions } from "vue-tippy";

import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/shift-toward.css";
import "tippy.js/animations/perspective.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy, {
    component: "Tippy",
    directive: "tippy",
    defaultProps: {
      animation: "shift-away",
      delay: [200, 100],
      trigger: "mouseenter",
      touch: ["hold", 500],
      arrow: false,
    },
  } satisfies TippyPluginOptions);
});
```

<!-- /automd -->

</Step>

<Step>

### Add CSS

Create a new CSS file and add the following code to it.

<!-- automd:file src="../../app/assets/css/tippy.css" code lang="css" -->

```css [tippy.css]
[data-tippy-root] {
  .tippy-box {
    @apply rounded-md bg-background px-2 py-1 text-foreground shadow ring-1 ring-border;
    .tippy-content {
      @apply text-[13px];
    }
  }

  .tippy-box[data-theme~="error"] {
    @apply bg-destructive text-destructive-foreground ring-destructive;
  }
}
```

<!-- /automd -->

</Step>

</Steps>

## Usage

There are three(3) ways in which you can use Vue Tippy:

### Directive

We can add the `v-tippy` directive to any element to show a tooltip.

The directive accepts a string with the content of the tooltip OR an object with the content and the options.

Check out the [Directive Docs](https://vue-tippy.netlify.app/flavor/directive) to learn more.

::ShowCase

:DocsTippyUsageDirective

#code

<!-- automd:file src="../../app/components/content/Docs/VueTippy/DocsTippyUsageDirective.vue" code lang="vue" -->

```vue [DocsTippyUsageDirective.vue]
<template>
  <div class="flex flex-col items-center gap-5">
    <UiButton v-tippy="'Hello 👋🏽'" variant="outline">String</UiButton>
    <UiButton v-tippy="objectOptions" variant="outline">Object</UiButton>
  </div>
</template>

<script lang="ts" setup>
  import type { TippyOptions } from "vue-tippy";

  const objectOptions: TippyOptions = {
    content: "Hello 👋🏽",
    placement: "bottom",
    arrow: true,
    hideOnClick: false,
  };
</script>
```

<!-- /automd -->

::

### Component

We can use the `<Tippy/>` component to show a tooltip.

You can visit the [Component Docs](https://vue-tippy.netlify.app/flavor/component) to see some more examples of how this component can be used.

::ShowCase

:DocsTippyUsageComponent

#code

<!-- automd:file src="../../app/components/content/Docs/VueTippy/DocsTippyUsageComponent.vue" code lang="vue" -->

```vue [DocsTippyUsageComponent.vue]
<template>
  <div class="flex flex-col items-center gap-5">
    <Tippy v-bind="options">
      <UiButton variant="outline">Hello World</UiButton>
    </Tippy>

    <Tippy max-width="320px" interactive :hide-on-click="false">
      <UiButton>Tip!</UiButton>
      <template #content="props">
        <div class="relative flex flex-col gap-1 px-2 py-3 text-sm">
          <UiButton
            variant="ghost"
            size="icon-xs"
            class="absolute right-0 top-2 size-5 p-1"
            @click="props.hide()"
          >
            <Icon class="size-3" name="lucide:x" />
          </UiButton>
          <p class="font-semibold">Building a Design System with Nuxt and Tailwind CSS</p>
          <p class="text-muted-foreground">
            Learn how to build a comprehensive design system using Tailwind CSS, including component
            architecture, and theme customization.
          </p>
          <div class="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
            8 min read <span>•</span> Updated 2 days ago
          </div>
        </div>
      </template>
    </Tippy>
  </div>
</template>

<script lang="ts" setup>
  import type { TippyOptions } from "vue-tippy";

  const options: TippyOptions = {
    content: "Hello World",
    placement: "top",
    interactive: true,
  };
</script>
```

<!-- /automd -->

::

#### Additional Props

Do note that these additional props can be added to the component

| Prop            | Type              | Default | Description           |
| --------------- | ----------------- | ------- | --------------------- |
| `tag`           | String            | "span"  | Trigger wrapper tag   |
| `content-tag`   | String            | "span"  | Content wrapper tag   |
| `content-class` | String            | null    | Content wrapper class |
| `to`            | Element or String | null    | Target selector       |

### Composition API

We can import nd use the `useTippy` composable to show a tooltip.

This is a low-level, flexible composition, ideal for building tooltips with complex interactions.

You can visit the [Composition API Docs](https://vue-tippy.netlify.app/flavor/composition-api) to see some more examples of how this composition can be used.

::ShowCase

:DocsTippyUsageComposition

#code

<!-- automd:file src="../../app/components/content/Docs/VueTippy/DocsTippyUsageComposition.vue" code lang="vue" -->

```vue [DocsTippyUsageComposition.vue]
<template>
  <div class="flex flex-col items-center gap-5">
    <div ref="container">
      <UiButton variant="outline">Hello World</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { DocsAlertSubData } from "#components";
  import { useTippy } from "vue-tippy";

  const container = ref();
  useTippy(container, {
    interactive: true,
    content: h(DocsAlertSubData, { class: tw`border-none p-2` }),
  });
</script>
```

<!-- /automd -->

::

## Vue Tippy Examples

Here are some examples taken from the [Vue Tippy](https://vue-tippy.netlify.app/) documentation.

### Follow Mouse

This example shows how to create a tooltip that follows the mouse.

::ShowCase

:DocsTippyFollowMouse

#code

<!-- automd:file src="../../app/components/content/Docs/VueTippy/DocsTippyFollowMouse.vue" code lang="vue" -->

```vue [DocsTippyFollowMouse.vue]
<template>
  <div>
    <div ref="container" class="!cursor-none">
      <ClientOnly>
        <UiPlaceholder class="h-[400px]"> {{ x }}, {{ y }} </UiPlaceholder>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useTippy } from "vue-tippy";

  const container = ref<HTMLElement>();
  const { x, y } = useMouseInElement(container, {
    resetOnTouchEnds: true,
    type: "client",
  });

  const { tippy } = useTippy(container, {
    content: computed(() => `(${x.value},${y.value})`),
    trigger: "mouseenter focus click",
    placement: "top",
    animation: false,
    hideOnClick: false,
    offset: [0, 30],
    arrow: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-sky-600 inline" viewBox="0 0 24 24"><path fill="currentColor" d="M7.407 2.486c-.917-.612-2.251.046-2.152 1.238l.029.347a86 86 0 0 0 2.79 15.693c.337 1.224 2.03 1.33 2.544.195l2.129-4.697c.203-.449.697-.737 1.234-.68l5.266.564c1.209.13 2.063-1.346 1.094-2.281A91 91 0 0 0 7.703 2.684z"/></svg>`,
    getReferenceClientRect: function () {
      return {
        width: 0,
        height: 0,
        top: y.value,
        right: x.value,
        bottom: y.value,
        left: x.value,
      };
    },
  });

  // Sticky alternative
  watch([x, y], () => tippy.value?.popperInstance?.update());
</script>
```

<!-- /automd -->

::

### Context Menu

This example shows how to create a context menu using Vue Tippy.

::ShowCase

:DocsTippyContextMenu

#code

<!-- automd:file src="../../app/components/content/Docs/VueTippy/DocsTippyContextMenu.vue" code lang="vue" -->

```vue [DocsTippyContextMenu.vue]
<template>
  <div>
    <div ref="container">
      <UiPlaceholder class="h-[400px]">
        <p>Right Click Anywhere</p>
      </UiPlaceholder>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useTippy } from "vue-tippy";

  const container = ref();
  const items = [
    { title: "Account", icon: "lucide:user", shortcut: "⌘A" },
    { title: "Settings", icon: "lucide:settings", shortcut: "⌘S" },
    { title: "Help", icon: "lucide:life-buoy", shortcut: "⌘H" },
    { title: "Sign out", icon: "lucide:log-out", shortcut: "⌘O" },
  ];
  const ContextMenuComponent = {
    render: () =>
      h("div", { class: `w-[200px]` }, [
        h("p", { class: `font-semibold text-sm pt-2 pb-4 px-1` }, "Context menu"),
        h(resolveComponent("UiDivider")),
        h(
          "ul",
          { class: tw`mt-1 flex w-full flex-col gap-0.5` },
          items.map((item) =>
            h(
              "li",
              {
                class: tw`flex w-full cursor-pointer items-center gap-2 rounded p-2 text-sm transition hover:bg-muted`,
                onClick: hide,
              },
              [
                h(resolveComponent("Icon"), {
                  name: item.icon,
                  size: 16,
                  class: tw`text-muted-foreground`,
                }),
                h("span", item.title),
                h("span", { class: tw`ml-auto text-xs text-muted-foreground` }, item.shortcut),
              ]
            )
          )
        ),
      ]),
  };

  const targetIsVisible = useElementVisibility(container, { threshold: 0.5 });

  const { setProps, show, hide } = useTippy(container, {
    content: ContextMenuComponent,
    placement: "right-start",
    trigger: "manual",
    interactive: true,
    arrow: false,
    offset: [0, 0],
  });

  useEventListener(container, "contextmenu", (event) => {
    event.preventDefault();

    setProps({
      getReferenceClientRect: () => ({
        width: 0,
        height: 0,
        top: event.clientY,
        bottom: event.clientY,
        left: event.clientX,
        right: event.clientX,
      }),
    });

    show();
  });

  useEventListener("scroll", () => {
    if (!targetIsVisible.value) {
      hide();
    }
  });
</script>
```

<!-- /automd -->

::

### Trigger Target

This example shows how to create a tooltip that is triggered by another element.

::ShowCase

:DocsTippyTargetEl

#code

<!-- automd:file src="../../app/components/content/Docs/VueTippy/DocsTippyTargetEl.vue" code lang="vue" -->

```vue [DocsTippyTargetEl.vue]
<template>
  <div class="flex flex-col items-center gap-20">
    <div ref="trigger">
      <UiButton variant="outline" size="sm">Hover Me</UiButton>
    </div>
    <p ref="target" class="text-sm font-medium">All the magic is here!</p>
  </div>
</template>

<script lang="ts" setup>
  import { useTippy } from "vue-tippy";

  const target = ref();
  const trigger = ref();

  useTippy(target, {
    interactive: true,
    triggerTarget: trigger,
    content: "Look at me, I'm a tippy!",
  });
</script>
```

<!-- /automd -->

::

## Origin UI Examples

These are some examples that I found today over here [Origin Ui](https://originui.com/tooltips). I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### Title

::ShowCase

:DocsTippyTitle

#code

<!-- automd:file src="../../app/components/content/Docs/VueTippy/DocsTippyTitle.vue" code lang="vue" -->

```vue [DocsTippyTitle.vue]
<template>
  <div class="flex flex-col items-center gap-20">
    <Tippy max-width="290px" interactive>
      <UiButton variant="outline">W/ Title</UiButton>
      <template #content>
        <div class="space-y-1 px-2 py-2">
          <p class="text-[13px] font-medium">Tooltip with title</p>
          <p class="text-xs text-muted-foreground">
            Tooltips are made to be highly customizable, with features like dynamic placement, rich
            content, and a robust API. You can even use them as a full-featured dropdown menu by
            setting the <code>trigger</code> prop to <code>click</code>.
          </p>
        </div>
      </template>
    </Tippy>
  </div>
</template>
```

<!-- /automd -->

::

### Icon

::ShowCase

:DocsTippyIcon

#code

<!-- automd:file src="../../app/components/content/Docs/VueTippy/DocsTippyIcon.vue" code lang="vue" -->

```vue [DocsTippyIcon.vue]
<template>
  <div class="flex flex-col items-center gap-20">
    <Tippy max-width="290px" interactive>
      <UiButton variant="outline">W/ Icon</UiButton>
      <template #content>
        <div class="flex gap-3 p-2">
          <Icon name="lucide:globe" class="mt-1 size-4 shrink-0 opacity-60" aria-hidden="true" />
          <div class="space-y-1">
            <p class="text-[13px] font-medium">Tooltip with title and icon</p>
            <p class="text-xs text-muted-foreground">
              Tooltips are made to be highly customizable, with features like dynamic placement,
              rich content, and a robust API.
            </p>
          </div>
        </div>
      </template>
    </Tippy>
  </div>
</template>
```

<!-- /automd -->

::

### Image

::ShowCase

:DocsTippyImage

#code

<!-- automd:file src="../../app/components/content/Docs/VueTippy/DocsTippyImage.vue" code lang="vue" -->

```vue [DocsTippyImage.vue]
<template>
  <div class="flex flex-col items-center gap-20">
    <Tippy max-width="290px" interactive>
      <UiButton variant="outline">W/ Image</UiButton>
      <template #content>
        <div class="space-y-2 p-2">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img
            class="h-[150px] w-full rounded"
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=50&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width="382"
            height="216"
            alt="Content image"
          />
          <div class="space-y-1">
            <p class="text-[13px] font-medium">Tooltip with title and icon</p>
            <p class="text-xs text-muted-foreground">
              Tooltips are made to be highly customizable, with features like dynamic placement,
              rich content, and a robust API.
            </p>
          </div>
        </div>
      </template>
    </Tippy>
  </div>
</template>
```

<!-- /automd -->

::

### Pan

::ShowCase

:DocsTippyPan

#code

<!-- automd:file src="../../app/components/content/Docs/VueTippy/DocsTippyPan.vue" code lang="vue" -->

```vue [DocsTippyPan.vue]
<template>
  <div class="flex flex-col items-center gap-20">
    <div class="inline-grid w-fit grid-cols-3 gap-1">
      <UiButton
        v-tippy.top="'Pan top'"
        class="col-start-2"
        variant="outline"
        size="icon"
        aria-label="Pan camera up"
      >
        <Icon name="lucide:chevron-up" size="16" aria-hidden="true" />
      </UiButton>
      <UiButton
        v-tippy.left="'Pan left'"
        class="col-start-1"
        variant="outline"
        size="icon"
        aria-label="Pan camera left"
      >
        <Icon name="lucide:chevron-left" size="16" aria-hidden="true" />
      </UiButton>
      <div class="flex items-center justify-center" aria-hidden="true">
        <Icon name="lucide:circle" size="20" class="opacity-60" />
      </div>
      <UiButton
        v-tippy.right="'Pan right'"
        variant="outline"
        size="icon"
        aria-label="Pan camera right"
      >
        <Icon name="lucide:chevron-right" size="16" aria-hidden="true" />
      </UiButton>
      <UiButton
        v-tippy.bottom="'Pan down'"
        class="col-start-2"
        variant="outline"
        size="icon"
        aria-label="Pan camera down"
      >
        <Icon name="lucide:chevron-down" size="16" aria-hidden="true" />
      </UiButton>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Stats

::ShowCase

:DocsTippyStats

#code

<!-- automd:file src="../../app/components/content/Docs/VueTippy/DocsTippyStats.vue" code lang="vue" -->

```vue [DocsTippyStats.vue]
<template>
  <div class="flex flex-col items-center gap-20">
    <Tippy max-width="290px" interactive>
      <UiButton variant="outline">Stats</UiButton>
      <template #content>
        <div class="space-y-2 p-2">
          <ul class="grid gap-3 text-xs">
            <li class="grid gap-0.5">
              <span class="text-muted-foreground">Status</span>
              <span class="font-medium">Completed</span>
            </li>
            <li class="grid gap-0.5">
              <span class="text-muted-foreground">Code Coverage</span>
              <span class="font-medium">94.3%</span>
            </li>
            <li class="grid gap-0.5">
              <span class="text-muted-foreground">Last Deploy</span>
              <span class="font-medium">Today at 15:42</span>
            </li>
            <li class="grid gap-0.5">
              <span class="text-muted-foreground">Performance Score</span>
              <span class="font-medium">98/100</span>
            </li>
          </ul>
        </div>
      </template>
    </Tippy>
  </div>
</template>
```

<!-- /automd -->

::

### Chart

::ShowCase

:DocsTippyChart

#code

<!-- automd:file src="../../app/components/content/Docs/VueTippy/DocsTippyChart.vue" code lang="vue" -->

```vue [DocsTippyChart.vue]
<template>
  <div class="flex flex-col items-center gap-20">
    <Tippy max-width="290px" interactive>
      <UiButton variant="outline">Chart</UiButton>
      <template #content>
        <div class="space-y-2 p-2">
          <div class="text-[13px] font-medium">Tuesday, Aug 13</div>
          <div class="flex items-center gap-2 text-xs">
            <span class="size-2 rounded-full bg-purple-500" />
            <span class="flex grow gap-2"> Sales <span class="ml-auto">$40</span> </span>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <span class="size-2 rounded-full bg-teal-500" />
            <span class="flex grow gap-2"> Revenue <span class="ml-auto">$74</span> </span>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <span class="size-2 rounded-full bg-blue-500" />
            <span class="flex grow gap-2"> Costs <span class="ml-auto">$410</span> </span>
          </div>
        </div>
      </template>
    </Tippy>
  </div>
</template>
```

<!-- /automd -->

::
