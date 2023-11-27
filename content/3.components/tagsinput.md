---
title: Tags Input
description: Tag inputs render tags inside an input, followed by an actual text input.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/tags-input.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/tags-input.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="TagsInput"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add tags-input
```

## Usage

### Basic example

::ShowCase{component="DocsTagsInput"}

#code

```vue [DocsTagsInput.vue]
<template>
  <div class="flex w-full justify-center">
    <UiTabs class="w-[400px]" default-value="account">
      <UiTabsList class="grid w-full grid-cols-2">
        <UiTabsTrigger value="account">Account</UiTabsTrigger>
        <UiTabsTrigger value="password">Password</UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent value="account">
        <UiCard
          title="Account"
          description="Make changes to your account here. Click save when you're done."
        >
          <template #content>
            <UiCardContent class="space-y-2">
              <div class="space-y-1">
                <UiLabel for="name">Name</UiLabel>
                <UiInput id="name" value="Pedro Duarte" />
              </div>
              <div class="space-y-1">
                <UiLabel htmlFor="username">Username</UiLabel>
                <UiInput id="username" value="@peduarte" />
              </div>
            </UiCardContent>
          </template>
          <template #footer>
            <UiCardFooter>
              <UiButton>Save changes</UiButton>
            </UiCardFooter>
          </template>
        </UiCard>
      </UiTabsContent>
      <UiTabsContent value="password">
        <UiCard
          title="Password"
          description="Change your password here. After saving, you'll be logged out."
        >
          <template #content>
            <UiCardContent class="space-y-2">
              <div class="space-y-1">
                <UiLabel htmlFor="current">Current password</UiLabel>
                <UiInput id="current" type="password" />
              </div>
              <div class="space-y-1">
                <UiLabel htmlFor="new">New password</UiLabel>
                <UiInput id="new" type="password" />
              </div>
            </UiCardContent>
          </template>
          <template #footer>
            <UiCardFooter>
              <UiButton>Save password</UiButton>
            </UiCardFooter>
          </template>
        </UiCard>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
```

::
