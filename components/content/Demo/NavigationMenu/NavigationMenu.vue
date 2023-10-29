<template>
  <div>
    <Heading
      title="Navigation Menu"
      subtext="A collection of links for navigating websites."
      radix-link="https://www.radix-vue.com/components/navigation-menu.html"
    />

    <UINavigationMenu>
      <UINavigationMenuList>
        <UINavigationMenuItem>
          <UINavigationMenuTrigger title="Beach day" />
          <UINavigationMenuContent>
            <div class="grid w-[600px] grid-cols-2 gap-5 p-4">
              <img
                src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                alt="Beach"
                class="h-full w-full rounded-md object-cover"
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
          </UINavigationMenuContent>
        </UINavigationMenuItem>
        <UINavigationMenuItem>
          <UINavigationMenuTrigger title="Components" />
          <UINavigationMenuContent>
            <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <DemoNavigationMenuListItem
                v-for="item in components"
                :key="item.title"
                :title="item.title"
                :href="item.href"
              >
                {{ item.description }}
              </DemoNavigationMenuListItem>
            </ul>
          </UINavigationMenuContent>
        </UINavigationMenuItem>
        <UINavigationMenuItem>
          <UINavigationMenuTrigger title="Learn more" />
          <UINavigationMenuContent>
            <div class="grid w-[500px] grid-cols-2 place-items-center gap-5 p-3">
              <img
                src="https://www.radix-vue.com/logo.svg"
                alt="Radix Vue Logo"
                class="h-full w-full"
              />
              <div>
                <p class="text-lg font-semibold text-foreground">Radix Vue</p>
                <p class="mt-2 text-muted-foreground">
                  Unstyled, accessible components for building high-quality design systems and web
                  apps in Vue.
                </p>
              </div>
            </div>
          </UINavigationMenuContent>
        </UINavigationMenuItem>
      </UINavigationMenuList>
    </UINavigationMenu>
  </div>
</template>

<script lang="ts" setup>
  const beachAmenities = [
    {
      title: "Beach",
      description:
        "A beach is a landform alongside a body of water which consists of loose particles.",
    },
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
</script>
