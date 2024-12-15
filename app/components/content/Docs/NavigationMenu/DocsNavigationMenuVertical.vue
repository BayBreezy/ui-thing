<template>
  <div class="flex w-full items-center">
    <UiNavigationMenu default-value="1" orientation="vertical" class="w-full rounded-md border p-2">
      <UiNavigationMenuList class="w-[300px] max-w-none flex-col items-start gap-1 space-x-0">
        <UiNavigationMenuItem value="1" class="w-full">
          <UiNavigationMenuTrigger class="w-full justify-between" title="Beach day" />
          <UiNavigationMenuContent>
            <div class="grid w-[300px] gap-5 p-4">
              <!-- eslint-disable-next-line vue/html-self-closing -->
              <img
                src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                alt="Beach"
                class="h-[100px] w-full rounded-md object-cover"
              />
              <ul class="flex flex-col gap-2">
                <li
                  v-for="(item, i) in beachAmenities"
                  :key="i"
                  class="rounded-md p-3 text-sm hover:bg-muted"
                >
                  <p class="mb-1 font-semibold leading-none text-foreground">{{ item.title }}</p>
                  <p class="line-clamp-2 text-muted-foreground">{{ item.description }}</p>
                </li>
              </ul>
            </div>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem class="w-full">
          <UiNavigationMenuTrigger class="w-full justify-between" title="Components" />
          <UiNavigationMenuContent>
            <ul class="grid w-[300px] gap-3 p-2">
              <DocsNavigationMenuListItem
                v-for="item in components"
                :key="item.title"
                :title="item.title"
                :href="item.href"
              >
                {{ item.description }}
              </DocsNavigationMenuListItem>
            </ul>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem class="w-full">
          <UiNavigationMenuTrigger class="w-full justify-between" title="Learn more" />
          <UiNavigationMenuContent>
            <div class="grid w-[300px] grid-cols-1 place-items-center gap-5 p-3">
              <!-- eslint-disable-next-line vue/html-self-closing -->
              <img
                src="https://www.radix-vue.com/logo.svg"
                alt="Radix Vue Logo"
                class="h-[100px] w-[100px] rounded-md object-cover"
              />
              <div class="text-center">
                <p class="text-lg font-semibold text-foreground">Radix Vue</p>
                <p class="mt-2 text-muted-foreground">
                  Unstyled, accessible components for building high-quality design systems and web
                  apps in Vue.
                </p>
              </div>
            </div>
          </UiNavigationMenuContent>
        </UiNavigationMenuItem>
        <UiNavigationMenuItem class="w-full">
          <UiNavigationMenuLink as-child>
            <UiButton class="w-full justify-start" variant="ghost">Documentation</UiButton>
          </UiNavigationMenuLink>
        </UiNavigationMenuItem>
      </UiNavigationMenuList>
      <template #viewport>
        <div class="absolute -right-7 bottom-full flex justify-center">
          <UiNavigationMenuViewport
            class="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-[0.97] data-[state=open]:zoom-in-95 md:w-[var(--radix-navigation-menu-viewport-width)]"
          >
            <slot />
          </UiNavigationMenuViewport>
        </div>
      </template>
    </UiNavigationMenu>
  </div>
</template>

<script lang="ts" setup>
  const beachAmenities = [
    {
      title: "Sun",
      description: "The Sun is the star at the center of the Solar System.",
    },
    {
      title: "Sand",
      description:
        "Sand is a granular material composed of finely divided rock and mineral particles.",
    },
    {
      title: "Water",
      description:
        "Water is an inorganic, transparent, tasteless, odorless, and nearly colorless chemical substance.",
    },
  ];
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/components/alertdialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/components/hovercard",
      description: "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/components/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
  ];
</script>
