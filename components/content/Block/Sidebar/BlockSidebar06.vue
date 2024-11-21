<template>
  <UiSidebarProvider v-slot="{ isMobile }">
    <!-- App Sidebar -->
    <UiSidebar>
      <UiSidebarHeader>
        <!-- Version switcher -->
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div
                    class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                  >
                    <Icon name="lucide:gallery-vertical-end" class="size-4" />
                  </div>
                  <div class="flex flex-col gap-0.5 leading-none">
                    <span class="font-semibold">Documentation</span>
                    <span class="">v{{ selectedVersion }}</span>
                  </div>
                  <Icon name="lucide:chevrons-up-down" class="ml-auto" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width]" align="start">
                <UiDropdownMenuItem
                  v-for="version in data.versions"
                  :key="version"
                  class="cursor-pointer"
                  @select="selectedVersion = version"
                >
                  v{{ version }}
                  <Icon v-if="version === selectedVersion" name="lucide:check" class="ml-auto" />
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
        <!-- Search form -->
        <form>
          <UiSidebarGroup class="py-0">
            <UiSidebarGroupContent class="relative">
              <UiLabel for="search" class="sr-only"> Search </UiLabel>
              <UiSidebarInput id="search" placeholder="Search the docs..." class="pl-8" />
              <Icon
                name="lucide:search"
                class="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50"
              />
            </UiSidebarGroupContent>
          </UiSidebarGroup>
        </form>
      </UiSidebarHeader>
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarMenu>
            <template v-for="item in data.navMain" :key="item.title">
              <UiDropdownMenu>
                <UiSidebarMenuItem>
                  <UiDropdownMenuTrigger as-child>
                    <UiSidebarMenuButton
                      class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      {{ item.title }}
                      <Icon name="lucide:ellipsis-vertical" class="ml-auto rotate-90" />
                    </UiSidebarMenuButton>
                  </UiDropdownMenuTrigger>
                </UiSidebarMenuItem>

                <UiDropdownMenuContent
                  v-if="item.items?.length"
                  :side="isMobile ? 'bottom' : 'right'"
                  :align="isMobile ? 'end' : 'start'"
                  class="min-w-56 rounded-lg"
                >
                  <template v-for="child in item.items" :key="`child-${child.title}`">
                    <UiDropdownMenuItem as-child>
                      <NuxtLink :href="child.url">{{ child.title }}</NuxtLink>
                    </UiDropdownMenuItem>
                  </template>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </template>
          </UiSidebarMenu>
        </UiSidebarGroup>
      </UiSidebarContent>
      <UiSidebarRail />
      <!-- Footer with subscription form -->
      <UiSidebarFooter>
        <div class="p-1">
          <UiCard class="shadow-none">
            <form>
              <UiCardHeader class="p-4">
                <UiCardTitle class="text-sm">Subscribe to our newsletter</UiCardTitle>
                <UiCardDescription>
                  Opt-in to receive updates and news about the sidebar.
                </UiCardDescription>
              </UiCardHeader>
              <UiCardContent class="grid gap-2.5 p-4">
                <UiSidebarInput type="email" placeholder="Email" />
                <UiButton
                  class="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/80"
                  size="sm"
                >
                  Subscribe
                </UiButton>
              </UiCardContent>
            </form>
          </UiCard>
        </div>
      </UiSidebarFooter>
    </UiSidebar>
    <!-- Sidebar main content -->
    <UiSidebarInset>
      <!-- Navbar -->
      <UiNavbar sticky class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <UiSidebarTrigger class="-ml-1" />
        <UiSeparator orientation="vertical" class="mr-2 h-4" />
        <UiBreadcrumbs :items="breadcrumbItems" />
      </UiNavbar>
      <div class="grid auto-rows-min gap-4 p-4 md:grid-cols-3">
        <UiPlaceholder v-for="n in 30" :key="n" class="aspect-video rounded-lg" />
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Building Your Application", link: "#" },
    { label: "Data Fetching", link: "#" },
  ];
  // This is sample data.
  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      {
        title: "Getting Started",
        url: "#",
        items: [
          {
            title: "Installation",
            url: "#",
          },
          {
            title: "Project Structure",
            url: "#",
          },
        ],
      },
      {
        title: "Building Your Application",
        url: "#",
        items: [
          {
            title: "Routing",
            url: "#",
          },
          {
            title: "Data Fetching",
            url: "#",
            isActive: true,
          },
          {
            title: "Rendering",
            url: "#",
          },
          {
            title: "Caching",
            url: "#",
          },
          {
            title: "Styling",
            url: "#",
          },
          {
            title: "Optimizing",
            url: "#",
          },
          {
            title: "Configuring",
            url: "#",
          },
          {
            title: "Testing",
            url: "#",
          },
          {
            title: "Authentication",
            url: "#",
          },
          {
            title: "Deploying",
            url: "#",
          },
          {
            title: "Upgrading",
            url: "#",
          },
          {
            title: "Examples",
            url: "#",
          },
        ],
      },
      {
        title: "API Reference",
        url: "#",
        items: [
          {
            title: "Components",
            url: "#",
          },
          {
            title: "File Conventions",
            url: "#",
          },
          {
            title: "Functions",
            url: "#",
          },
          {
            title: "next.config.js Options",
            url: "#",
          },
          {
            title: "CLI",
            url: "#",
          },
          {
            title: "Edge Runtime",
            url: "#",
          },
        ],
      },
      {
        title: "Architecture",
        url: "#",
        items: [
          {
            title: "Accessibility",
            url: "#",
          },
          {
            title: "Fast Refresh",
            url: "#",
          },
          {
            title: "Next.js Compiler",
            url: "#",
          },
          {
            title: "Supported Browsers",
            url: "#",
          },
          {
            title: "Turbopack",
            url: "#",
          },
        ],
      },
    ],
  };
  const selectedVersion = ref(data.versions[0]);
  useSeoMeta({ title: "A sidebar with collapsible submenus." });
</script>
