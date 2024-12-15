<template>
  <UiSidebarProvider v-slot="{ isMobile }" class="[--sidebar-width:280px_!important]">
    <!-- Main Sidebar -->
    <UiSidebar>
      <UiSidebarHeader class="h-16 border-b border-sidebar-border">
        <!-- Logged in user -->
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <UiAvatar class="h-8 w-8 rounded-lg">
                    <UiAvatarImage :src="data.user.avatar" :alt="data.user.name" />
                    <UiAvatarFallback class="rounded-lg">BB</UiAvatarFallback>
                  </UiAvatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ data.user.name }}</span>
                    <span class="truncate text-xs">{{ data.user.email }}</span>
                  </div>
                  <Icon name="lucide:chevrons-up-down" class="ml-auto size-4" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                :side="isMobile ? 'bottom' : 'right'"
                :side-offset="4"
                align="end"
              >
                <UiDropdownMenuLabel class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UiAvatar class="size-8 rounded-lg">
                      <UiAvatarImage :src="data.user.avatar" :alt="data.user.name" />
                      <UiAvatarFallback class="rounded-lg">BB</UiAvatarFallback>
                    </UiAvatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ data.user.name }}</span>
                      <span class="truncate text-xs">{{ data.user.email }}</span>
                    </div>
                  </div>
                </UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuGroup>
                  <UiDropdownMenuItem icon="lucide:sparkles" title="Upgrade to Pro" />
                </UiDropdownMenuGroup>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuGroup>
                  <UiDropdownMenuItem icon="lucide:badge-check" title="Account" />
                  <UiDropdownMenuItem icon="lucide:credit-card" title="Billing" />
                  <UiDropdownMenuItem icon="lucide:settings-2" title="Settings" />
                  <UiDropdownMenuItem icon="lucide:bell" title="Notifications" />
                </UiDropdownMenuGroup>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="lucide:log-out" title="Log out" />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarHeader>
      <UiSidebarContent>
        <!-- Datepicker -->
        <UiSidebarGroup class="px-0">
          <UiSidebarGroupContent>
            <div class="flex justify-center">
              <UiDatepicker
                :model-value="new Date()"
                borderless
                class="[--vc-bg:var(--sidebar-background)_!important]"
              />
            </div>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
        <UiSidebarSeparator class="mx-0" />
        <!-- Calendars -->
        <template v-for="(calendar, index) in data.calendars" :key="index">
          <UiSidebarGroup class="py-0">
            <UiCollapsible :default-open="index === 0" class="group/collapsible">
              <UiSidebarGroupLabel
                as-child
                class="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <UiCollapsibleTrigger>
                  {{ calendar.name }}
                  <Icon
                    name="lucide:chevron-right"
                    class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                  />
                </UiCollapsibleTrigger>
              </UiSidebarGroupLabel>
              <UiCollapsibleContent>
                <UiSidebarGroupContent>
                  <UiSidebarMenu>
                    <UiSidebarMenuItem v-for="(item, idx) in calendar.items" :key="idx">
                      <UiSidebarMenuButton>
                        <div
                          :data-active="idx < 2"
                          class="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary"
                        >
                          <Icon
                            mode="svg"
                            name="lucide:check"
                            class="hidden size-3 group-data-[active=true]/calendar-item:block"
                          />
                        </div>
                        {{ item }}
                      </UiSidebarMenuButton>
                    </UiSidebarMenuItem>
                  </UiSidebarMenu>
                </UiSidebarGroupContent>
              </UiCollapsibleContent>
            </UiCollapsible>
          </UiSidebarGroup>
          <UiSidebarSeparator class="mx-0" />
        </template>
      </UiSidebarContent>
      <UiSidebarFooter>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiSidebarMenuButton>
              <Icon name="lucide:plus" mode="svg" /> <span>New Calendar</span>
            </UiSidebarMenuButton>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarFooter>
      <UiSidebarRail />
    </UiSidebar>

    <UiSidebarInset>
      <header
        class="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4"
      >
        <UiSidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <UiBreadcrumbs :items="breadcrumbItems" />
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="grid auto-rows-min gap-4 md:grid-cols-5">
          <UiPlaceholder v-for="n in 20" :key="n" class="aspect-square rounded-xl" />
        </div>
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  const breadcrumbItems = computed(() => [
    { label: useDateFormat(new Date(), "MMMM DD, YYYY").value },
  ]);
  useSeoMeta({ title: "A sidebar with a calendar." });
  const data = {
    user: {
      name: "breezy",
      email: "m@example.com",
      avatar: "https://behonbaker.com/icon.png",
    },
    calendars: [
      { name: "My Calendars", items: ["Personal", "Work", "Family"] },
      { name: "Favorites", items: ["Holidays", "Birthdays"] },
      { name: "Other", items: ["Travel", "Reminders", "Deadlines"] },
    ],
  };
</script>
