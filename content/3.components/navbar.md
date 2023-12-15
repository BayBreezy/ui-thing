---
title: Navbar
description: A navbar to use in your app. It is rendered as a header element by default but can be changed to a div with the as props.
---

## Source code

Click :SourceCodeLink{component="Navbar.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add navbar
```

## Usage

### Basic

::ShowCase{component="DocsNavbar"}

#code

```vue [DocsNavbar.vue]
<template>
  <div>
    <UiNavbar>
      <UiContainer class="flex h-14 items-center justify-between border border-b-0">
        <p class="font-semibold">UI Thing</p>
        <nav class="hidden items-center gap-5 sm:flex">
          <NuxtLink
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
            v-for="l in ['Home', 'About', 'Contact', 'Projects']"
            :key="l"
            to="/"
            >{{ l }}</NuxtLink
          >
        </nav>
      </UiContainer>
    </UiNavbar>
  </div>
</template>
```

::
