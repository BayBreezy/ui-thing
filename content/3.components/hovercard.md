---
title: Hover Card
description: For sighted users to preview content available behind a link.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/hover-card.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/hover-card.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="HoverCard"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add hover-card"}

## Usage

### Basic

::prose-show-case

:DocsHoverCard

#code

<!-- automd:file src="../../app/components/content/Docs/HoverCard/DocsHoverCard.vue" code lang="vue" -->

```vue [DocsHoverCard.vue]
<template>
  <div class="flex items-center justify-center">
    <UiHoverCard>
      <UiHoverCardTrigger as-child>
        <div
          class="bg-background flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border shadow-xs"
        >
          <Icon name="logos:nuxt-icon" class="h-8 w-8" />
        </div>
      </UiHoverCardTrigger>
      <UiHoverCardContent class="h-[460px] w-80 overflow-hidden rounded-lg p-0">
        <div class="group relative flex h-full w-full flex-col justify-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div class="absolute inset-0 h-full w-full bg-black opacity-50" />
          <div
            class="relative h-[40%] w-full rounded-t-2xl bg-white p-4 text-slate-800 transition-all group-hover:h-[50%]"
          >
            <p class="text-lg leading-none font-semibold">John Doe</p>
            <small class="text-sm opacity-70"
              >Software Engineer @<a
                target="_blank"
                class="underline underline-offset-2"
                href="https://nuxt.com"
                >nuxtjs</a
              ></small
            >
            <p class="mt-2 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima non, aut ab inventore
              quod pariatur iste.
            </p>

            <div class="mt-5 hidden transition-all group-hover:block">
              <UiButton class="dark:bg-primary-foreground dark:text-primary w-full"
                >View profile</UiButton
              >
            </div>
          </div>
        </div>
      </UiHoverCardContent>
    </UiHoverCard>
  </div>
</template>
```

<!-- /automd -->

::

### Vue

::prose-show-case

:DocsHoverCardVue

#code

<!-- automd:file src="../../app/components/content/Docs/HoverCard/DocsHoverCardVue.vue" code lang="vue" -->

```vue [DocsHoverCardVue.vue]
<template>
  <div class="flex items-center justify-center">
    <UiHoverCard>
      <UiHoverCardTrigger as-child>
        <UiButton variant="link"> @vuejs </UiButton>
      </UiHoverCardTrigger>
      <UiHoverCardContent class="w-80">
        <div class="flex justify-between space-x-4">
          <UiAvatar class="ring-muted ring-1">
            <UiAvatarImage src="https://github.com/vuejs.png" />
            <UiAvatarFallback>VC</UiAvatarFallback>
          </UiAvatar>
          <div class="space-y-1">
            <h4 class="text-sm font-semibold">@vuejs</h4>
            <p class="text-sm">
              Progressive JavaScript framework for building modern web interfaces.
            </p>
            <div class="flex items-center pt-2">
              <Icon name="lucide:calendar-days" class="mr-2 size-4 opacity-70" />
              <span class="text-muted-foreground text-xs"> Joined January 2014 </span>
            </div>
          </div>
        </div>
      </UiHoverCardContent>
    </UiHoverCard>
  </div>
</template>
```

<!-- /automd -->

::
