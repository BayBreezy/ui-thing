---
title: Splitter
description: A component that divides your layout into resizable sections.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/splitter.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/splitter.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Splitter"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add splitter
```

## Usage

### Basic

We can put the parts together to build a simple layout with a resizable sidebar.

::ShowCase

:DocsSplitterBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Splitter/DocsSplitterBasic.vue" code lang="vue" -->

```vue [DocsSplitterBasic.vue]
<template>
  <div class="flex items-center justify-center">
    <ClientOnly>
      <UiSplitter class="max-w-md rounded-lg border">
        <UiSplitterPanel :min-size="35" :default-size="50">
          <div class="flex h-[200px] items-center justify-center p-6">
            <span class="font-semibold">One</span>
          </div>
        </UiSplitterPanel>
        <UiSplitterHandle />
        <UiSplitterPanel :min-size="20" :default-size="50">
          <UiSplitter direction="vertical">
            <UiSplitterPanel>
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Two</span>
              </div>
            </UiSplitterPanel>
            <UiSplitterHandle />
            <UiSplitterPanel>
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Three</span>
              </div>
            </UiSplitterPanel>
          </UiSplitter>
        </UiSplitterPanel>
      </UiSplitter>
    </ClientOnly>
  </div>
</template>
```

<!-- /automd -->

::

### Handle

We can pass teh `withHandle` prop to the `UiSplitterHandle` component to show a handle.

We can even pass in a custom icon to display for the handle.

Do note that the handle will be rotated because of this class that is added to it `[&[data-orientation=vertical]>div]:rotate-90`.

::ShowCase

:DocsSplitterHandle

#code

<!-- automd:file src="../../app/components/content/Docs/Splitter/DocsSplitterHandle.vue" code lang="vue" -->

```vue [DocsSplitterHandle.vue]
<template>
  <div class="flex items-center justify-center">
    <ClientOnly>
      <UiSplitter class="max-w-md rounded-lg border">
        <UiSplitterPanel :min-size="35" :default-size="50">
          <div class="flex h-[200px] items-center justify-center p-6">
            <span class="font-semibold">One</span>
          </div>
        </UiSplitterPanel>
        <UiSplitterHandle with-handle />
        <UiSplitterPanel :min-size="20" :default-size="50">
          <UiSplitter direction="vertical">
            <UiSplitterPanel>
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Two</span>
              </div>
            </UiSplitterPanel>
            <UiSplitterHandle with-handle icon="lucide:circle-dashed" />
            <UiSplitterPanel>
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Three</span>
              </div>
            </UiSplitterPanel>
          </UiSplitter>
        </UiSplitterPanel>
      </UiSplitter>
    </ClientOnly>
  </div>
</template>
```

<!-- /automd -->

::

### Collapsible

We can use the `collapsible` prop to make the panels go down to the `collapsedSize` when the `minSize` is reached.

::ShowCase

:DocsSplitterCollapsible

#code

<!-- automd:file src="../../app/components/content/Docs/Splitter/DocsSplitterCollapsible.vue" code lang="vue" -->

```vue [DocsSplitterCollapsible.vue]
<template>
  <div class="flex items-center justify-center">
    <ClientOnly>
      <UiSplitter class="max-w-md rounded-lg border">
        <UiSplitterPanel collapsible :collapsed-size="10" :min-size="35" :default-size="50">
          <div class="flex h-[200px] items-center justify-center p-6">
            <span class="font-semibold">One</span>
          </div>
        </UiSplitterPanel>
        <UiSplitterHandle with-handle />
        <UiSplitterPanel :min-size="20" :default-size="50">
          <UiSplitter direction="vertical">
            <UiSplitterPanel>
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Two</span>
              </div>
            </UiSplitterPanel>
            <UiSplitterHandle with-handle />
            <UiSplitterPanel>
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Three</span>
              </div>
            </UiSplitterPanel>
          </UiSplitter>
        </UiSplitterPanel>
      </UiSplitter>
    </ClientOnly>
  </div>
</template>
```

<!-- /automd -->

::

### Persist Layout with SSR

We can use the `autoSaveId` prop to persist the layout data into the local storage.

Try changing the layout and then refresh the page to see the layout persist.

::ShowCase

:DocsSplitterPersist

#code

<!-- automd:file src="../../app/components/content/Docs/Splitter/DocsSplitterPersist.vue" code lang="vue" -->

```vue [DocsSplitterPersist.vue]
<template>
  <div class="flex items-center justify-center">
    <ClientOnly>
      <template #fallback>
        <UiSkeleton class="max-w-md rounded-lg" />
      </template>

      <UiSplitter auto-save-id="splitter-persist-1" class="max-w-md rounded-lg border">
        <UiSplitterPanel
          v-slot="{ isCollapsed }"
          collapsible
          :collapsed-size="10"
          :min-size="30"
          :default-size="40"
        >
          <div class="flex h-[200px] items-center justify-center p-6">
            <UiButton
              variant="outline"
              :size="isCollapsed ? 'icon-sm' : 'sm'"
              class="shrink-0 whitespace-nowrap"
              @click="$router.go(0)"
            >
              <span v-if="!isCollapsed">Reload page</span>
              <Icon v-else name="lucide:rotate-ccw" class="size-4" />
            </UiButton>
          </div>
        </UiSplitterPanel>
        <UiSplitterHandle />
        <UiSplitterPanel :min-size="20" :default-size="50">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Main</span>
          </div>
        </UiSplitterPanel>
      </UiSplitter>
    </ClientOnly>
  </div>
</template>
```

<!-- /automd -->

::
