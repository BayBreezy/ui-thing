---
title: Breadcrumbs
description: Breadcrumbs are a great way to show hierarchy in a page.
---

## Source code

Click :SourceCodeLink{component="Breadcrumbs.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add breadcrumbs
```

## Usage

### Basic

::ShowCase{component="DocsBreadcrumbs"}

#code

```vue [DocsBreadcrumbs.vue]
<template>
  <div>
    <UIBreadcrumbs class="justify-center" :items="crumbs" />
  </div>
</template>

<script lang="ts" setup>
  import type { Crumbs } from "@/components/UI/Breadcrumbs.vue";

  const crumbs: Crumbs[] = [
    {
      label: "Home",
      click: () => {
        console.log("clicked");
      },
    },
    {
      label: "Sales",
      link: "#",
    },
    {
      label: "Dashboard",
      link: "/examples/dashboard",
      icon: "heroicons:squares-plus",
      disabled: true,
    },
  ];
</script>
```

::
