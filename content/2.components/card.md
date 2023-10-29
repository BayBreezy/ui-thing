---
title: Card
description: A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors, and powerful display options.
---

## Source code

Click :SourceCodeLink{component="Card"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add card
```

## Usage

::ShowCase{component="DocsCard"}

#code

```vue [DocsAspectRatio.vue]
<template>
  <div class="flex items-center justify-center">
    <form>
      <UICard
        class="w-[360px] max-w-sm"
        title="Create project"
        description="Deploy your new project in one-click."
      >
        <template #content>
          <UICardContent>
            <div class="grid w-full items-center gap-4">
              <div class="flex flex-col space-y-1.5">
                <UILabel for="name">Name</UILabel>
                <UIInput required id="name" placeholder="Name of your project" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <UILabel for="framework">Framework</UILabel>
                <UISelect required>
                  <UISelectTrigger id="framework" placeholder="Select" />
                  <UISelectContent>
                    <UISelectItem value="next">Next.js</UISelectItem>
                    <UISelectItem value="sveltekit">SvelteKit</UISelectItem>
                    <UISelectItem value="astro">Astro</UISelectItem>
                    <UISelectItem value="nuxt">Nuxt.js</UISelectItem>
                  </UISelectContent>
                </UISelect>
              </div>
            </div>
          </UICardContent>
        </template>
        <template #footer>
          <UICardFooter class="flex justify-between">
            <UIButton type="reset" variant="outline">Cancel</UIButton>
            <UIButton type="submit">Deploy</UIButton>
          </UICardFooter>
        </template>
      </UICard>
    </form>
  </div>
</template>

<script lang="ts" setup></script>
```

::

## Example

::ShowCase{component="DocsCardExample"}

#code

```vue [DocsCardExample.vue]
<template>
  <div class="flex items-center justify-center">
    <UICard
      class="w-[380px] max-w-sm"
      title="Notifications"
      description="You have 3 unread messages."
    >
      <template #content>
        <UICardContent>
          <div class="flex items-center gap-3 rounded-lg border p-3">
            <div class="shrink-0 self-start">
              <Icon name="lucide:bell" class="h-6 w-6" />
            </div>
            <UILabel for="push" class="flex flex-col text-sm">
              <p class="font-medium">Push Notifications</p>
              <p class="text-muted-foreground">Send notifications to device.</p>
            </UILabel>
            <div class="ml-auto">
              <UISwitch id="push" v-model:checked="push" />
            </div>
          </div>

          <ul class="mt-7 flex flex-col gap-6 pl-2">
            <li v-for="(item, i) in items" :key="i" class="flex items-start gap-4">
              <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500"></span>
              <div class="flex flex-col gap-px text-sm">
                <p class="font-medium leading-none">{{ item.text }}</p>
                <span class="text-muted-foreground">{{ item.time }}</span>
              </div>
            </li>
          </ul>
        </UICardContent>
      </template>

      <template #footer>
        <UICardFooter>
          <UIButton class="w-full"> <Icon name="lucide:check" /> Mark all as read </UIButton>
        </UICardFooter>
      </template>
    </UICard>
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

::
