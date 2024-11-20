<template>
  <UiSidebarProvider>
    <UiSidebar>
      <UiSidebarContent>
        <UiCollapsible v-slot="{ open }" default-open>
          <UiSidebarGroup>
            <UiSidebarGroupLabel
              class="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              as-child
            >
              <UiCollapsibleTrigger>
                Application
                <Icon class="ml-auto" name="lucide:chevron-down" :class="[open && 'rotate-180']" />
              </UiCollapsibleTrigger>
            </UiSidebarGroupLabel>
            <UiCollapsibleContent>
              <UiSidebarGroupContent>
                <UiSidebarMenu>
                  <UiSidebarMenuItem v-for="item in items" :key="item.title">
                    <UiSidebarMenuButton as-child>
                      <a :href="item.url">
                        <Icon :name="item.icon" />
                        <span>{{ item.title }}</span>
                      </a>
                    </UiSidebarMenuButton>
                  </UiSidebarMenuItem>
                </UiSidebarMenu>
              </UiSidebarGroupContent>
            </UiCollapsibleContent>
          </UiSidebarGroup>
        </UiCollapsible>
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
  // Menu items.
  const items = [
    { title: "Home", url: "#", icon: "lucide:home" },
    { title: "Inbox", url: "#", icon: "lucide:inbox" },
    { title: "Calendar", url: "#", icon: "lucide:calendar" },
    { title: "Search", url: "#", icon: "lucide:search" },
    { title: "Settings", url: "#", icon: "lucide:settings" },
  ];
</script>
