<template>
  <!--
    Workspace sidebar that collapses to icons
    Features: Workspace switcher dropdown, command search button, collapsible nav groups with badges, projects with hover actions, storage usage card that hides when collapsed, user menu in the footer
  -->
  <UiSidebarProvider v-slot="{ isMobile }">
    <UiSidebar collapsible="icon" class="*:data-[sidebar=sidebar]:bg-(--sidebar)">
      <UiSidebarHeader>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div
                    class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                  >
                    <Icon :name="workspace.icon" class="size-4" />
                  </div>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ workspace.name }}</span>
                    <span class="truncate text-xs">{{ workspace.plan }}</span>
                  </div>
                  <Icon name="lucide:chevrons-up-down" class="ml-auto size-4" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent
                class="w-(--reka-dropdown-menu-trigger-width) min-w-56"
                align="start"
                :side="isMobile ? 'bottom' : 'right'"
              >
                <UiDropdownMenuLabel class="text-muted-foreground text-xs">
                  Workspaces
                </UiDropdownMenuLabel>
                <UiDropdownMenuItem
                  v-for="item in workspaces"
                  :key="item.name"
                  class="gap-2"
                  @select="workspace = item"
                >
                  <div class="flex size-6 items-center justify-center rounded-md border">
                    <Icon :name="item.icon" class="size-3.5" />
                  </div>
                  {{ item.name }}
                  <Icon v-if="item.name === workspace.name" name="lucide:check" class="ml-auto" />
                </UiDropdownMenuItem>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem class="gap-2">
                  <div
                    class="flex size-6 items-center justify-center rounded-md border border-dashed"
                  >
                    <Icon name="lucide:plus" class="size-3.5" />
                  </div>
                  <span class="text-muted-foreground font-medium">Add workspace</span>
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiSidebarMenuItem>
          <UiSidebarMenuItem>
            <UiSidebarMenuButton tooltip="Search" class="text-muted-foreground border">
              <Icon name="lucide:search" />
              <span>Search</span>
              <UiKbd class="ml-auto group-data-[collapsible=icon]:hidden">⌘K</UiKbd>
            </UiSidebarMenuButton>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarHeader>

      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Platform" />
          <UiSidebarMenu>
            <template v-for="item in nav" :key="item.title">
              <UiCollapsible
                v-if="item.items"
                v-slot="{ open }"
                as-child
                :default-open="item.active"
              >
                <UiSidebarMenuItem>
                  <UiCollapsibleTrigger as-child>
                    <UiSidebarMenuButton :tooltip="item.title">
                      <Icon :name="item.icon" />
                      <span>{{ item.title }}</span>
                      <Icon
                        name="lucide:chevron-right"
                        class="ml-auto transition-transform duration-200"
                        :class="open && 'rotate-90'"
                      />
                    </UiSidebarMenuButton>
                  </UiCollapsibleTrigger>
                  <UiCollapsibleContent>
                    <UiSidebarMenuSub>
                      <UiSidebarMenuSubItem v-for="sub in item.items" :key="sub">
                        <UiSidebarMenuSubButton as-child>
                          <NuxtLink to="#">{{ sub }}</NuxtLink>
                        </UiSidebarMenuSubButton>
                      </UiSidebarMenuSubItem>
                    </UiSidebarMenuSub>
                  </UiCollapsibleContent>
                </UiSidebarMenuItem>
              </UiCollapsible>
              <UiSidebarMenuItem v-else>
                <UiSidebarMenuButton as-child :tooltip="item.title" :is-active="item.active">
                  <NuxtLink to="#">
                    <Icon :name="item.icon" />
                    <span>{{ item.title }}</span>
                  </NuxtLink>
                </UiSidebarMenuButton>
                <UiSidebarMenuBadge v-if="item.badge">{{ item.badge }}</UiSidebarMenuBadge>
              </UiSidebarMenuItem>
            </template>
          </UiSidebarMenu>
        </UiSidebarGroup>

        <UiSidebarGroup class="group-data-[collapsible=icon]:hidden">
          <UiSidebarGroupLabel label="Projects" />
          <UiSidebarGroupAction title="New project">
            <Icon name="lucide:plus" />
            <span class="sr-only">New project</span>
          </UiSidebarGroupAction>
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="project in projects" :key="project.name">
              <UiSidebarMenuButton as-child>
                <NuxtLink to="#">
                  <span class="size-2 rounded-full" :class="project.color" />
                  <span>{{ project.name }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiSidebarMenuAction show-on-hover>
                    <Icon name="lucide:ellipsis" />
                    <span class="sr-only">More</span>
                  </UiSidebarMenuAction>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent
                  class="w-44"
                  :side="isMobile ? 'bottom' : 'right'"
                  align="start"
                >
                  <UiDropdownMenuItem icon="lucide:folder-open" title="Open" />
                  <UiDropdownMenuItem icon="lucide:share-2" title="Share" />
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem variant="destructive" icon="lucide:trash-2" title="Delete" />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroup>
      </UiSidebarContent>

      <UiSidebarFooter>
        <div
          v-if="showStorage"
          class="bg-sidebar-accent/60 relative rounded-lg border p-3 group-data-[collapsible=icon]:hidden"
        >
          <button
            type="button"
            class="text-muted-foreground hover:text-foreground absolute top-2 right-2"
            aria-label="Dismiss"
            @click="showStorage = false"
          >
            <Icon name="lucide:x" class="size-3.5" />
          </button>
          <p class="text-sm font-medium">Storage almost full</p>
          <p class="text-muted-foreground mt-0.5 text-xs">8.2 GB of 10 GB used</p>
          <UiProgress :model-value="82" class="mt-3 h-1.5" />
          <UiButton size="xs" class="mt-3 w-full">Upgrade plan</UiButton>
        </div>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
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
                class="w-(--reka-dropdown-menu-trigger-width) min-w-56"
                :side="isMobile ? 'bottom' : 'right'"
                align="end"
              >
                <UiDropdownMenuItem icon="lucide:user" title="Account" />
                <UiDropdownMenuItem icon="lucide:credit-card" title="Billing" />
                <UiDropdownMenuItem icon="lucide:bell" title="Notifications" />
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
        <h1 class="text-sm font-medium">{{ workspace.name }}</h1>
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
  type NavItem = {
    title: string;
    icon: string;
    active?: boolean;
    badge?: string;
    items?: string[];
  };

  const workspaces = [
    { name: "Acme Inc.", plan: "Enterprise", icon: "lucide:building-2" },
    { name: "Northwind", plan: "Pro", icon: "lucide:compass" },
    { name: "Side project", plan: "Free", icon: "lucide:rocket" },
  ];
  const workspace = ref(workspaces[0]!);

  const nav: NavItem[] = [
    { title: "Dashboard", icon: "lucide:layout-dashboard", active: true },
    { title: "Inbox", icon: "lucide:inbox", badge: "12" },
    {
      title: "Analytics",
      icon: "lucide:chart-no-axes-combined",
      items: ["Overview", "Reports", "Audiences"],
    },
    { title: "Customers", icon: "lucide:users", items: ["All customers", "Segments", "Imports"] },
    { title: "Settings", icon: "lucide:settings" },
  ];

  const projects = [
    { name: "Website redesign", color: "bg-violet-500" },
    { name: "Mobile app", color: "bg-sky-500" },
    { name: "Brand refresh", color: "bg-amber-500" },
  ];

  const showStorage = ref(true);
</script>
