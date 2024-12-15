<template>
  <UiSidebarProvider>
    <UiSidebar>
      <UiSidebarRail />
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <template v-for="(item, index) in items" :key="index">
                <UiSidebarMenuItem>
                  <UiSidebarMenuButton as-child>
                    <NuxtLink :href="item.url">
                      {{ item.title }}
                    </NuxtLink>
                  </UiSidebarMenuButton>
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
                </UiSidebarMenuItem>
              </template>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
      </UiSidebarContent>
    </UiSidebar>
    <UiSidebarInset />
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
  ];
</script>
