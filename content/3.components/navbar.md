---
title: Navbar
description: A navbar to use in your app. It is rendered as a header element by default but can be changed to a div with the as props.
---

## Source code

Click :SourceCodeLink{component="Navbar.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add navbar"}

## Usage

### Basic

::ShowCase

:DocsNavbar

#code

<!-- automd:file src="../../app/components/content/Docs/Navbar/DocsNavbar.vue" code lang="vue" -->

```vue [DocsNavbar.vue]
<template>
  <div>
    <UiNavbar>
      <UiContainer class="flex h-14 items-center justify-between border border-b-0">
        <p class="font-semibold">UI Thing</p>
        <nav class="hidden items-center gap-5 sm:flex">
          <NuxtLink
            v-for="l in ['Home', 'About', 'Contact', 'Projects']"
            :key="l"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
            to="/"
            >{{ l }}</NuxtLink
          >
        </nav>
      </UiContainer>
    </UiNavbar>
  </div>
</template>
```

<!-- /automd -->

::

## Origin UI

### One

::ShowCase

:DocsOriginNavbar1

#code

<!-- automd:file src="../../app/components/content/Docs/Navbar/DocsOriginNavbar1.vue" code lang="vue" -->

```vue [DocsOriginNavbar1.vue]
<template>
  <header class="border-b px-4">
    <div class="flex h-16 items-center justify-between gap-4">
      <!-- Left side -->
      <div class="flex items-center gap-2">
        <!-- Mobile menu trigger  -->
        <UiPopover>
          <UiPopoverTrigger as-child>
            <UiButton class="group size-8 md:hidden" variant="ghost" size="icon">
              <svg
                class="pointer-events-none"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L20 12"
                  class="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                />
                <path
                  d="M4 12H20"
                  class="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                />
                <path
                  d="M4 12H20"
                  class="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                />
              </svg>
            </UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent align="start" class="w-36 p-1 md:hidden">
            <UiNavigationMenu class="max-w-none *:w-full">
              <UiNavigationMenuList class="flex-col items-start gap-0 md:gap-2">
                <UiNavigationMenuItem
                  v-for="(link, index) in navigationLinks"
                  :key="index"
                  class="w-full"
                >
                  <UiNavigationMenuLink :href="link.href" class="py-1.5" :active="link.active">
                    {{ link.label }}
                  </UiNavigationMenuLink>
                </UiNavigationMenuItem>
              </UiNavigationMenuList>
            </UiNavigationMenu>
          </UiPopoverContent>
        </UiPopover>
        <!-- Main nav -->
        <div class="flex items-center gap-6">
          <a href="#" class="text-primary hover:text-primary/90">
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor">
              <path
                d="M20.46 1.766 17.303.923l-2.66 9.896-2.403-8.934-3.157.843 2.595 9.652-6.464-6.442-2.311 2.304 7.09 7.066-8.83-2.358-.846 3.146 9.648 2.577a6.516 6.516 0 0 1-.169-1.478c0-3.598 2.927-6.515 6.537-6.515s6.537 2.917 6.537 6.515c0 .505-.057.997-.167 1.468l8.768 2.342.846-3.147-9.686-2.586 8.83-2.358-.845-3.147-9.686 2.587 6.464-6.442-2.311-2.304-6.992 6.969 2.369-8.81Z"
              />
              <path
                d="M22.695 18.7a6.495 6.495 0 0 1-1.626 2.986l6.352 6.33 2.31-2.303-7.036-7.013ZM21.005 21.752a6.538 6.538 0 0 1-2.922 1.722l2.312 8.596 3.157-.843-2.547-9.475ZM17.965 23.505a6.569 6.569 0 0 1-1.632.205 6.566 6.566 0 0 1-1.743-.235l-2.314 8.605 3.157.843 2.532-9.418ZM14.478 23.444a6.54 6.54 0 0 1-2.87-1.747l-6.367 6.346 2.31 2.303 6.927-6.902ZM11.555 21.64a6.492 6.492 0 0 1-1.585-2.948L1.173 21.04l.846 3.146 9.536-2.546Z"
              />
            </svg>
          </a>
          <!-- Navigation menu  -->
          <UiNavigationMenu class="max-md:hidden">
            <UiNavigationMenuList class="gap-2">
              <UiNavigationMenuItem v-for="(link, index) in navigationLinks" :key="index">
                <UiNavigationMenuLink
                  :active="link.active"
                  :href="link.href"
                  class="py-1.5 font-medium text-muted-foreground hover:text-primary"
                >
                  {{ link.label }}
                </UiNavigationMenuLink>
              </UiNavigationMenuItem>
            </UiNavigationMenuList>
          </UiNavigationMenu>
        </div>
      </div>
      <!-- Right side -->
      <div class="flex items-center gap-2">
        <UiButton as-child variant="ghost" size="sm" class="text-sm">
          <NuxtLink href="#">Sign In</NuxtLink>
        </UiButton>
        <UiButton as-child size="sm" class="text-sm">
          <NuxtLink href="#">Get Started</NuxtLink>
        </UiButton>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
  // Navigation links array to be used in both desktop and mobile menus
  const navigationLinks = [
    { href: "#", label: "Home", active: true },
    { href: "#", label: "Features" },
    { href: "#", label: "Pricing" },
  ];
</script>
```

