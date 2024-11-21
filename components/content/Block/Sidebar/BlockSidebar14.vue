<template>
  <UiSidebarProvider>
    <UiSidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <UiBreadcrumbs :items="breadcrumbItems" />
        <UiSidebarTrigger class="-mr-1 ml-auto rotate-180" />
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
          <UiPlaceholder v-for="n in 3" :key="n" class="aspect-video rounded-xl" />
        </div>
        <UiPlaceholder class="min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </UiSidebarInset>
    <!-- Main Sidebar -->
    <UiSidebar side="right">
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Table of Contents" />
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <UiSidebarMenuItem v-for="item in data.navMain" :key="item.title">
                <UiSidebarMenuButton as-child>
                  <NuxtLink :href="item.url" class="font-medium">
                    {{ item.title }}
                  </NuxtLink>
                </UiSidebarMenuButton>
                <UiSidebarMenuSub v-if="item.items?.length">
                  <UiSidebarMenuSubItem v-for="(child, index) in item.items" :key="index">
                    <UiSidebarMenuSubButton as-child :is-active="child.isActive">
                      <NuxtLink :href="child.url">{{ child.title }}</NuxtLink>
                    </UiSidebarMenuSubButton>
                  </UiSidebarMenuSubItem>
                </UiSidebarMenuSub>
              </UiSidebarMenuItem>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
      </UiSidebarContent>
      <UiSidebarRail />
    </UiSidebar>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  useSeoMeta({ title: "A sidebar on the right." });
  const breadcrumbItems = [
    { label: "Building Your Application", href: "#" },
    { label: "Data Fetching", href: "#" },
  ];
  const data = {
    navMain: [
      {
        title: "Getting Started",
        url: "#",
        items: [
          { title: "Installation", url: "#" },
          { title: "Project Structure", url: "#" },
        ],
      },
      {
        title: "Building Your Application",
        url: "#",
        items: [
          { title: "Routing", url: "#" },
          { title: "Data Fetching", url: "#", isActive: true },
          { title: "Rendering", url: "#" },
          { title: "Caching", url: "#" },
          { title: "Styling", url: "#" },
          { title: "Optimizing", url: "#" },
          { title: "Configuring", url: "#" },
          { title: "Testing", url: "#" },
          { title: "Authentication", url: "#" },
          { title: "Deploying", url: "#" },
          { title: "Upgrading", url: "#" },
          { title: "Examples", url: "#" },
        ],
      },
      {
        title: "API Reference",
        url: "#",
        items: [
          { title: "Components", url: "#" },
          { title: "File Conventions", url: "#" },
          { title: "Functions", url: "#" },
          { title: "next.config.js Options", url: "#" },
          { title: "CLI", url: "#" },
          { title: "Edge Runtime", url: "#" },
        ],
      },
      {
        title: "Architecture",
        url: "#",
        items: [
          { title: "Accessibility", url: "#" },
          { title: "Fast Refresh", url: "#" },
          { title: "Next.js Compiler", url: "#" },
          { title: "Supported Browsers", url: "#" },
          { title: "Turbopack", url: "#" },
        ],
      },
      {
        title: "Community",
        url: "#",
        items: [{ title: "Contribution Guide", url: "#" }],
      },
    ],
  };
</script>
