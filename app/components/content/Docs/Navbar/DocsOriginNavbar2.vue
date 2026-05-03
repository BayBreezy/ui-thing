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
                    <div class="text-muted-foreground px-2 py-1.5 text-xs font-medium">
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
                        class="bg-border -mx-1 my-1 h-px w-full"
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
                    class="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5"
                  >
                    {{ link.label }}
                  </UiNavigationMenuTrigger>
                  <UiNavigationMenuContent
                    class="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1"
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
                                class="text-foreground size-4 opacity-60"
                                aria-hidden="true"
                              />
                              <span>{{ item.label }}</span>
                            </template>
                          </div>

                          <!--Display label with description if present -->

                          <template v-if="link.type == 'description' && 'description' in item">
                            <div class="space-y-1">
                              <div class="font-medium">{{ item.label }}</div>
                              <p class="text-muted-foreground line-clamp-2 text-xs">
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
                    class="text-muted-foreground hover:text-primary py-1.5 font-medium"
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