<!-- /automd -->

::

### Two

::ShowCase

:DocsOriginNavbar2

#code

<!-- automd:file src="../../app/components/content/Docs/Navbar/DocsOriginNavbar2.vue" code lang="vue" -->

```vue [DocsOriginNavbar2.vue]
<template>
  <header class="@container border-b px-4 md:px-6">
    <div class="flex h-16 items-center justify-between gap-4">
      <!--Left side -->
      <div class="flex items-center gap-2">
        <!--Mobile menu trigger -->
        <UiPopover>
          <UiPopoverTrigger as-child>
            <UiButton class="group size-8 @[450px]:hidden" variant="ghost" size="icon">
              <svg
                class="pointer-events-none"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L20 12"
                  class="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                />
                <path
                  d="M4 12H20"
                  class="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                />
                <path
                  d="M4 12H20"
                  class="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                />
              </svg>
            </UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent align="start" class="w-64 p-1 @[450px]:hidden">
            <UiNavigationMenu class="max-w-none *:w-full">
              <UiNavigationMenuList class="flex-col items-start gap-0 md:gap-2">
                <UiNavigationMenuItem
                  v-for="(link, index) in navigationLinks"
                  :key="index"
                  class="w-full"
                >
                  <template v-if="link.submenu">
                    <div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                      {{ link.label }}
                    </div>
                    <ul>
                      <li v-for="(item, itemIndex) in link.items" :key="itemIndex">
                        <UiNavigationMenuLink :href="item.href" class="py-1.5">
                          {{ item.label }}
                        </UiNavigationMenuLink>
                      </li>
                    </ul>
                  </template>
                  <template v-else>
                    <UiNavigationMenuLink :href="link.href" class="py-1.5">
                      {{ link.label }}
                    </UiNavigationMenuLink>
                  </template>
                  <template v-if="index < navigationLinks.length - 1">
                    <template
                      v-if="
                        (!link.submenu && navigationLinks?.[index + 1]?.submenu) ||
                        (link.submenu && !navigationLinks?.[index + 1]?.submenu) ||
                        (link.submenu &&
                          navigationLinks[index + 1]?.submenu &&
                          link.type !== navigationLinks[index + 1]?.type)
                      "
                    >
                      <div
                        role="separator"
                        aria-orientation="horizontal"
                        class="-mx-1 my-1 h-px w-full bg-border"
                      />
                    </template>
                  </template>
                </UiNavigationMenuItem>
              </UiNavigationMenuList>
            </UiNavigationMenu>
          </UiPopoverContent>
        </UiPopover>
        <!--Main nav -->
        <div class="flex items-center gap-6">
          <NuxtLink href="#" class="text-primary hover:text-primary/90">
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor">
              <path
                d="M20.46 1.766 17.303.923l-2.66 9.896-2.403-8.934-3.157.843 2.595 9.652-6.464-6.442-2.311 2.304 7.09 7.066-8.83-2.358-.846 3.146 9.648 2.577a6.516 6.516 0 0 1-.169-1.478c0-3.598 2.927-6.515 6.537-6.515s6.537 2.917 6.537 6.515c0 .505-.057.997-.167 1.468l8.768 2.342.846-3.147-9.686-2.586 8.83-2.358-.845-3.147-9.686 2.587 6.464-6.442-2.311-2.304-6.992 6.969 2.369-8.81Z"
              />
              <path
                d="M22.695 18.7a6.495 6.495 0 0 1-1.626 2.986l6.352 6.33 2.31-2.303-7.036-7.013ZM21.005 21.752a6.538 6.538 0 0 1-2.922 1.722l2.312 8.596 3.157-.843-2.547-9.475ZM17.965 23.505a6.569 6.569 0 0 1-1.632.205 6.566 6.566 0 0 1-1.743-.235l-2.314 8.605 3.157.843 2.532-9.418ZM14.478 23.444a6.54 6.54 0 0 1-2.87-1.747l-6.367 6.346 2.31 2.303 6.927-6.902ZM11.555 21.64a6.492 6.492 0 0 1-1.585-2.948L1.173 21.04l.846 3.146 9.536-2.546Z"
              />
            </svg>
          </NuxtLink>
          <!--Navigation menu -->
          <UiNavigationMenu :viewport="false" class="@max-[450px]:hidden">
            <UiNavigationMenuList class="gap-2">
              <UiNavigationMenuItem v-for="(link, index) in navigationLinks" :key="index">
                <!--Check if link has a submenu -->
                <template v-if="link.submenu">
                  <UiNavigationMenuTrigger
                    class="bg-transparent px-2 py-1.5 font-medium text-muted-foreground hover:text-primary *:[svg]:-me-0.5 *:[svg]:size-3.5"
                  >
                    {{ link.label }}
                  </UiNavigationMenuTrigger>
                  <UiNavigationMenuContent
                    class="z-50 p-1 data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16!"
                  >
                    <ul :class="link.type === 'description' ? 'min-w-64' : 'min-w-48'">
                      <li v-for="(item, itemIndex) in link.items" :key="itemIndex">
                        <UiNavigationMenuLink :href="item.href" class="py-1.5">
                          <!--Display icon if present -->
                          <div class="flex items-center gap-2">
                            <template v-if="link.type == 'icon' && 'icon' in item">
                              <Icon
                                v-if="item.icon"
                                :name="item.icon"
                                class="size-4 text-foreground opacity-60"
                                aria-hidden="true"
                              />
                              <span>{{ item.label }}</span>
                            </template>
                          </div>

                          <!--Display label with description if present -->

                          <template v-if="link.type == 'description' && 'description' in item">
                            <div class="space-y-1">
                              <div class="font-medium">{{ item.label }}</div>
                              <p class="line-clamp-2 text-xs text-muted-foreground">
                                {{ item.description }}
                              </p>
                            </div>
                          </template>

                          <!-- Display simple label if not icon or description type -->
                          <template
                            v-else-if="
                              !link.type || (link.type !== 'icon' && link.type !== 'description')
                            "
                          >
                            <span>{{ item.label }}</span></template
                          >
                        </UiNavigationMenuLink>
                      </li>
                    </ul>
                  </UiNavigationMenuContent>
                </template>
                <template v-else>
                  <UiNavigationMenuLink
                    :href="link?.href"
                    class="py-1.5 font-medium text-muted-foreground hover:text-primary"
                  >
                    {{ link.label }}
                  </UiNavigationMenuLink>
                </template>
              </UiNavigationMenuItem>
            </UiNavigationMenuList>
          </UiNavigationMenu>
        </div>
      </div>
      <!--Right side -->
      <div class="flex items-center gap-2">
        <UiButton as-child size="sm" class="@[450px]:text-sm">
          <a href="#">Get Started</a>
        </UiButton>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
  type Nav = {
    label: string;
    href?: string;
    submenu?: boolean;
    type?: "description" | "simple" | "icon";
    items?: {
      href: string;
      label: string;
      description?: string;
      icon?: string; // Icon name for lucide icons
    }[];
  };
  // Navigation links array to be used in both desktop and mobile menus
  const navigationLinks: Nav[] = [
    {
      label: "Features",
      submenu: true,
      type: "description",
      items: [
        {
          href: "#",
          label: "Components",
          description: "Browse all components in the library.",
        },
        {
          href: "#",
          label: "Documentation",
          description: "Learn how to use the library.",
        },
        {
          href: "#",
          label: "Templates",
          description: "Pre-built layouts for common use cases.",
        },
      ],
    },
    {
      label: "Pricing",
      submenu: true,
      type: "simple",
      items: [
        { href: "#", label: "Product A" },
        { href: "#", label: "Product B" },
        { href: "#", label: "Product C" },
        { href: "#", label: "Product D" },
      ],
    },
    {
      label: "About",
      submenu: true,
      type: "icon",
      items: [
        { href: "#", label: "Getting Started", icon: "lucide:book-open" },
        { href: "#", label: "Tutorials", icon: "lucide:life-buoy" },
        { href: "#", label: "About Us", icon: "lucide:info" },
      ],
    },
  ];
</script>
```

