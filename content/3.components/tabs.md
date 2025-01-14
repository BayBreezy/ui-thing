---
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/tabs.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/tabs.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Tabs"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add tabs
```

## Usage

### Basic example

::ShowCase

:DocsTabs

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs.vue" code lang="vue" -->

```vue [DocsTabs.vue]
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
                <UiLabel html-for="username">Username</UiLabel>
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
                <UiLabel html-for="current">Current password</UiLabel>
                <UiInput id="current" type="password" />
              </div>
              <div class="space-y-1">
                <UiLabel html-for="new">New password</UiLabel>
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

<!-- /automd -->

::

### With Indicator

Passing `:pill="false"` to the List and Trigger components will remove the background color from both components. This allows us to use the Indicator component to create a custom indicator.

::ShowCase

:DocsTabsIndicator

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabsIndicator.vue" code lang="vue" -->

```vue [DocsTabsIndicator.vue]
<template>
  <div class="flex w-full justify-center">
    <UiTabs class="w-[400px]" default-value="account">
      <UiTabsList :pill="false" class="relative grid w-full grid-cols-2">
        <UiTabsTrigger :pill="false" value="account">Account</UiTabsTrigger>
        <UiTabsTrigger :pill="false" value="password">Password</UiTabsTrigger>
        <UiTabsIndicator />
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
                <UiInput id="name" model-value="Pedro Duarte" />
              </div>
              <div class="space-y-1">
                <UiLabel html-for="username">Username</UiLabel>
                <UiInput id="username" model-value="@peduarte" />
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
                <UiLabel html-for="current">Current password</UiLabel>
                <UiInput id="current" type="password" />
              </div>
              <div class="space-y-1">
                <UiLabel html-for="new">New password</UiLabel>
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

<!-- /automd -->

::
