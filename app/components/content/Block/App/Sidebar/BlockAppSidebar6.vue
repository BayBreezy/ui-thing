<template>
  <!--
    Projects sidebar with recent, starred and all tabs
    Features: Tabs that filter the list, live search, star toggles that move projects between tabs, color-coded projects, empty states, quick links and a new project button
  -->
  <UiSidebarProvider v-slot="{ isMobile }">
    <UiSidebar class="*:data-[sidebar=sidebar]:bg-(--sidebar)">
      <UiSidebarHeader class="gap-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 font-semibold">
            <div
              class="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-lg"
            >
              <Icon name="lucide:folder-kanban" class="size-4" />
            </div>
            Projects
          </div>
          <UiButton variant="ghost" size="icon-sm" aria-label="New project">
            <Icon name="lucide:plus" class="size-4" />
          </UiButton>
        </div>
        <div class="relative">
          <Icon
            name="lucide:search"
            class="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 opacity-50"
          />
          <UiSidebarInput v-model="query" placeholder="Search projects" class="pl-8" />
        </div>
        <UiTabs v-model="tab">
          <UiTabsList class="grid w-full grid-cols-3">
            <UiTabsTrigger value="recent">Recent</UiTabsTrigger>
            <UiTabsTrigger value="starred">
              Starred
              <span class="text-muted-foreground ml-1 text-xs tabular-nums">{{
                starredCount
              }}</span>
            </UiTabsTrigger>
            <UiTabsTrigger value="all">All</UiTabsTrigger>
          </UiTabsList>
        </UiTabs>
      </UiSidebarHeader>

      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="project in visible" :key="project.id">
              <UiSidebarMenuButton as-child class="h-auto py-2">
                <NuxtLink to="#">
                  <span class="size-2.5 shrink-0 rounded-full" :class="project.color" />
                  <div class="grid min-w-0 flex-1 leading-tight">
                    <span class="truncate text-sm font-medium">{{ project.name }}</span>
                    <span class="text-muted-foreground truncate text-xs">{{
                      project.updated
                    }}</span>
                  </div>
                </NuxtLink>
              </UiSidebarMenuButton>
              <UiSidebarMenuAction
                :aria-label="project.starred ? 'Unstar project' : 'Star project'"
                :aria-pressed="project.starred"
                @click="project.starred = !project.starred"
              >
                <Icon
                  name="lucide:star"
                  :class="project.starred && 'fill-amber-400 text-amber-400'"
                />
              </UiSidebarMenuAction>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
          <p v-if="!visible.length" class="text-muted-foreground px-3 py-8 text-center text-sm">
            {{ emptyText }}
          </p>
        </UiSidebarGroup>

        <UiSidebarSeparator />

        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Quick links" />
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="link in links" :key="link.title">
              <UiSidebarMenuButton as-child>
                <NuxtLink to="#">
                  <Icon :name="link.icon" />
                  <span>{{ link.title }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroup>
      </UiSidebarContent>

      <UiSidebarFooter>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton size="lg">
                  <UiAvatar
                    src="https://i.pravatar.cc/80?img=45"
                    fallback="PN"
                    class="size-8 rounded-lg"
                  />
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">Priya Nair</span>
                    <span class="truncate text-xs">Design team</span>
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
                <UiDropdownMenuItem icon="lucide:log-out" title="Log out" />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarFooter>
    </UiSidebar>

    <UiSidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <UiSidebarTrigger class="-ml-1" />
        <UiSeparator orientation="vertical" class="mr-2 h-4" />
        <h1 class="text-sm font-medium">Select a project</h1>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="bg-muted/50 min-h-64 flex-1 rounded-xl" />
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  const projects = reactive([
    {
      id: 1,
      name: "Website redesign",
      updated: "2 hours ago",
      color: "bg-violet-500",
      starred: true,
    },
    { id: 2, name: "Mobile app", updated: "5 hours ago", color: "bg-pink-500", starred: false },
    { id: 3, name: "Brand identity", updated: "Yesterday", color: "bg-sky-500", starred: true },
    {
      id: 4,
      name: "Marketing campaign",
      updated: "2 days ago",
      color: "bg-amber-500",
      starred: false,
    },
    {
      id: 5,
      name: "Customer research",
      updated: "Last week",
      color: "bg-emerald-500",
      starred: false,
    },
    { id: 6, name: "Design system", updated: "Last week", color: "bg-rose-500", starred: false },
  ]);

  const links = [
    { title: "Team", icon: "lucide:users" },
    { title: "Settings", icon: "lucide:settings" },
    { title: "Help", icon: "lucide:circle-help" },
  ];

  const tab = ref("recent");
  const query = ref("");

  const starredCount = computed(() => projects.filter((project) => project.starred).length);

  const visible = computed(() => {
    const q = query.value.toLowerCase();
    const base =
      tab.value === "starred"
        ? projects.filter((project) => project.starred)
        : tab.value === "recent"
          ? projects.slice(0, 4)
          : projects;
    return base.filter((project) => project.name.toLowerCase().includes(q));
  });

  const emptyText = computed(() =>
    query.value
      ? "No projects match your search."
      : tab.value === "starred"
        ? "Star a project to pin it here."
        : "No projects yet."
  );
</script>
