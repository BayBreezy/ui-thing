---
title: Scrollspy
description: A component for tracking scroll position and updating active links.
label: "New"
---

## Source code

Click :SourceCodeLink{component="Scrollspy.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add scrollspy"}

## Usage

### Component

::ShowCase

:DocsScrollspy

#code

<!-- automd:file src="../../app/components/content/Docs/Scrollspy/DocsScrollspy.vue" code lang="vue" -->

```vue [DocsScrollspy.vue]
<template>
  <div class="flex grow gap-5">
    <div class="flex w-[150px] flex-col gap-2">
      <UiScrollspy :target="parentRef" class="sticky top-16 flex flex-col gap-2.5">
        <UiButton
          v-for="item in nav"
          :key="item.id"
          variant="outline"
          :data-scrollspy-anchor="item.id"
          class="data-[active=true]:bg-accent data-[active=true]:text-primary"
        >
          {{ item.label }}
        </UiButton>
      </UiScrollspy>
    </div>
    <div class="grow">
      <div ref="parentRef" class="-me-5 h-[300px] overflow-y-auto pe-5">
        <div class="space-y-8">
          <div v-for="item in nav" :id="item.id" :key="item.id" class="space-y-2.5">
            <h3 class="text-base text-foreground">{{ item.label }}</h3>
            <div class="h-[350px] rounded-lg bg-muted"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const parentRef = useTemplateRef("parentRef");
  const nav = [
    { id: useId(), label: "Section 1" },
    { id: useId(), label: "Section 2" },
    { id: useId(), label: "Section 3" },
    { id: useId(), label: "Section 4" },
    { id: useId(), label: "Section 5" },
  ];
</script>
```

<!-- /automd -->

::

### Composable

::ShowCase

:DocsScrollspyComposable

#code

<!-- automd:file src="../../app/components/content/Docs/Scrollspy/DocsScrollspyComposable.vue" code lang="vue" -->

```vue [DocsScrollspyComposable.vue]
<template>
  <div class="flex grow gap-5">
    <div class="flex w-[150px] flex-col gap-2">
      <nav ref="root" class="sticky top-16 flex flex-col gap-2.5">
        <UiButton
          v-for="item in nav"
          :key="item.id"
          variant="outline"
          :data-scrollspy-anchor="item.id"
          class="data-[active=true]:bg-accent data-[active=true]:text-primary"
        >
          {{ item.label }}
        </UiButton>
      </nav>
    </div>
    <div class="grow">
      <div ref="parentRef" class="-me-5 h-[300px] overflow-y-auto pe-5">
        <div class="space-y-8">
          <div v-for="item in nav" :id="item.id" :key="item.id" class="space-y-2.5">
            <h3 class="text-base text-foreground">{{ item.label }}</h3>
            <div class="h-[350px] rounded-lg bg-muted"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const parentRef = useTemplateRef("parentRef");
  const nav = [
    { id: useId(), label: "Section 1" },
    { id: useId(), label: "Section 2" },
    { id: useId(), label: "Section 3" },
    { id: useId(), label: "Section 4" },
    { id: useId(), label: "Section 5" },
  ];
  const { root } = useScrollspy({ target: parentRef, offset: 5 });
</script>
```

<!-- /automd -->

::

### Horizontal

::ShowCase

:DocsScrollspyHorizontal

#code

<!-- automd:file src="../../app/components/content/Docs/Scrollspy/DocsScrollspyHorizontal.vue" code lang="vue" -->

```vue [DocsScrollspyHorizontal.vue]
<template>
  <div class="space-y-5">
    <div class="flex w-full gap-2">
      <UiScrollspy :offset="10" :target="parentRef" class="flex gap-2.5">
        <UiButton
          v-for="item in nav"
          :key="item.id"
          variant="outline"
          :data-scrollspy-anchor="item.id"
          class="data-[active=true]:bg-accent data-[active=true]:text-primary"
        >
          {{ item.label }}
        </UiButton>
      </UiScrollspy>
    </div>
    <div class="w-full">
      <div ref="parentRef" class="-me-5 h-[500px] grow overflow-y-auto pe-5">
        <div class="space-y-8">
          <div v-for="item in nav" :id="item.id" :key="item.id" class="space-y-2.5">
            <h3 class="text-base text-foreground">{{ item.label }}</h3>
            <div class="h-[350px] rounded-lg bg-muted"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const parentRef = useTemplateRef("parentRef");

  const nav = [
    { id: "section-6", label: "Section 1" },
    { id: "section-7", label: "Section 2" },
    { id: "section-8", label: "Section 3" },
    { id: "section-9", label: "Section 4" },
    { id: "section-10", label: "Section 5" },
  ];
</script>
```

<!-- /automd -->

::
