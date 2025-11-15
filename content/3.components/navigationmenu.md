---
title: Navigation Menu
description: A collection of links for navigating websites.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/navigation-menu.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/navigation-menu.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="NavigationMenu"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add navigation-menu"}

## Anatomy

```vue
<template>
  <UiNavigationMenu>
    <UiNavigationMenuList>
      <UiNavigationMenuItem>
        <UiNavigationMenuTrigger />
        <UiNavigationMenuContent>
          <NavigationMenuLink />
        </UiNavigationMenuContent>
      </UiNavigationMenuItem>

      <UiNavigationMenuItem>
        <NavigationMenuLink />
      </UiNavigationMenuItem>

      <UiNavigationMenuItem>
        <UiNavigationMenuTrigger />
        <UiNavigationMenuContent>
          <UiNavigationMenuSub>
            <UiNavigationMenuList />
          </UiNavigationMenuSub>
        </UiNavigationMenuContent>
      </UiNavigationMenuItem>
    </UiNavigationMenuList>
  </UiNavigationMenu>
</template>
```

## Usage

### Horizontal Navigation Menu

The default orientation of the Navigation Menu is horizontal.

::ShowCase

:DocsNavigationMenu

#code

<!-- automd:file src="../../app/components/content/Docs/NavigationMenu/DocsNavigationMenu.vue" code lang="vue" -->

```vue [DocsNavigationMenu.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiNavigationMenu>
      <UiNavigationMenuList>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger title="Beach day" />
          <UiNavigationMenuContent>
            <div class="grid w-[600px] grid-cols-2 gap-5 p-4">
              <img
                src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                alt="Beach"
                class="h-full w-full rounded-md object-cover"
              />
              <ul class="flex flex-col gap-2">
                <li
                  v-for="(item, i) in beachAmenities"
                  :key="i"
                  class="rounded-md p-3 text-sm hover:bg-muted"
                >
                  <p class="mb-1 leading-none font-semibold text-foreground">{{ item.title }}</p>
                  <p class="line-clamp-2 text-muted-foreground">{{ item.description }}</p>
                </li>
              </ul>
            </div>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger title="Components" />
          <UiNavigationMenuContent>
            <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <DocsNavigationMenuListItem
                v-for="item in components"
                :key="item.title"
                :title="item.title"
                :href="item.href"
              >
                {{ item.description }}
              </DocsNavigationMenuListItem>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger title="Learn more" />
          <UiNavigationMenuContent>
            <div class="grid h-[300px] w-[500px] grid-cols-2 place-items-center gap-5 p-3">
              <img
                src="https://www.reka-ui.com/logo.svg"
                alt="Radix Vue Logo"
                class="h-full w-full"
              />
              <div>
                <p class="text-lg font-semibold text-foreground">Radix Vue</p>
                <p class="mt-2 text-muted-foreground">
                  Unstyled, accessible components for building high-quality design systems and web
                  apps in Vue.
                </p>
              </div>
            </div>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuLink as-child>
            <UiButton variant="ghost">Documentation</UiButton>
          </UiNavigationMenuLink>
        </UiNavigationMenuItem>
      </UiNavigationMenuList>
    </UiNavigationMenu>
  </div>
</template>

<script lang="ts" setup>
  const beachAmenities = [
    {
      title: "Sun",
      description: "The Sun is the star at the center of the Solar System.",
    },
    {
      title: "Sand",
      description:
        "Sand is a granular material composed of finely divided rock and mineral particles.",
    },
    {
      title: "Water",
      description:
        "Water is an inorganic, transparent, tasteless, odorless, and nearly colorless chemical substance.",
    },
  ];
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/components/alertdialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/components/hovercard",
      description: "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/components/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/components/scrollarea",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/components/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/components/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Shadcn UI

The default orientation of the Navigation Menu is horizontal.

::ShowCase

:DocsNavigationMenuShadcn

#code

<!-- automd:file src="../../app/components/content/Docs/NavigationMenu/DocsNavigationMenuShadcn.vue" code lang="vue" -->

```vue [DocsNavigationMenuShadcn.vue]
<template>
  <div>
    <DefineListItem v-slot="{ title, href, $slots }">
      <li>
        <UiNavigationMenuLink as-child>
          <NuxtLink :href>
            <div class="text-sm leading-none font-medium">{{ title }}</div>
            <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
              <component :is="$slots.default" />
            </p>
          </NuxtLink>
        </UiNavigationMenuLink>
      </li>
    </DefineListItem>

    <!-- Actual component example -->
    <UiNavigationMenu :viewport="false">
      <UiNavigationMenuList>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger>Home</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li class="row-span-3">
                <UiNavigationMenuLink as-child>
                  <a
                    class="flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div class="mt-4 mb-2 text-lg font-medium">shadcn/ui</div>
                    <p class="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </UiNavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger>Components</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <template v-for="item in components" :key="item.title">
                <ListItem :title="item.title" :href="item.href">
                  {{ item.description }}
                </ListItem>
              </template>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
            <NuxtLink href="/docs">Docs</NuxtLink>
          </UiNavigationMenuLink>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger>List</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid w-[300px] gap-4">
              <li>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#">
                    <div class="font-medium">Components</div>
                    <div class="text-muted-foreground">Browse all components in the library.</div>
                  </NuxtLink>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#">
                    <div class="font-medium">Documentation</div>
                    <div class="text-muted-foreground">Learn how to use the library.</div>
                  </NuxtLink>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#">
                    <div class="font-medium">Blog</div>
                    <div class="text-muted-foreground">Read our latest blog posts.</div>
                  </NuxtLink>
                </UiNavigationMenuLink>
              </li>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger>Simple</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid w-[200px] gap-4">
              <li>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#">Components</NuxtLink>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#">Documentation</NuxtLink>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#">Blocks</NuxtLink>
                </UiNavigationMenuLink>
              </li>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger>With Icon</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid w-[200px] gap-4">
              <li>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#" class="flex-row items-center gap-2">
                    <Icon name="lucide:circle-help" />
                    Backlog
                  </NuxtLink>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#" class="flex-row items-center gap-2">
                    <Icon name="lucide:circle" />
                    To Do
                  </NuxtLink>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#" class="flex-row items-center gap-2">
                    <Icon name="lucide:circle-check" />
                    Done
                  </NuxtLink>
                </UiNavigationMenuLink>
              </li>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
      </UiNavigationMenuList>
    </UiNavigationMenu>
  </div>
</template>

<script lang="ts" setup>
  import { navigationMenuTriggerStyle } from "~/components/Ui/NavigationMenu/Trigger.vue";

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description: "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  const [DefineListItem, ListItem] = createReusableTemplate({
    props: {
      title: String,
      href: String,
    },
  });
</script>
```

<!-- /automd -->

::
