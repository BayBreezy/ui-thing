<template>
  <!--
    Dark brand sidebar that stays dark in light mode
    Features: Always dark sidebar next to a light page, environment switcher with a colored badge, gradient logo, active item highlight, collapses to icons, user footer
  -->
  <UiSidebarProvider v-slot="{ isMobile }">
    <UiSidebar
      collapsible="icon"
      class="dark text-sidebar-foreground *:data-[sidebar=sidebar]:bg-(--sidebar)"
    >
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
                    class="flex aspect-square size-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-pink-500 text-white"
                  >
                    <Icon name="lucide:hexagon" class="size-4" />
                  </div>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">Hexa Cloud</span>
                    <span class="flex items-center gap-1.5 truncate text-xs">
                      <span class="size-1.5 rounded-full" :class="environment.dot" />
                      {{ environment.name }}
                    </span>
                  </div>
                  <Icon name="lucide:chevrons-up-down" class="ml-auto size-4" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent
                class="dark w-(--reka-dropdown-menu-trigger-width) min-w-52"
                align="start"
                :side="isMobile ? 'bottom' : 'right'"
              >
                <UiDropdownMenuLabel class="text-muted-foreground text-xs">
                  Environment
                </UiDropdownMenuLabel>
                <UiDropdownMenuItem
                  v-for="env in environments"
                  :key="env.name"
                  class="gap-2"
                  @select="environment = env"
                >
                  <span class="size-2 rounded-full" :class="env.dot" />
                  {{ env.name }}
                  <Icon v-if="env.name === environment.name" name="lucide:check" class="ml-auto" />
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarHeader>

      <UiSidebarContent>
        <UiSidebarGroup v-for="group in groups" :key="group.label">
          <UiSidebarGroupLabel :label="group.label" />
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="item in group.items" :key="item.title">
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
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroup>
      </UiSidebarContent>

      <UiSidebarFooter>
        <UiSidebarMenu>
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
                    <span class="truncate text-xs">Admin</span>
                  </div>
                  <Icon name="lucide:chevrons-up-down" class="ml-auto size-4" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent
                class="dark min-w-52"
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
        <UiBadge variant="outline" class="ml-auto gap-1.5">
          <span class="size-1.5 rounded-full" :class="environment.dot" />
          {{ environment.name }}
        </UiBadge>
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
  const environments = [
    { name: "Production", dot: "bg-green-500" },
    { name: "Staging", dot: "bg-amber-500" },
    { name: "Development", dot: "bg-sky-500" },
  ];
  const environment = ref(environments[0]!);

  const groups = [
    {
      label: "Infrastructure",
      items: [
        { title: "Overview", icon: "lucide:gauge" },
        { title: "Servers", icon: "lucide:server", badge: "8" },
        { title: "Databases", icon: "lucide:database" },
        { title: "Networking", icon: "lucide:network" },
      ],
    },
    {
      label: "Operations",
      items: [
        { title: "Deployments", icon: "lucide:rocket" },
        { title: "Logs", icon: "lucide:scroll-text" },
        { title: "Alerts", icon: "lucide:triangle-alert", badge: "3" },
        { title: "Billing", icon: "lucide:receipt" },
      ],
    },
  ];

  const active = ref("Overview");
</script>
