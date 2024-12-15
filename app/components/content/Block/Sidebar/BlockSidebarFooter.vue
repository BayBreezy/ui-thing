<template>
  <UiSidebarProvider>
    <UiSidebar>
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Main" />
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

      <UiSidebarFooter>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton>
                  <Icon name="lucide:user" /> Username
                  <Icon name="lucide:chevron-up" class="ml-auto" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent side="top" class="w-[--radix-popper-anchor-width]">
                <UiDropdownMenuItem
                  v-for="item in ['Account', 'Billing', 'Sign Out']"
                  :key="item"
                  :title="item"
                />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarFooter>
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