<!-- /automd -->

::

### Three

::ShowCase

:DocsOriginNavbar3

#code

<!-- automd:file src="../../app/components/content/Docs/Navbar/DocsOriginNavbar3.vue" code lang="vue" -->

```vue [DocsOriginNavbar3.vue]
<template>
  <header class="@container border-b px-4 md:px-6">
    <div class="flex h-16 justify-between gap-4">
      <!--Left side -->
      <div class="flex gap-2">
        <div class="flex items-center @[450px]:hidden">
          <!--Mobile menu trigger -->
          <UiPopover>
            <UiPopoverTrigger as-child>
              <UiButton class="group size-8" variant="ghost" size="icon">
                <svg
                  class="pointer-events-none"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    class="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    class="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    class="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent align="start" class="w-36 p-1 @[450px]:hidden">
              <UiNavigationMenu class="max-w-none *:w-full">
                <UiNavigationMenuList class="flex-col items-start gap-0 @[450px]:gap-2">
                  <UiNavigationMenuItem
                    v-for="(link, index) in navigationLinks"
                    :key="index"
                    class="w-full"
                  >
                    <UiNavigationMenuLink :href="link.href" class="py-1.5" :active="link.active">
                      {{ link.label }}
                    </UiNavigationMenuLink>
                  </UiNavigationMenuItem>
                </UiNavigationMenuList>
              </UiNavigationMenu>
            </UiPopoverContent>
          </UiPopover>
        </div>
        <!--Main nav -->
        <div class="flex items-center gap-6">
          <a href="#" class="text-primary hover:text-primary/90">
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor">
              <path
                d="M20.46 1.766 17.303.923l-2.66 9.896-2.403-8.934-3.157.843 2.595 9.652-6.464-6.442-2.311 2.304 7.09 7.066-8.83-2.358-.846 3.146 9.648 2.577a6.516 6.516 0 0 1-.169-1.478c0-3.598 2.927-6.515 6.537-6.515s6.537 2.917 6.537 6.515c0 .505-.057.997-.167 1.468l8.768 2.342.846-3.147-9.686-2.586 8.83-2.358-.845-3.147-9.686 2.587 6.464-6.442-2.311-2.304-6.992 6.969 2.369-8.81Z"
              />
              <path
                d="M22.695 18.7a6.495 6.495 0 0 1-1.626 2.986l6.352 6.33 2.31-2.303-7.036-7.013ZM21.005 21.752a6.538 6.538 0 0 1-2.922 1.722l2.312 8.596 3.157-.843-2.547-9.475ZM17.965 23.505a6.569 6.569 0 0 1-1.632.205 6.566 6.566 0 0 1-1.743-.235l-2.314 8.605 3.157.843 2.532-9.418ZM14.478 23.444a6.54 6.54 0 0 1-2.87-1.747l-6.367 6.346 2.31 2.303 6.927-6.902ZM11.555 21.64a6.492 6.492 0 0 1-1.585-2.948L1.173 21.04l.846 3.146 9.536-2.546Z"
              />
            </svg>
          </a>
          <!--Navigation menu -->
          <UiNavigationMenu class="h-full *:h-full @max-[450px]:hidden">
            <UiNavigationMenuList class="h-full gap-2">
              <UiNavigationMenuItem
                v-for="(link, index) in navigationLinks"
                :key="index"
                class="h-full"
              >
                <UiNavigationMenuLink
                  :active="link.active"
                  :href="link.href"
                  :data-active="link.active"
                  class="h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium text-muted-foreground hover:border-b-primary hover:bg-transparent hover:text-primary data-[active=true]:border-b-primary data-[active=true]:bg-transparent!"
                >
                  {{ link.label }}
                </UiNavigationMenuLink>
              </UiNavigationMenuItem>
            </UiNavigationMenuList>
          </UiNavigationMenu>
        </div>
      </div>
      <!--Right side -->
      <div class="flex items-center gap-2">
        <UiButton as-child variant="ghost" size="sm" class="text-sm">
          <a href="#">Sign In</a>
        </UiButton>
        <UiButton as-child size="sm" class="text-sm">
          <a href="#">Get Started</a>
        </UiButton>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
  // Navigation links array to be used in both desktop and mobile menus
  const navigationLinks = [
    { href: "#", label: "Home", active: true },
    { href: "#", label: "Pricing" },
    { href: "#", label: "About" },
  ];
</script>
```

<!-- /automd -->

::
