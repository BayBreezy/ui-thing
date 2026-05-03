<template>
  <DefineNavItem v-slot="{ project }">
    <UiButton
      :to="project?.link"
      size="sm"
      variant="ghost"
      class="h-auto w-full justify-start gap-3 px-2 py-2"
    >
      <div
        v-if="project.color"
        class="size-2 shrink-0 rounded-full"
        :style="{ backgroundColor: project.color }"
      />
      <div class="flex-1 overflow-hidden text-left">
        <p class="truncate text-sm">{{ project.title }}</p>
        <p v-if="project.team" class="text-muted-foreground truncate text-xs">{{ project.team }}</p>
        <p v-if="project.updated" class="text-muted-foreground truncate text-xs">
          {{ project.updated }}
        </p>
      </div>
      <UiButton
        size="icon-sm"
        variant="ghost"
        class="shrink-0"
        @click.prevent="toggleStar(project)"
      >
        <Icon
          :name="project.starred ? 'lucide:star' : 'lucide:star'"
          :class="project.starred ? 'fill-yellow-400 text-yellow-400' : ''"
          class="text-muted-foreground size-3.5"
        />
      </UiButton>
    </UiButton>
  </DefineNavItem>
  <aside class="h-screen w-[320px] border-r">
    <UiScrollArea class="size-full">
      <div class="flex h-screen flex-col">
        <div class="flex items-center justify-between border-b px-4 py-3">
          <NuxtLink to="#" class="flex items-center gap-2">
            <UiAvatar src="/icon.png" alt="Company Logo" class="size-7 rounded object-contain" />
            <span class="font-bold">{{ COMPANY_NAME }}</span>
          </NuxtLink>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton size="icon-sm" variant="ghost">
                <Icon name="lucide:plus" class="text-muted-foreground size-4" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end">
              <UiDropdownMenuItem>
                <Icon name="lucide:file-plus" class="size-4" />
                New Project
              </UiDropdownMenuItem>
              <UiDropdownMenuItem>
                <Icon name="lucide:folder-plus" class="size-4" />
                New Folder
              </UiDropdownMenuItem>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem>
                <Icon name="lucide:upload" class="size-4" />
                Import
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>

        <div class="flex-1 p-4">
          <div class="mb-4">
            <UiVeeInput v-model="search" placeholder="Search projects..." icon="lucide:search" />
          </div>

          <UiTabs default-value="recent" class="w-full">
            <UiTabsList class="mb-4 grid w-full grid-cols-3">
              <UiTabsTrigger value="recent">Recent</UiTabsTrigger>
              <UiTabsTrigger value="starred">Starred</UiTabsTrigger>
              <UiTabsTrigger value="all">All</UiTabsTrigger>
            </UiTabsList>

            <UiTabsContent value="recent" class="space-y-1">
              <div v-for="(project, i) in recentProjects" :key="i">
                <NavItem :project="project" />
              </div>
            </UiTabsContent>

            <UiTabsContent value="starred" class="space-y-1">
              <div v-for="(project, i) in starredProjects" :key="i">
                <NavItem :project="project" />
              </div>
            </UiTabsContent>

            <UiTabsContent value="all" class="space-y-1">
              <div v-for="(project, i) in allProjects" :key="i">
                <NavItem :project="project" />
              </div>
            </UiTabsContent>
          </UiTabs>

          <UiDivider class="my-4" />

          <div>
            <div class="mb-2 px-2">
              <span class="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
                >Quick Links</span
              >
            </div>
            <nav class="flex flex-col gap-0.5">
              <UiButton
                v-for="(link, i) in quickLinks"
                :key="i"
                :to="link.link"
                size="sm"
                variant="ghost"
                class="justify-start gap-3 px-2"
              >
                <Icon :name="link.icon" class="text-muted-foreground size-4" />
                <span>{{ link.title }}</span>
              </UiButton>
            </nav>
          </div>
        </div>

        <div class="border-t p-4">
          <div class="flex items-center gap-3">
            <UiAvatar :src="user.avatar" class="size-9" />
            <div class="flex-1 overflow-hidden">
              <p class="truncate text-sm font-semibold">{{ user.username }}</p>
              <p class="text-muted-foreground truncate text-xs">{{ user.workspace }}</p>
            </div>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiButton size="icon-sm" variant="ghost">
                  <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
                </UiButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent align="end">
                <UiDropdownMenuItem>
                  <Icon name="lucide:user" class="size-4" />
                  Profile
                </UiDropdownMenuItem>
                <UiDropdownMenuItem>
                  <Icon name="lucide:building-2" class="size-4" />
                  Switch Workspace
                </UiDropdownMenuItem>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem>
                  <Icon name="lucide:log-out" class="size-4" />
                  Sign out
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </div>
        </div>
      </div>
    </UiScrollArea>
  </aside>
</template>

<script lang="ts" setup>
  const search = ref<string>("");

  const user = {
    avatar: "https://randomuser.me/api/portraits/med/men/32.jpg",
    username: "Chris Anderson",
    workspace: "Design Team",
  };

  type Project = {
    title: string;
    updated?: string;
    color?: string;
    starred?: boolean;
    link?: string;
    team?: string;
  };

  const recentProjects = ref<Array<Project>>([
    {
      title: "Website Redesign",
      updated: "2 hours ago",
      color: "#8b5cf6",
      starred: true,
      link: "#",
    },
    { title: "Mobile App", updated: "5 hours ago", color: "#ec4899", starred: false, link: "#" },
    { title: "Brand Identity", updated: "1 day ago", color: "#3b82f6", starred: false, link: "#" },
    {
      title: "Marketing Campaign",
      updated: "2 days ago",
      color: "#f59e0b",
      starred: true,
      link: "#",
    },
  ]);

  const starredProjects = computed(() => recentProjects.value.filter((project) => project.starred));

  const allProjects = ref<Array<Project>>([
    { title: "Website Redesign", team: "Design Team", color: "#8b5cf6", link: "#" },
    { title: "Mobile App", team: "Development", color: "#ec4899", link: "#" },
    { title: "Brand Identity", team: "Design Team", color: "#3b82f6", link: "#" },
    { title: "Marketing Campaign", team: "Marketing", color: "#f59e0b", link: "#" },
    { title: "Product Launch", team: "Product", color: "#10b981", link: "#" },
    { title: "Customer Portal", team: "Development", color: "#06b6d4", link: "#" },
  ]);

  const quickLinks = [
    { title: "Settings", icon: "lucide:settings", link: "#" },
    { title: "Team", icon: "lucide:users", link: "#" },
    { title: "Help", icon: "lucide:help-circle", link: "#" },
  ];

  const [DefineNavItem, NavItem] = createReusableTemplate();

  const toggleStar = (project: any) => {
    project.starred = !project.starred;
  };
</script>
