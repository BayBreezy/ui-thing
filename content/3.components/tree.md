---
title: Tree
description: A tree view widget displays a hierarchical list of items that can be expanded or collapsed to show or hide their child items, such as in a file system navigator.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/tree.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/tree.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Tree"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add tree
```

## Usage

### Basic

The `Tree` component can be styled to look like anything you want. For that reason, I decided to not style the tree component at all. Instead, I provide a basic example of how to use the tree component.

::ShowCase{component="DocsTree"}

#code

```vue [DocsTree.vue]
<template>
  <div class="flex justify-center">
    <UiScrollArea class="max-h-[500px] w-[250px] rounded-md border bg-background">
      <UiTree
        v-slot="{ flattenItems }"
        :default-expanded="['app', 'server']"
        multiple
        :items="structure"
        :get-key="(i) => i.title"
        class="p-2 pr-3"
      >
        <p class="mb-3 text-sm font-semibold">Nuxt 4 directory structure</p>
        <template v-for="item in flattenItems" :key="item._id">
          <TreeItem
            v-slot="{ isExpanded }"
            v-bind="item.bind"
            :style="{ 'padding-left': `${item.level - 0.5}rem` }"
            class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border"
          >
            <template v-if="item.hasChildren">
              <Icon v-if="isExpanded" :name="item.value.openIcon" class="size-3.5" />
              <Icon v-else :name="item.value.icon" class="size-3.5" />
            </template>
            <Icon v-else :name="item.value.icon || 'lucide:file'" class="size-3.5" />
            <div class="">{{ item.value.title }}</div>
          </TreeItem>
        </template>
      </UiTree>
    </UiScrollArea>
  </div>
</template>

