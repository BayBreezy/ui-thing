<template>
  <!--
    Settings navigation sidebar
    Features: Back to app link, grouped settings links with icons, active page state that updates the content, upgrade callout, designed to sit beside a settings page
  -->
  <UiSidebarProvider>
    <UiSidebar class="*:data-[sidebar=sidebar]:bg-(--sidebar)">
      <UiSidebarHeader>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiSidebarMenuButton as-child class="text-muted-foreground">
              <NuxtLink to="#">
                <Icon name="lucide:arrow-left" />
                <span>Back to app</span>
              </NuxtLink>
            </UiSidebarMenuButton>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
        <div class="px-2">
          <h2 class="text-lg font-bold tracking-tight">Settings</h2>
          <p class="text-muted-foreground text-xs">Manage your account and workspace</p>
        </div>
      </UiSidebarHeader>

      <UiSidebarContent>
        <UiSidebarGroup v-for="group in groups" :key="group.label">
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
      </UiSidebarContent>

      <UiSidebarFooter>
        <div class="from-primary/10 to-primary/0 rounded-xl border bg-linear-to-br p-4">
          <div class="flex items-center gap-2">
            <Icon name="lucide:sparkles" class="text-primary size-4" />
            <p class="text-sm font-semibold">Upgrade to Pro</p>
          </div>
          <p class="text-muted-foreground mt-1 text-xs">
            Unlock unlimited projects, advanced roles and priority support.
          </p>
          <UiButton size="sm" class="mt-3 w-full">See plans</UiButton>
        </div>
      </UiSidebarFooter>
    </UiSidebar>

    <UiSidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <UiSidebarTrigger class="-ml-1" />
        <UiSeparator orientation="vertical" class="mr-2 h-4" />
        <UiBreadcrumbs :items="crumbs" />
      </header>
      <div class="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h2 class="text-xl font-bold tracking-tight">{{ active }}</h2>
          <p class="text-muted-foreground text-sm">
            Update your {{ active.toLowerCase() }} settings.
          </p>
        </div>
        <div class="bg-muted/50 h-24 rounded-xl" />
        <div class="bg-muted/50 min-h-40 flex-1 rounded-xl" />
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  import type { BreadcrumbItem } from "@/components/Ui/Breadcrumbs.vue";

  const groups = [
    {
      label: "Account",
      items: [
        { title: "Profile", icon: "lucide:user" },
        { title: "Security", icon: "lucide:shield" },
        { title: "Notifications", icon: "lucide:bell", badge: "2" },
        { title: "Appearance", icon: "lucide:palette" },
      ],
    },
    {
      label: "Workspace",
      items: [
        { title: "General", icon: "lucide:building-2" },
        { title: "Members", icon: "lucide:users" },
        { title: "Billing", icon: "lucide:credit-card" },
        { title: "Integrations", icon: "lucide:plug" },
        { title: "API keys", icon: "lucide:key-round" },
      ],
    },
  ];

  const active = ref("Profile");

  const crumbs = computed<BreadcrumbItem[]>(() => [
    { label: "Settings", link: "#" },
    { label: active.value, link: "#" },
  ]);
</script>
