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

::ShowCase

:DocsNavbar

#code

<!-- automd:file src="../../app/components/content/Docs/Navbar/DocsNavbar.vue" code lang="vue" -->

```vue [DocsNavbar.vue]
<template>
  <div>
    <UiNavbar>
      <UiContainer class="flex h-14 items-center justify-between border border-b-0">
        <p class="font-semibold">UI Thing</p>
        <nav class="hidden items-center gap-5 sm:flex">
          <NuxtLink
            v-for="l in ['Home', 'About', 'Contact', 'Projects']"
            :key="l"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
            to="/"
            >{{ l }}</NuxtLink
          >
        </nav>
      </UiContainer>
    </UiNavbar>
  </div>
</template>
```

<!-- /automd -->

::
