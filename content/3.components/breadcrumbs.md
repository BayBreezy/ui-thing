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

::ShowCase

:DocsBreadcrumbs

#code

<!-- automd:file src="../../app/components/content/Docs/Breadcrumbs/DocsBreadcrumbs.vue" code lang="vue" -->

```vue [DocsBreadcrumbs.vue]
<template>
  <div>
    <UiBreadcrumbs class="justify-center" :items="crumbs" />
  </div>
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const crumbs: Crumbs[] = [
    {
      label: "Home",
      click: () => {
        console.log("clicked");
      },
    },
    { label: "Sales", link: "#" },
    {
      label: "Dashboard",
      link: "/examples/dashboard",
      icon: "heroicons:squares-plus",
      disabled: true,
    },
  ];
</script>
```

<!-- /automd -->

::

## Origin UI Examples

These are some examples that I found today over here [Origin UI](https://originui.com/breadcrumbs-paginations). I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### Dots Dropdown

::ShowCase

:DocsBreadcrumbsDotDropdown

#code

<!-- automd:file src="../../app/components/content/Docs/Breadcrumbs/DocsBreadcrumbsDotDropdown.vue" code lang="vue" -->

```vue [DocsBreadcrumbsDotDropdown.vue]
<template>
  <UiBreadcrumbs :items="items" class="justify-center">
    <template #dots>
      <UiDropdownMenu>
        <UiDropdownMenuTrigger
          class="flex items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <Icon name="lucide:ellipsis" class="size-4" />
          <span class="sr-only">Toggle menu</span>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="start">
          <UiDropdownMenuItem v-for="l in links" :key="l.label" as-child>
            <NuxtLink :to="l.to"><Icon :name="l.icon" class="size-4" /> {{ l.label }}</NuxtLink>
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </template>
  </UiBreadcrumbs>
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const items: Crumbs[] = [
    { label: "Home", link: "/" },
    { slot: "dots" },
    { label: "Components", link: "/components/accordion" },
    { label: "Breadcrumb" },
  ];

  const links = [
    { label: "Documentation", to: "#", icon: "lucide:book-open-text" },
    { label: "Themes", to: "#", icon: "lucide:paint-bucket" },
    { label: "GitHub", to: "#", icon: "lucide:github" },
  ];
</script>
```

<!-- /automd -->

::

### Icon Dropdown

::ShowCase

:DocsBreadcrumbsIconDropdown

#code

<!-- automd:file src="../../app/components/content/Docs/Breadcrumbs/DocsBreadcrumbsIconDropdown.vue" code lang="vue" -->

```vue [DocsBreadcrumbsIconDropdown.vue]
<template>
  <UiBreadcrumbs :items="items" class="justify-center">
    <template #folder>
      <UiDropdownMenu v-model:open="open">
        <UiDropdownMenuTrigger
          class="flex items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <Icon :name="open ? 'lucide:folder-open-dot' : 'lucide:folder'" class="size-4" />
          <span class="sr-only">Toggle folder</span>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="start">
          <UiDropdownMenuItem v-for="l in links" :key="l.label" as-child>
            <NuxtLink :to="l.to"><Icon :name="l.icon" class="size-4" /> {{ l.label }}</NuxtLink>
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </template>
  </UiBreadcrumbs>
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const open = ref(false);
  const items: Crumbs[] = [
    { label: "Home", link: "/" },
    { slot: "folder" },
    { label: "Breadcrumb" },
  ];

  const links = [
    { label: "Documentation", to: "#", icon: "lucide:book-open-text" },
    { label: "Themes", to: "#", icon: "lucide:paint-bucket" },
    { label: "GitHub", to: "#", icon: "lucide:github" },
  ];
</script>
```

<!-- /automd -->

::

### Icons

::ShowCase

:DocsBreadcrumbsIcons

#code

<!-- automd:file src="../../app/components/content/Docs/Breadcrumbs/DocsBreadcrumbsIcons.vue" code lang="vue" -->

```vue [DocsBreadcrumbsIcons.vue]
<template>
  <UiBreadcrumbs :items="items" class="justify-center" />
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const items: Crumbs[] = [
    { label: "Home", link: "/", icon: "lucide:home" },
    { label: "Components", link: "/", icon: "lucide:component" },
    { label: "Breadcrumb" },
  ];
</script>
```

<!-- /automd -->

::

### Separator

::ShowCase

:DocsBreadcrumbsSeparator

#code

<!-- automd:file src="../../app/components/content/Docs/Breadcrumbs/DocsBreadcrumbsSeparator.vue" code lang="vue" -->

```vue [DocsBreadcrumbsSeparator.vue]
<template>
  <div class="flex flex-col items-center gap-10">
    <UiBreadcrumbs separator="lucide:slash" :items="items" class="justify-center" />
    <UiBreadcrumbs separator="lucide:dot" :items="items" class="justify-center" />
  </div>
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const items: Crumbs[] = [
    { icon: "lucide:home" },
    { label: "Components", link: "/" },
    { label: "Breadcrumb" },
  ];
</script>
```

<!-- /automd -->

::

### Bordered

::ShowCase

:DocsBreadcrumbsBordered

#code

<!-- automd:file src="../../app/components/content/Docs/Breadcrumbs/DocsBreadcrumbsBordered.vue" code lang="vue" -->

```vue [DocsBreadcrumbsBordered.vue]
<template>
  <UiBreadcrumbs
    :items="items"
    class="mx-auto w-fit rounded-lg border border-border bg-background px-3 py-2 shadow-sm shadow-black/5"
  />
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const items: Crumbs[] = [
    { icon: "lucide:home" },
    { label: "Components", link: "/" },
    { label: "Breadcrumb" },
  ];
</script>
```

<!-- /automd -->

::

### Select

::ShowCase

:DocsBreadcrumbsSelect

#code

<!-- automd:file src="../../app/components/content/Docs/Breadcrumbs/DocsBreadcrumbsSelect.vue" code lang="vue" -->

```vue [DocsBreadcrumbsSelect.vue]
<template>
  <UiBreadcrumbs :items="items" class="justify-center">
    <template #select>
      <UiSelect default-value="s1">
        <UiSelectTrigger class="h-9 w-36" />
        <UiSelectContent>
          <UiSelectItem value="s1">Orion</UiSelectItem>
          <UiSelectItem value="s2">Sigma</UiSelectItem>
          <UiSelectItem value="s3">Dorado</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </template>
  </UiBreadcrumbs>
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const items: Crumbs[] = [{ label: "Databases" }, { slot: "select" }];
</script>
```

<!-- /automd -->

::
