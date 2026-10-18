<template>
  <!--
    Compact icon sidebar with tooltips that expands on demand
    Features: Starts collapsed to icons with tooltips, expands with the trigger, the rail or the keyboard shortcut, active route state, notification dot, user menu at the bottom
  -->
  <UiSidebarProvider v-slot="{ isMobile }" :default-open="false">
    <UiSidebar collapsible="icon" class="*:data-[sidebar=sidebar]:bg-(--sidebar)">
      <UiSidebarHeader>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiSidebarMenuButton size="lg" as-child>
              <NuxtLink to="#">
                <div
                  class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                >
                  <Icon name="lucide:command" class="size-4" />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">UI Thing</span>
                  <span class="truncate text-xs">Admin console</span>
                </div>
              </NuxtLink>
            </UiSidebarMenuButton>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarHeader>

      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="item in nav" :key="item.title">
              <UiSidebarMenuButton
                as-child
                :tooltip="item.title"
                :is-active="item.title === active"
              >
                <NuxtLink to="#" @click.prevent="active = item.title">
                  <Icon :name="item.icon" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>
              <UiSidebarMenuBadge v-if="item.badge">{{ item.badge }}</UiSidebarMenuBadge>
              <span
                v-else-if="item.dot"
                class="bg-primary absolute top-2 right-2 size-1.5 rounded-full group-data-[collapsible=icon]:top-1.5 group-data-[collapsible=icon]:right-1.5"
                aria-label="New activity"
              />
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroup>
      </UiSidebarContent>

      <UiSidebarFooter>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiSidebarMenuButton tooltip="Help" as-child>
              <NuxtLink to="#">
                <Icon name="lucide:circle-help" />
                <span>Help center</span>
              </NuxtLink>
            </UiSidebarMenuButton>
          </UiSidebarMenuItem>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton size="lg" tooltip="Account">
                  <UiAvatar
                    src="https://i.pravatar.cc/80?img=47"
                    fallback="MC"
                    class="size-8 rounded-lg"
                  />
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">Maya Chen</span>
                    <span class="truncate text-xs">maya@uithing.com</span>
                  </div>
                  <Icon name="lucide:chevrons-up-down" class="ml-auto size-4" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent
                class="min-w-52"
                :side="isMobile ? 'bottom' : 'right'"
                align="end"
              >
                <UiDropdownMenuItem icon="lucide:user" title="Profile" />
                <UiDropdownMenuItem icon="lucide:settings" title="Settings" />
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="lucide:log-out" title="Log out" />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarFooter>
      <UiSidebarRail />
    </UiSidebar>

    <UiSidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <UiSidebarTrigger class="-ml-1" />
        <UiSeparator orientation="vertical" class="mr-2 h-4" />
        <h1 class="text-sm font-medium">{{ active }}</h1>
        <p class="text-muted-foreground ml-auto hidden text-xs sm:block">
          Toggle with <UiKbd>⌘</UiKbd> <UiKbd>B</UiKbd>
        </p>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="grid gap-4 md:grid-cols-3">
          <div v-for="n in 3" :key="n" class="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div class="bg-muted/50 min-h-48 flex-1 rounded-xl" />
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  const nav = [
    { title: "Overview", icon: "lucide:house" },
    { title: "Analytics", icon: "lucide:chart-column", dot: true },
    { title: "Projects", icon: "lucide:folder-kanban" },
    { title: "Tasks", icon: "lucide:list-checks", badge: "5" },
    { title: "Calendar", icon: "lucide:calendar" },
    { title: "Messages", icon: "lucide:mail", badge: "12" },
    { title: "Team", icon: "lucide:users" },
    { title: "Settings", icon: "lucide:settings" },
  ];

  const active = ref("Overview");
</script>
