<template>
  <div class="flex h-svh items-center justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton size="sm">Open Dialog</UiButton>
      </UiDialogTrigger>
      <UiDialogContent
        class="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]"
      >
        <UiDialogTitle class="sr-only">Settings</UiDialogTitle>
        <UiDialogDescription class="sr-only"> Customize your settings here. </UiDialogDescription>
        <UiSidebarProvider class="items-start">
          <UiSidebar collapsible="none" class="hidden md:flex">
            <UiSidebarContent>
              <UiSidebarGroup>
                <UiSidebarGroupContent>
                  <UiSidebarMenu>
                    <UiSidebarMenuItem v-for="item in data.nav" :key="item.name">
                      <UiSidebarMenuButton as-child :is-active="item.name === 'Messages & media'">
                        <NuxtLink href="#">
                          <Icon :name="item.icon" />
                          <span>{{ item.name }}</span>
                        </NuxtLink>
                      </UiSidebarMenuButton>
                    </UiSidebarMenuItem>
                  </UiSidebarMenu>
                </UiSidebarGroupContent>
              </UiSidebarGroup>
            </UiSidebarContent>
          </UiSidebar>
          <main class="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header
              class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
            >
              <div class="flex items-center gap-2 px-4">
                <UiBreadcrumbs :items="breadcrumbItems" />
              </div>
            </header>
            <div class="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              <div class="grid auto-rows-min gap-4 md:grid-cols-5">
                <UiPlaceholder v-for="n in 40" :key="n" class="aspect-square rounded-xl" />
              </div>
            </div>
          </main>
        </UiSidebarProvider>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  useSeoMeta({ title: "A sidebar in a dialog." });
  const breadcrumbItems = [
    { label: "Settings", href: "#" },
    { label: "Messages & media", href: "#" },
  ];
  const open = ref(true);
  const data = {
    nav: [
      { name: "Notifications", icon: "lucide:bell" },
      { name: "Navigation", icon: "lucide:menu" },
      { name: "Home", icon: "lucide:home" },
      { name: "Appearance", icon: "lucide:paintbrush" },
      { name: "Messages & media", icon: "lucide:message-circle" },
      { name: "Language & region", icon: "lucide:globe" },
      { name: "Accessibility", icon: "lucide:keyboard" },
      { name: "Mark as read", icon: "lucide:check" },
      { name: "Audio & video", icon: "lucide:video" },
      { name: "Connected accounts", icon: "lucide:link" },
      { name: "Privacy & visibility", icon: "lucide:lock" },
      { name: "Advanced", icon: "lucide:settings" },
    ],
  };
</script>
