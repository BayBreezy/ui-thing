<template>
  <!--
    Floating sidebar with categorized sections
    Features: Floating variant with rounded corners, notification badges, colored workspace indicators that toggle, settings section, collapses fully off canvas
  -->
  <UiSidebarProvider v-slot="{ isMobile }">
    <UiSidebar variant="floating" class="*:data-[sidebar=sidebar]:bg-(--sidebar)">
      <UiSidebarHeader>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiSidebarMenuButton size="lg" as-child>
              <NuxtLink to="#">
                <div
                  class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                >
                  <Icon name="lucide:layers" class="size-4" />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">UI Thing</span>
                  <span class="truncate text-xs">Team plan</span>
                </div>
              </NuxtLink>
            </UiSidebarMenuButton>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
        <div class="relative">
          <Icon
            name="lucide:search"
            class="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 opacity-50"
          />
          <UiSidebarInput v-model="query" placeholder="Search menu" class="pl-8" />
        </div>
      </UiSidebarHeader>

      <UiSidebarContent>
        <UiSidebarGroup v-for="group in filteredGroups" :key="group.label">
          <UiSidebarGroupLabel :label="group.label" />
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="item in group.items" :key="item.title">
              <UiSidebarMenuButton as-child :is-active="item.title === active">
                <NuxtLink to="#" @click.prevent="active = item.title">
                  <Icon :name="item.icon" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>
              <UiSidebarMenuBadge v-if="item.badge">{{ item.badge }}</UiSidebarMenuBadge>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroup>

        <UiSidebarGroup v-if="!query">
          <UiSidebarGroupLabel label="Workspaces" />
          <UiSidebarGroupAction title="Add workspace">
            <Icon name="lucide:plus" />
            <span class="sr-only">Add workspace</span>
          </UiSidebarGroupAction>
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="space in spaces" :key="space.name">
              <UiSidebarMenuButton
                :is-active="space.name === currentSpace"
                @click="currentSpace = space.name"
              >
                <span class="size-2.5 rounded-sm" :class="space.color" />
                <span>{{ space.name }}</span>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroup>

        <p v-if="query && !filteredGroups.length" class="text-muted-foreground p-4 text-sm">
          No menu items match.
        </p>
      </UiSidebarContent>

      <UiSidebarFooter>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton size="lg">
                  <UiAvatar
                    src="https://i.pravatar.cc/80?img=12"
                    fallback="LC"
                    class="size-8 rounded-lg"
                  />
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">Liam Carter</span>
                    <span class="truncate text-xs">Product manager</span>
                  </div>
                  <Icon name="lucide:ellipsis" class="ml-auto size-4" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent
                class="min-w-52"
                :side="isMobile ? 'bottom' : 'right'"
                align="end"
              >
                <UiDropdownMenuItem icon="lucide:user" title="Profile" />
                <UiDropdownMenuItem icon="lucide:settings" title="Preferences" />
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="lucide:log-out" title="Log out" />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarFooter>
    </UiSidebar>

    <UiSidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-2 px-4">
        <UiSidebarTrigger class="-ml-1" />
        <UiSeparator orientation="vertical" class="mr-2 h-4" />
        <h1 class="text-sm font-medium">{{ active }}</h1>
        <UiBadge variant="secondary" class="ml-1">{{ currentSpace }}</UiBadge>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="grid gap-4 md:grid-cols-3">
          <div v-for="n in 3" :key="n" class="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div class="bg-muted/50 min-h-48 flex-1 rounded-xl" />
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  const groups = [
    {
      label: "Main menu",
      items: [
        { title: "Overview", icon: "lucide:layout-grid", badge: "3" },
        { title: "Inbox", icon: "lucide:inbox", badge: "12" },
        { title: "Projects", icon: "lucide:folder" },
        { title: "Tasks", icon: "lucide:square-check-big", badge: "5" },
        { title: "Calendar", icon: "lucide:calendar" },
        { title: "Documents", icon: "lucide:file-text" },
      ],
    },
    {
      label: "Settings",
      items: [
        { title: "Preferences", icon: "lucide:settings" },
        { title: "Help & support", icon: "lucide:life-buoy" },
      ],
    },
  ];

  const spaces = [
    { name: "Design team", color: "bg-violet-500" },
    { name: "Marketing", color: "bg-pink-500" },
    { name: "Development", color: "bg-blue-500" },
  ];

  const query = ref("");
  const active = ref("Overview");
  const currentSpace = ref("Design team");

  const filteredGroups = computed(() =>
    groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.title.toLowerCase().includes(query.value.toLowerCase())
        ),
      }))
      .filter((group) => group.items.length)
  );
</script>
