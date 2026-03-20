---
title: Card
description: A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors, and powerful display options.
---

## Source code

Click :SourceCodeLink{component="Card"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add card"}

## Usage

::ShowCase

:DocsCard

#code

<!-- automd:file src="../../app/components/content/Docs/Card/DocsCard.vue" code lang="vue" -->

```vue [DocsCard.vue]
<template>
  <div class="flex items-center justify-center">
    <form>
      <UiCard class="w-[380px] max-w-sm">
        <UiCardHeader>
          <UiCardTitle>Create account</UiCardTitle>
          <UiCardAction>
            <UiButton variant="ghost" size="sm" as-child class="-mr-2">
              <NuxtLink to="#">Log in</NuxtLink>
            </UiButton>
          </UiCardAction>
          <UiCardDescription>Enter your details below to create your account.</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="grid w-full items-center gap-4">
            <UiVeeInput name="name" label="Name" required />
            <UiVeeInput
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <UiVeeInput name="password" label="Password" type="password" required />
            <div class="flex items-start gap-2 pt-1 text-sm">
              <UiVeeCheckbox class="gap-2" label="I agree to the terms and privacy policy." />
            </div>
          </div>
        </UiCardContent>

        <UiCardFooter class="flex-col gap-4">
          <UiButton class="w-full" effect="ringHover" type="submit">Create account</UiButton>
          <UiDivider><span class="text-sm text-muted-foreground">or</span></UiDivider>
          <UiButton variant="outline" class="w-full">
            <Icon name="logos:google-icon" />
            <span>Continue with Google</span>
          </UiButton>
        </UiCardFooter>
      </UiCard>
    </form>
  </div>
</template>
```

<!-- /automd -->

::

## Example

::ShowCase

:DocsCardExample

#code

<!-- automd:file src="../../app/components/content/Docs/Card/DocsCardExample.vue" code lang="vue" -->

```vue [DocsCardExample.vue]
<template>
  <div class="flex items-center justify-center">
    <UiCard
      class="w-[380px] max-w-sm"
      title="Notifications"
      description="You have 3 unread messages."
    >
      <template #content>
        <UiCardContent>
          <div class="flex items-center gap-3 rounded-lg border p-3">
            <Icon name="lucide:bell" class="-mt-3 size-5 shrink-0" />
            <UiLabel for="push" class="flex flex-col items-start text-sm">
              <p class="text-sm font-semibold">Push Notifications</p>
              <p class="text-muted-foreground">Send notifications to device.</p>
            </UiLabel>
            <div class="ml-auto">
              <UiSwitch id="push" v-model="push" />
            </div>
          </div>

          <ul class="mt-7 flex flex-col gap-6 pl-2">
            <li v-for="(item, i) in items" :key="i" class="flex items-start gap-4">
              <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
              <div class="flex flex-col gap-px text-sm">
                <p class="leading-none font-medium">{{ item.text }}</p>
                <span class="text-muted-foreground">{{ item.time }}</span>
              </div>
            </li>
          </ul>
        </UiCardContent>
      </template>

      <template #footer>
        <UiCardFooter>
          <UiButton
            class="w-full"
            @click="useSonner.success('Updated', { description: 'All items were marked as read.' })"
          >
            <Icon name="lucide:check" /> Mark all as read
          </UiButton>
        </UiCardFooter>
      </template>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  const push = ref(false);

  const items = [
    { text: "Your call has been confirmed.", time: "2m ago" },
    { text: "You have a new message.", time: "1h ago" },
    { text: "Your order has been shipped.", time: "2h ago" },
  ];
</script>
```

<!-- /automd -->

::
