<template>
  <!--
    Inset sidebar with quick actions and an account footer
    Features: Inset variant where the page sits in a rounded card, quick action buttons, grouped nav with a New badge, nested items, storage meter and user row in the footer
  -->
  <UiSidebarProvider v-slot="{ isMobile }">
    <UiSidebar variant="inset">
      <UiSidebarHeader>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiSidebarMenuButton size="lg" as-child>
              <NuxtLink to="#">
                <div
                  class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                >
                  <Icon name="lucide:zap" class="size-4" />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">UI Thing</span>
                  <span class="truncate text-xs">Admin dashboard</span>
                </div>
              </NuxtLink>
            </UiSidebarMenuButton>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
        <div class="grid grid-cols-2 gap-2">
          <UiButton size="sm" class="gap-1.5">
            <Icon name="lucide:plus" class="size-4" />
            New
          </UiButton>
          <UiButton size="sm" variant="outline" class="gap-1.5">
            <Icon name="lucide:upload" class="size-4" />
            Upload
          </UiButton>
        </div>
      </UiSidebarHeader>

      <UiSidebarContent>
        <UiSidebarGroup v-for="group in groups" :key="group.label">
          <UiSidebarGroupLabel :label="group.label" />
          <UiSidebarMenu>
            <template v-for="item in group.items" :key="item.title">
              <UiCollapsible v-if="item.children" v-slot="{ open }" as-child>
                <UiSidebarMenuItem>
                  <UiCollapsibleTrigger as-child>
                    <UiSidebarMenuButton>
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
                      <UiSidebarMenuSubItem v-for="child in item.children" :key="child">
                        <UiSidebarMenuSubButton as-child>
                          <NuxtLink to="#">{{ child }}</NuxtLink>
                        </UiSidebarMenuSubButton>
                      </UiSidebarMenuSubItem>
                    </UiSidebarMenuSub>
                  </UiCollapsibleContent>
                </UiSidebarMenuItem>
              </UiCollapsible>
              <UiSidebarMenuItem v-else>
                <UiSidebarMenuButton as-child :is-active="item.title === active">
                  <NuxtLink to="#" @click.prevent="active = item.title">
                    <Icon :name="item.icon" />
                    <span>{{ item.title }}</span>
                  </NuxtLink>
                </UiSidebarMenuButton>
                <UiSidebarMenuBadge v-if="item.badge">{{ item.badge }}</UiSidebarMenuBadge>
              </UiSidebarMenuItem>
            </template>
          </UiSidebarMenu>
        </UiSidebarGroup>
      </UiSidebarContent>

      <UiSidebarFooter>
        <div class="rounded-lg border p-3">
          <div class="flex items-center justify-between text-xs">
            <span class="font-medium">Storage</span>
            <span class="text-muted-foreground">68% used</span>
          </div>
          <UiProgress :model-value="68" class="mt-2 h-1.5" />
        </div>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton size="lg">
                  <UiAvatar
                    src="https://i.pravatar.cc/80?img=32"
                    fallback="SO"
                    class="size-8 rounded-lg"
                  />
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">Sam Okafor</span>
                    <span class="truncate text-xs">sam@uithing.com</span>
                  </div>
                  <Icon name="lucide:chevrons-up-down" class="ml-auto size-4" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent
                class="min-w-52"
                :side="isMobile ? 'bottom' : 'right'"
                align="end"
              >
                <UiDropdownMenuItem icon="lucide:user" title="Account" />
                <UiDropdownMenuItem icon="lucide:credit-card" title="Billing" />
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
  type Item = { title: string; icon: string; badge?: string; children?: string[] };

  const groups: { label: string; items: Item[] }[] = [
    {
      label: "Main",
      items: [
        { title: "Dashboard", icon: "lucide:house" },
        { title: "Analytics", icon: "lucide:chart-line", badge: "New" },
        { title: "Reports", icon: "lucide:file-bar-chart" },
      ],
    },
    {
      label: "Management",
      items: [
        { title: "Users", icon: "lucide:users", children: ["All users", "Roles", "Invitations"] },
        { title: "Projects", icon: "lucide:folder", badge: "12" },
        { title: "Tasks", icon: "lucide:circle-check", badge: "5" },
      ],
    },
    {
      label: "Support",
      items: [
        { title: "Documentation", icon: "lucide:book-open" },
        { title: "Help center", icon: "lucide:life-buoy" },
      ],
    },
  ];

  const active = ref("Dashboard");
</script>
