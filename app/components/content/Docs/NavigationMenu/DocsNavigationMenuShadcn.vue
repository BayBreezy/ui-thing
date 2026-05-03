<template>
  <div>
    <DefineListItem v-slot="{ title, href, $slots }">
      <li>
        <UiNavigationMenuLink as-child>
          <NuxtLink :href>
            <div class="text-sm leading-none font-medium">{{ title }}</div>
            <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
              <component :is="$slots.default" />
            </p>
          </NuxtLink>
        </UiNavigationMenuLink>
      </li>
    </DefineListItem>

    <!-- Actual component example -->
    <UiNavigationMenu :viewport="false">
      <UiNavigationMenuList>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger>Home</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li class="row-span-3">
                <UiNavigationMenuLink as-child>
                  <a
                    class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div class="mt-4 mb-2 text-lg font-medium">shadcn/ui</div>
                    <p class="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </UiNavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger>Components</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <template v-for="item in components" :key="item.title">
                <ListItem :title="item.title" :href="item.href">
                  {{ item.description }}
                </ListItem>
              </template>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
            <NuxtLink href="/docs">Docs</NuxtLink>
          </UiNavigationMenuLink>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger>List</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid w-[300px] gap-4">
              <li>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#">
                    <div class="font-medium">Components</div>
                    <div class="text-muted-foreground">Browse all components in the library.</div>
                  </NuxtLink>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#">
                    <div class="font-medium">Documentation</div>
                    <div class="text-muted-foreground">Learn how to use the library.</div>
                  </NuxtLink>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#">
                    <div class="font-medium">Blog</div>
                    <div class="text-muted-foreground">Read our latest blog posts.</div>
                  </NuxtLink>
                </UiNavigationMenuLink>
              </li>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger>Simple</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid w-[200px] gap-4">
              <li>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#">Components</NuxtLink>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#">Documentation</NuxtLink>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#">Blocks</NuxtLink>
                </UiNavigationMenuLink>
              </li>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem>
          <UiNavigationMenuTrigger>With Icon</UiNavigationMenuTrigger>
          <UiNavigationMenuContent>
            <ul class="grid w-[200px] gap-4">
              <li>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#" class="flex-row items-center gap-2">
                    <Icon name="lucide:circle-help" />
                    Backlog
                  </NuxtLink>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#" class="flex-row items-center gap-2">
                    <Icon name="lucide:circle" />
                    To Do
                  </NuxtLink>
                </UiNavigationMenuLink>
                <UiNavigationMenuLink as-child>
                  <NuxtLink href="#" class="flex-row items-center gap-2">
                    <Icon name="lucide:circle-check" />
                    Done
                  </NuxtLink>
                </UiNavigationMenuLink>
              </li>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
      </UiNavigationMenuList>
    </UiNavigationMenu>
  </div>
</template>

<script lang="ts" setup>
  import { navigationMenuTriggerStyle } from "~/components/Ui/NavigationMenu/Trigger.vue";

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description: "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  const [DefineListItem, ListItem] = createReusableTemplate({
    props: {
      title: String,
      href: String,
    },
  });
</script>
