<template>
  <UiSidebarProvider v-slot="{ isMobile }">
    <!-- Main Sidebar -->
    <UiSidebar class="border-r-0">
      <UiSidebarHeader>
        <!-- Team Switcher -->
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton class="w-full px-1.5">
                  <div
                    class="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"
                  >
                    <Icon :name="activeTeam.logo" mode="svg" class="size-3" />
                  </div>
                  <span class="truncate font-semibold">{{ activeTeam.name }}</span>
                  <Icon name="lucide:chevron-down" class="ml-auto opacity-50" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent
                class="w-64 rounded-lg"
                align="start"
                side="bottom"
                :side-offset="4"
              >
                <UiDropdownMenuLabel label="Teams" class="text-xs text-muted-foreground" />

                <UiDropdownMenuItem
                  v-for="(team, index) in data.teams"
                  :key="team.name"
                  class="gap-2 p-2"
                  @click="activeTeam = team"
                >
                  <div class="flex size-6 items-center justify-center rounded-sm border">
                    <Icon :name="team.logo" class="size-4 shrink-0" />
                  </div>
                  {{ team.name }}
                  <UiDropdownMenuShortcut>⌘{{ index + 1 }}</UiDropdownMenuShortcut>
                </UiDropdownMenuItem>

                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem class="gap-2 p-2">
                  <div
                    class="flex size-6 items-center justify-center rounded-md border bg-background"
                  >
                    <Icon name="lucide:plus" class="size-4" />
                  </div>
                  <div class="font-medium text-muted-foreground">Add team</div>
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
        <!-- Nav Main -->
        <UiSidebarMenu>
          <UiSidebarMenuItem v-for="(item, index) in data.navMain" :key="index">
            <UiSidebarMenuButton as-child :is-active="item.isActive">
              <NuxtLink :href="item.url">
                <Icon mode="svg" :name="item.icon" />
                <span>{{ item.title }}</span>
              </NuxtLink>
            </UiSidebarMenuButton>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarHeader>
      <!-- Sidebar content -->
      <UiSidebarContent>
        <!-- Nav favorites -->
        <UiSidebarGroup class="group-data-[collapsible=icon]:hidden">
          <UiSidebarGroupLabel label="Favorites" />
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="(item, index) in data.favorites" :key="index">
              <UiSidebarMenuButton as-child>
                <NuxtLink :href="item.url" :title="item.name">
                  <span>{{ item.emoji }}</span>
                  <span>{{ item.name }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiSidebarMenuAction show-on-hover>
                    <Icon name="lucide:ellipsis-vertical" class="rotate-90" />
                    <span class="sr-only">More</span>
                  </UiSidebarMenuAction>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent
                  class="w-56 rounded-lg"
                  :side="isMobile ? 'bottom' : 'right'"
                  :align="isMobile ? 'end' : 'start'"
                >
                  <UiDropdownMenuItem>
                    <Icon name="lucide:star-off" class="text-muted-foreground" />
                    <span>Remove from Favorites</span>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem>
                    <Icon name="lucide:link" class="text-muted-foreground" />
                    <span>Copy Link</span>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem>
                    <Icon name="lucide:arrow-up-right" class="text-muted-foreground" />
                    <span>Open in New Tab</span>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem>
                    <Icon name="lucide:trash-2" class="text-muted-foreground" />
                    <span>Delete</span>
                  </UiDropdownMenuItem>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiSidebarMenuItem>

            <UiSidebarMenuItem>
              <UiSidebarMenuButton class="text-sidebar-foreground/70">
                <Icon name="lucide:ellipsis-vertical" class="rotate-90" />
                <span>More</span>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroup>
        <!-- Nav workspaces -->
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Workspaces" />
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <UiCollapsible v-for="(workspace, index) in data.workspaces" :key="index">
                <UiSidebarMenuItem>
                  <UiSidebarMenuButton as-child>
                    <NuxtLink href="#">
                      <span>{{ workspace.emoji }}</span>
                      <span>{{ workspace.name }}</span>
                    </NuxtLink>
                  </UiSidebarMenuButton>
                  <UiCollapsibleTrigger as-child>
                    <UiSidebarMenuAction
                      class="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                      show-on-hover
                    >
                      <Icon name="lucide:chevron-right" mode="svg" />
                    </UiSidebarMenuAction>
                  </UiCollapsibleTrigger>
                  <UiSidebarMenuAction show-on-hover>
                    <Icon name="lucide:plus" />
                  </UiSidebarMenuAction>
                  <UiCollapsibleContent>
                    <UiSidebarMenuSub>
                      <UiSidebarMenuSubItem v-for="(page, idx) in workspace.pages" :key="idx">
                        <UiSidebarMenuSubButton as-child>
                          <NuxtLink href="#">
                            <span>{{ page.emoji }}</span>
                            <span>{{ page.name }}</span>
                          </NuxtLink>
                        </UiSidebarMenuSubButton>
                      </UiSidebarMenuSubItem>
                    </UiSidebarMenuSub>
                  </UiCollapsibleContent>
                </UiSidebarMenuItem>
              </UiCollapsible>

              <UiSidebarMenuItem>
                <UiSidebarMenuButton class="text-sidebar-foreground/70">
                  <Icon name="lucide:ellipsis-vertical" class="rotate-90" />
                  <span>More</span>
                </UiSidebarMenuButton>
              </UiSidebarMenuItem>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
        <!-- Nav secondary -->
        <UiSidebarGroup class="mt-auto">
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <UiSidebarMenuItem v-for="(item, index) in data.navSecondary" :key="index">
                <UiSidebarMenuButton as-child>
                  <NuxtLink :href="item.url">
                    <Icon mode="svg" :name="item.icon" />
                    <span>{{ item.title }}</span>
                  </NuxtLink>
                </UiSidebarMenuButton>
              </UiSidebarMenuItem>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
      </UiSidebarContent>
    </UiSidebar>
    <UiSidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-2">
        <div class="flex flex-1 items-center gap-2 px-3">
          <UiSidebarTrigger />
          <UiSeparator orientation="vertical" class="mr-2 h-4" />
          <UiBreadcrumbs :items="breadcrumbItems" />
        </div>
        <div class="ml-auto px-3">
          <!-- Nav actions -->
          <div class="flex items-center gap-2 text-sm">
            <div class="hidden font-medium text-muted-foreground md:inline-block">Edit Oct 08</div>
            <UiButton variant="ghost" size="icon" class="h-7 w-7">
              <Icon name="lucide:star" mode="svg" />
            </UiButton>
            <UiPopover v-model:open="navOpen">
              <UiPopoverTrigger as-child>
                <UiButton variant="ghost" size="icon" class="h-7 w-7 data-[state=open]:bg-accent">
                  <Icon name="lucide:ellipsis-vertical" class="rotate-90" />
                </UiButton>
              </UiPopoverTrigger>
              <UiPopoverContent class="w-56 overflow-hidden rounded-lg p-0" align="end">
                <!-- Sidebar inside the popup -->
                <UiSidebar collapsible="none" class="bg-transparent">
                  <UiSidebarContent>
                    <UiSidebarGroup
                      v-for="(group, index) in navActions"
                      :key="index"
                      class="border-b last:border-none"
                    >
                      <UiSidebarGroupContent class="gap-0">
                        <UiSidebarMenu>
                          <UiSidebarMenuItem v-for="(item, idx) in group" :key="idx">
                            <UiSidebarMenuButton>
                              <Icon mode="svg" :name="item.icon" /> <span>{{ item.label }}</span>
                            </UiSidebarMenuButton>
                          </UiSidebarMenuItem>
                        </UiSidebarMenu>
                      </UiSidebarGroupContent>
                    </UiSidebarGroup>
                  </UiSidebarContent>
                </UiSidebar>
              </UiPopoverContent>
            </UiPopover>
          </div>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 px-4 py-10">
        <UiPlaceholder class="mx-auto h-24 w-full max-w-3xl rounded-xl" />
        <UiPlaceholder class="mx-auto h-full w-full max-w-3xl rounded-xl" />
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  const breadcrumbItems = [{ label: "Project Management & Task Tracking" }];
  useSeoMeta({ title: "A sidebar in a popover." });
  const navActions = [
    [
      { label: "Customize Page", icon: "lucide:settings-2" },
      { label: "Turn into wiki", icon: "lucide:file-text" },
    ],
    [
      { label: "Copy Link", icon: "lucide:link" },
      { label: "Duplicate", icon: "lucide:copy" },
      { label: "Move to", icon: "lucide:corner-up-right" },
      { label: "Move to Trash", icon: "lucide:trash-2" },
    ],
    [
      { label: "Undo", icon: "lucide:corner-up-left" },
      { label: "View analytics", icon: "lucide:line-chart" },
      { label: "Version History", icon: "lucide:gallery-vertical-end" },
      { label: "Show delete pages", icon: "lucide:trash" },
      { label: "Notifications", icon: "lucide:bell" },
    ],
    [
      { label: "Import", icon: "lucide:arrow-up" },
      { label: "Export", icon: "lucide:arrow-down" },
    ],
  ];

  const navOpen = ref(true);

  const data = {
    teams: [
      { name: "Acme Inc", logo: "lucide:command", plan: "Enterprise" },
      { name: "Acme Corp.", logo: "lucide:audio-waveform", plan: "Startup" },
      { name: "Evil Corp.", logo: "lucide:skull", plan: "Free" },
    ],
    navMain: [
      { title: "Search", url: "#", icon: "lucide:search" },
      { title: "Ask AI", url: "#", icon: "lucide:sparkles" },
      { title: "Home", url: "#", icon: "lucide:home", isActive: true },
      { title: "Inbox", url: "#", icon: "lucide:inbox", badge: "10" },
    ],
    navSecondary: [
      { title: "Calendar", url: "#", icon: "lucide:calendar" },
      { title: "Settings", url: "#", icon: "lucide:settings-2" },
      { title: "Templates", url: "#", icon: "lucide:blocks" },
      { title: "Trash", url: "#", icon: "lucide:trash-2" },
      { title: "Help", url: "#", icon: "lucide:message-circle-question" },
    ],
    favorites: [
      { name: "Project Management & Task Tracking", url: "#", emoji: "📊" },
      { name: "Family Recipe Collection & Meal Planning", url: "#", emoji: "🍳" },
      { name: "Fitness Tracker & Workout Routines", url: "#", emoji: "💪" },
      { name: "Book Notes & Reading List", url: "#", emoji: "📚" },
      { name: "Sustainable Gardening Tips & Plant Care", url: "#", emoji: "🌱" },
      { name: "Language Learning Progress & Resources", url: "#", emoji: "🗣️" },
      { name: "Home Renovation Ideas & Budget Tracker", url: "#", emoji: "🏠" },
      { name: "Personal Finance & Investment Portfolio", url: "#", emoji: "💰" },
      { name: "Movie & TV Show Watchlist with Reviews", url: "#", emoji: "🎬" },
      { name: "Daily Habit Tracker & Goal Setting", url: "#", emoji: "✅" },
    ],
    workspaces: [
      {
        name: "Personal Life Management",
        emoji: "🏠",
        pages: [
          { name: "Daily Journal & Reflection", url: "#", emoji: "📔" },
          { name: "Health & Wellness Tracker", url: "#", emoji: "🍏" },
          { name: "Personal Growth & Learning Goals", url: "#", emoji: "🌟" },
        ],
      },
      {
        name: "Professional Development",
        emoji: "💼",
        pages: [
          { name: "Career Objectives & Milestones", url: "#", emoji: "🎯" },
          { name: "Skill Acquisition & Training Log", url: "#", emoji: "🧠" },
          { name: "Networking Contacts & Events", url: "#", emoji: "🤝" },
        ],
      },
      {
        name: "Creative Projects",
        emoji: "🎨",
        pages: [
          { name: "Writing Ideas & Story Outlines", url: "#", emoji: "✍️" },
          { name: "Art & Design Portfolio", url: "#", emoji: "🖼️" },
          { name: "Music Composition & Practice Log", url: "#", emoji: "🎵" },
        ],
      },
      {
        name: "Home Management",
        emoji: "🏡",
        pages: [
          { name: "Household Budget & Expense Tracking", url: "#", emoji: "💰" },
          { name: "Home Maintenance Schedule & Tasks", url: "#", emoji: "🔧" },
          { name: "Family Calendar & Event Planning", url: "#", emoji: "📅" },
        ],
      },
      {
        name: "Travel & Adventure",
        emoji: "🧳",
        pages: [
          { name: "Trip Planning & Itineraries", url: "#", emoji: "🗺️" },
          { name: "Travel Bucket List & Inspiration", url: "#", emoji: "🌎" },
          { name: "Travel Journal & Photo Gallery", url: "#", emoji: "📸" },
        ],
      },
    ],
  };
  const activeTeam = ref(data.teams[0]);
</script>
