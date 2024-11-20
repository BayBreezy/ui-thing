<template>
  <UiSidebarProvider>
    <UiSidebar>
      <UiSidebarHeader>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton>
                  Select Workspace
                  <Icon name="lucide:chevron-down" class="ml-auto" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent class="w-[--radix-popper-anchor-width]">
                <UiDropdownMenuItem>
                  <span>Acme Inc</span>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem>
                  <span>Acme Corp.</span>
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarHeader>
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupLabel>Application</UiSidebarGroupLabel>
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
  // Menu items.
  const items = [
    { title: "Home", url: "#", icon: "lucide:home" },
    { title: "Inbox", url: "#", icon: "lucide:inbox" },
    { title: "Calendar", url: "#", icon: "lucide:calendar" },
    { title: "Search", url: "#", icon: "lucide:search" },
    { title: "Settings", url: "#", icon: "lucide:settings" },
  ];
</script>