<script lang="ts" setup>
  const structure = [
    {
      title: ".output",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [],
    },
    {
      title: ".nuxt",
      openIcon: "vscode-icons:folder-type-nuxt-opened",
      icon: "vscode-icons:folder-type-nuxt",
      children: [],
    },
    {
      title: "app",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [
        {
          title: "assets",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "css",
              openIcon: "vscode-icons:default-folder-opened",
              icon: "vscode-icons:default-folder",
              children: [
                {
                  title: "tailwind.css",
                  icon: "vscode-icons:file-type-css",
                },
              ],
            },
          ],
        },
        {
          title: "components",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [],
        },
        {
          title: "composables",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "useUser.ts",
              icon: "vscode-icons:file-type-typescript-official",
            },
          ],
        },
        {
          title: "layouts",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "default.vue",
              icon: "vscode-icons:file-type-vue",
            },
          ],
        },
        {
          title: "middleware",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "auth.ts",
              icon: "vscode-icons:file-type-typescript-official",
            },
          ],
        },
        {
          title: "pages",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "auth",
              openIcon: "vscode-icons:default-folder-opened",
              icon: "vscode-icons:default-folder",
              children: [
                {
                  title: "login",
                  openIcon: "vscode-icons:default-folder-opened",
                  icon: "vscode-icons:default-folder",
                  children: [
                    {
                      title: "index.vue",
                      icon: "vscode-icons:file-type-vue",
                    },
                  ],
                },
              ],
            },
            {
              title: "index.vue",
              icon: "vscode-icons:file-type-vue",
            },
          ],
        },
        {
          title: "plugins",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "fetch-user.ts",
              icon: "vscode-icons:file-type-typescript-official",
            },
          ],
        },
        {
          title: "utils",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "validation.ts",
              icon: "vscode-icons:file-type-typescript-official",
            },
          ],
        },
        {
          title: "app.config.ts",
          icon: "vscode-icons:file-type-typescript-official",
        },
        {
          title: "app.vue",
          icon: "vscode-icons:file-type-vue",
        },
        {
          title: "router.options.ts",
          icon: "vscode-icons:file-type-typescript-official",
        },
      ],
    },
    {
      title: "layers",
      openIcon: "vscode-icons:folder-type-nuxt-opened",
      icon: "vscode-icons:folder-type-nuxt",
      children: [],
    },
    {
      title: "modules",
      openIcon: "vscode-icons:folder-type-nuxt-opened",
      icon: "vscode-icons:folder-type-nuxt",
      children: [],
    },
    {
      title: "node_modules",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [],
    },
    {
      title: "public",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [],
    },
    {
      title: "server",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [
        {
          title: "api",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
        {
          title: "middleware",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
        {
          title: "plugins",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
        {
          title: "routes",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
        {
          title: "utils",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
      ],
    },
    {
      title: "nuxt.config.ts",
      icon: "vscode-icons:file-type-typescript-official",
    },
  ];
</script>
```

::

### Virtualizer

We can render a large number of items using the `Virtualizer` component.

Click on one of the items to see the details.

::ShowCase{component="DocsTreeVirtualizer"}

#code

```vue [DocsTreeVirtualizer.vue]
<template>
  <div class="flex justify-center">
    <UiScrollArea class="max-h-[500px] w-[250px] rounded-md border bg-background">
      <UiTree
        v-slot="{ flattenItems }"
        :default-expanded="['app', 'server']"
        multiple
        :items="structure"
        :get-key="(i) => i.title"
        class="p-2 pr-3"
      >
        <p class="mb-3 text-sm font-semibold">Nuxt 4 directory structure</p>
        <template v-for="item in flattenItems" :key="item._id">
          <TreeItem
            v-slot="{ isExpanded }"
            v-bind="item.bind"
            :style="{ 'padding-left': `${item.level - 0.5}rem` }"
            class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border"
          >
            <template v-if="item.hasChildren">
              <Icon v-if="isExpanded" :name="item.value.openIcon" class="size-3.5" />
              <Icon v-else :name="item.value.icon" class="size-3.5" />
            </template>
            <Icon v-else :name="item.value.icon || 'lucide:file'" class="size-3.5" />
            <div class="">{{ item.value.title }}</div>
          </TreeItem>
        </template>
      </UiTree>
    </UiScrollArea>
  </div>
</template>

<script lang="ts" setup>
  const structure = [
    {
      title: ".output",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [],
    },
    {
      title: ".nuxt",
      openIcon: "vscode-icons:folder-type-nuxt-opened",
      icon: "vscode-icons:folder-type-nuxt",
      children: [],
    },
    {
      title: "app",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [
        {
          title: "assets",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "css",
              openIcon: "vscode-icons:default-folder-opened",
              icon: "vscode-icons:default-folder",
              children: [
                {
                  title: "tailwind.css",
                  icon: "vscode-icons:file-type-css",
                },
              ],
            },
          ],
        },
        {
          title: "components",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [],
        },
        {
          title: "composables",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "useUser.ts",
              icon: "vscode-icons:file-type-typescript-official",
            },
          ],
        },
        {
          title: "layouts",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "default.vue",
              icon: "vscode-icons:file-type-vue",
            },
          ],
        },
        {
          title: "middleware",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "auth.ts",
              icon: "vscode-icons:file-type-typescript-official",
            },
          ],
        },
        {
          title: "pages",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "auth",
              openIcon: "vscode-icons:default-folder-opened",
              icon: "vscode-icons:default-folder",
              children: [
                {
                  title: "login",
                  openIcon: "vscode-icons:default-folder-opened",
                  icon: "vscode-icons:default-folder",
                  children: [
                    {
                      title: "index.vue",
                      icon: "vscode-icons:file-type-vue",
                    },
                  ],
                },
              ],
            },
            {
              title: "index.vue",
              icon: "vscode-icons:file-type-vue",
            },
          ],
        },
        {
          title: "plugins",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "fetch-user.ts",
              icon: "vscode-icons:file-type-typescript-official",
            },
          ],
        },
        {
          title: "utils",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "validation.ts",
              icon: "vscode-icons:file-type-typescript-official",
            },
          ],
        },
        {
          title: "app.config.ts",
          icon: "vscode-icons:file-type-typescript-official",
        },
        {
          title: "app.vue",
          icon: "vscode-icons:file-type-vue",
        },
        {
          title: "router.options.ts",
          icon: "vscode-icons:file-type-typescript-official",
        },
      ],
    },
    {
      title: "layers",
      openIcon: "vscode-icons:folder-type-nuxt-opened",
      icon: "vscode-icons:folder-type-nuxt",
      children: [],
    },
    {
      title: "modules",
      openIcon: "vscode-icons:folder-type-nuxt-opened",
      icon: "vscode-icons:folder-type-nuxt",
      children: [],
    },
    {
      title: "node_modules",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [],
    },
    {
      title: "public",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [],
    },
    {
      title: "server",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [
        {
          title: "api",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
        {
          title: "middleware",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
        {
          title: "plugins",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
        {
          title: "routes",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
        {
          title: "utils",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
      ],
    },
    {
      title: "nuxt.config.ts",
      icon: "vscode-icons:file-type-typescript-official",
    },
  ];
</script>
```

::
