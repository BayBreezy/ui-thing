---
title: List
description: Lists are used to group together related pieces of information so they are clearly associated with each other and easy to read.
---

## Source code

Click :SourceCodeLink{component="List"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add list
```

## Usage

### Basic

::ShowCase

:DocsListBasic

#code

<!-- automd:file src="../../app/components/content/Docs/List/DocsListBasic.vue" code lang="vue" -->

```vue [DocsListBasic.vue]
<template>
  <div class="flex items-center justify-center">
    <UiList class="max-w-sm">
      <template v-for="n in 5" :key="n">
        <UiListItem class="items-start px-0">
          <UiAvatar :src="`https://avatar.vercel.sh/${n}`" />
          <UiListContent>
            <UiListTitle :title="`List item #${n}`" />
            <UiListSubtitle
              class="line-clamp-2"
              subtitle=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique ex praesentium
                libero commodi obcaecati eligendi hic, ducimus quos saepe harum voluptatem eos qui
                delectus molestias vero enim, magni id quas?"
            />
          </UiListContent>
          <UiButton
            size="icon-sm"
            variant="ghost"
            class="ml-auto shrink-0 self-center rounded-full"
          >
            <Icon name="lucide:chevron-right" />
          </UiButton>
        </UiListItem>
        <UiSeparator class="my-2.5 ml-auto w-[85%] last:hidden" />
      </template>
    </UiList>
  </div>
</template>
```

<!-- /automd -->

::

### Mini cart

::ShowCase

:DocsListProducts

#code

<!-- automd:file src="../../app/components/content/Docs/List/DocsListProducts.vue" code lang="vue" -->

```vue [DocsListProducts.vue]
<template>
  <div class="flex items-center justify-center">
    <UiList class="max-w-sm">
      <template v-for="n in cartItems" :key="n.product">
        <UiListItem class="items-start px-0">
          <UiAvatar :src="`https://avatar.vercel.sh/${n.product}`" />
          <UiListContent>
            <UiListTitle :title="n.product" />
            <UiListSubtitle>
              <p>Qty: {{ n.quantity }}</p>
            </UiListSubtitle>
          </UiListContent>
          <p class="ml-auto text-sm font-semibold">
            {{
              new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n.price)
            }}
          </p>
        </UiListItem>
        <UiSeparator class="my-2 ml-auto w-[85%] last:hidden" />
      </template>
    </UiList>
  </div>
</template>
<script lang="ts" setup>
  const cartItems = [
    { product: "Pencil", price: 2.0, quantity: 3 },
    { product: "Eraser", price: 1.0, quantity: 2 },
    { product: "Notebook", price: 5.0, quantity: 5 },
    { product: "Pen", price: 3.0, quantity: 6 },
    { product: "Ruler", price: 2.0, quantity: 1 },
  ];
</script>
```

<!-- /automd -->

::

### Navigation list

::ShowCase

:DocsListNav

#code

<!-- automd:file src="../../app/components/content/Docs/List/DocsListNav.vue" code lang="vue" -->

```vue [DocsListNav.vue]
<template>
  <div class="flex items-center justify-center">
    <UiList class="max-w-[250px] rounded-lg border bg-background">
      <template v-for="n in navList" :key="n.title">
        <UiListItem :to="n.link" class="">
          <Icon :name="n.icon" class="h-5 w-5 text-muted-foreground" />
          <UiListContent>
            <UiListTitle :title="n.title" class="text-sm font-medium" />
          </UiListContent>
          <span class="ml-auto shrink-0 self-center rounded-full text-muted-foreground/70">
            <Icon name="lucide:chevron-right" />
          </span>
        </UiListItem>
      </template>
    </UiList>
  </div>
</template>

<script lang="ts" setup>
  const navList = [
    { title: "Avatar", icon: "lucide:circle", link: "/components/avatar" },
    { title: "Card", icon: "lucide:square", link: "/components/card" },
    { title: "Checkbox", icon: "lucide:check-square", link: "/components/checkbox" },
    { title: "Dialog", icon: "lucide:square-asterisk", link: "/components/dialog" },
    { title: "Select", icon: "lucide:text-cursor-input", link: "/components/select" },
    { title: "Switch", icon: "lucide:toggle-left", link: "/components/switch" },
    { title: "Tooltip", icon: "lucide:message-circle", link: "/components/tooltip" },
  ];
</script>
```

<!-- /automd -->

::
