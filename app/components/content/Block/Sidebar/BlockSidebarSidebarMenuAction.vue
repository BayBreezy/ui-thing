<template>
  <UiSidebarProvider>
    <UiSidebar>
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Projects" />
          <UiSidebarGroupAction title="Add Project">
            <Icon name="lucide:plus" /> <span class="sr-only">Add Project</span>
          </UiSidebarGroupAction>
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <UiSidebarMenuItem v-for="item in items" :key="item.title">
                <UiSidebarMenuButton as-child>
                  <NuxtLink :href="item.url">
                    <Icon :name="item.icon" />
                    <span>{{ item.title }}</span>
                  </NuxtLink>
                </UiSidebarMenuButton>
                <UiDropdownMenu>
                  <UiDropdownMenuTrigger as-child>
                    <UiSidebarMenuAction>
                      <Icon name="lucide:ellipsis-vertical" />
                    </UiSidebarMenuAction>
                  </UiDropdownMenuTrigger>
                  <UiDropdownMenuContent side="right" align="start">
                    <UiDropdownMenuItem v-for="child in actions" :key="child.title" as-child>
                      <NuxtLink :href="child.url">
                        <Icon :name="child.icon" />
                        <span>{{ child.title }}</span>
                      </NuxtLink>
                    </UiDropdownMenuItem>
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
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
    { title: "Design Engineering", url: "#", icon: "lucide:hash" },
    { title: "Sales & Marketing", url: "#", icon: "lucide:chart-pie" },
    { title: "Travel", url: "#", icon: "lucide:map" },
    { title: "Support", url: "#", icon: "lucide:life-buoy" },
    { title: "Feedback", url: "#", icon: "lucide:circle-help" },
  ];

  const actions = [
    { title: "Add Project", icon: "lucide:plus", url: "#" },
    { title: "Add Task", icon: "lucide:plus", url: "#" },
    { title: "Add User", icon: "lucide:plus", url: "#" },
  ];
</script>
