<template>
  <UiSidebarProvider>
    <UiSidebar>
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <template v-for="(item, index) in items" :key="index">
                <UiCollapsible v-slot="{ open }" default-open>
                  <UiSidebarMenuItem>
                    <UiCollapsibleTrigger as-child>
                      <UiSidebarMenuButton as-child>
                        <NuxtLink :href="item.url">
                          {{ item.title }}
                          <Icon
                            name="lucide:chevron-right"
                            class="ml-auto transition"
                            :class="[open && 'rotate-90']"
                          />
                        </NuxtLink>
                      </UiSidebarMenuButton>
                    </UiCollapsibleTrigger>
                    <UiCollapsibleContent>
                      <UiSidebarMenuSub>
                        <template v-for="(child, k) in item.items" :key="`child-${k}`">
                          <UiSidebarMenuSubItem>
                            <UiSidebarMenuSubButton as-child>
                              <NuxtLink :href="child.url">
                                {{ child.title }}
                              </NuxtLink>
                            </UiSidebarMenuSubButton>
                          </UiSidebarMenuSubItem>
                        </template>
                      </UiSidebarMenuSub>
                    </UiCollapsibleContent>
                  </UiSidebarMenuItem>
                </UiCollapsible>
              </template>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
      </UiSidebarContent>
    </UiSidebar>
    <UiSidebarInset>
      <UiNavbar sticky>
        <UiContainer class="flex h-12 items-center">
          <UiSidebarTrigger />
        </UiContainer>
      </UiNavbar>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  const items = [
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
  ];
</script>
