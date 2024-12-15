<template>
  <UiSidebarProvider>
    <UiSidebar>
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Application" />
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <UiSidebarMenuItem v-for="item in items" :key="item.title">
                <UiSidebarMenuButton as-child>
                  <a :href="item.url">
                    <Icon :name="item.icon" />
                    <span>{{ item.title }}</span>
                  </a>
                </UiSidebarMenuButton>
                <UiSidebarMenuBadge>{{ item.notifications }}</UiSidebarMenuBadge>
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
  const items = [
    { title: "Home", url: "#", icon: "lucide:home", notifications: 45 },
    { title: "Inbox", url: "#", icon: "lucide:inbox", notifications: 21 },
    { title: "Calendar", url: "#", icon: "lucide:calendar", notifications: 17 },
    { title: "Search", url: "#", icon: "lucide:search", notifications: 29 },
    { title: "Settings", url: "#", icon: "lucide:settings", notifications: 29 },
  ];
</script>
