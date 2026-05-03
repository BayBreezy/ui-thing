<template>
  <aside class="flex h-screen">
    <div class="bg-muted/30 flex w-16 flex-col items-center border-r py-4">
      <Motion
        :initial="{ opacity: 0, y: -10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 25 }"
        class="mb-10"
      >
        <NuxtLink to="#">
          <UiAvatar src="/icon.png" alt="Company Logo" class="size-8 rounded object-contain" />
        </NuxtLink>
      </Motion>

      <nav class="flex flex-1 flex-col gap-2">
        <Motion
          v-for="(item, i) in mainNav"
          :key="i"
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }"
        >
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton
                :variant="item.active == activeSection?.active ? 'secondary' : 'ghost'"
                size="icon"
                @click="setActiveSection(item)"
              >
                <Icon :name="item.icon" class="size-[18px]" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent side="right">{{ item.title }}</UiTooltipContent>
          </UiTooltip>
        </Motion>
      </nav>

      <UiDivider class="my-2" />

      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton variant="ghost" size="icon">
            <Icon name="lucide:settings" class="size-[18px]" />
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent side="right">Settings</UiTooltipContent>
      </UiTooltip>

      <UiDropdownMenu>
        <UiDropdownMenuTrigger>
          <UiAvatar :src="user.avatar" class="mt-4" />
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent side="right">
          <UiDropdownMenuLabel class="flex flex-col">
            <span>{{ user.username }}</span>
            <span class="text-muted-foreground text-sm font-normal">{{ user.email }}</span>
          </UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem title="View profile" icon="lucide:user" />
          <UiDropdownMenuItem title="Edit profile" icon="lucide:pen" />
          <UiDropdownMenuItem title="Change password" icon="lucide:lock" />
          <UiDropdownMenuItem title="Delete account" icon="lucide:trash" />
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem variant="destructive" title="Logout" icon="lucide:log-out" />
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>

    <div v-if="activeSection" class="bg-background w-[280px] border-r">
      <UiScrollArea class="h-full">
        <div class="flex h-screen flex-col p-4">
          <div class="mb-6">
            <div class="mb-2 flex items-center gap-2">
              <Icon :name="activeSection.icon" class="text-primary size-5" />
              <h2 class="font-semibold">{{ activeSection.title }}</h2>
            </div>
            <p class="text-muted-foreground text-sm">{{ activeSection.description }}</p>
          </div>

          <div class="mb-4">
            <UiVeeInput v-model="search" placeholder="Search..." icon="lucide:search" />
          </div>

          <nav class="flex flex-1 flex-col gap-1">
            <Motion
              v-for="(item, i) in activeSection.items"
              :key="`${item.title}-${i}-${item.icon}`"
              :initial="{ opacity: 0, x: -10 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ delay: i * 0.05 }"
            >
              <UiButton
                :to="item.link"
                size="sm"
                variant="ghost"
                class="w-full justify-start gap-3 px-2"
              >
                <Icon v-if="item.icon" :name="item.icon" class="text-muted-foreground size-4" />
                <span>{{ item.title }}</span>
                <span v-if="item.count" class="text-muted-foreground ml-auto text-xs">
                  {{ item.count }}
                </span>
              </UiButton>
            </Motion>
          </nav>

          <UiButton class="mt-auto w-full" size="sm">
            <Icon name="lucide:plus" class="size-4" />
            New {{ activeSection.title }}
          </UiButton>
        </div>
      </UiScrollArea>
    </div>
  </aside>
</template>

<script lang="ts" setup>
  type NavItem = {
    title: string;
    icon: string;
    active: boolean;
    description: string;
    items: Array<{
      title: string;
      link: string;
      icon?: string;
      count?: number;
    }>;
  };

  const search = ref<string>("");
  const activeSection = ref<NavItem | null>(null);

  const user = {
    avatar: "https://randomuser.me/api/portraits/med/women/67.jpg",
    username: "Sarah Smith",
    email: "sarah.smith@example.com",
  };

  const mainNav: Array<NavItem> = [
    {
      title: "Projects",
      icon: "lucide:folder",
      active: false,
      description: "Manage your projects and workspaces",
      items: [
        { title: "All Projects", link: "#", icon: "lucide:grid-3x3", count: 24 },
        { title: "Active", link: "#", icon: "lucide:play", count: 8 },
        { title: "Archived", link: "#", icon: "lucide:archive", count: 16 },
        { title: "Templates", link: "#", icon: "lucide:layout-template" },
      ],
    },
    {
      title: "Tasks",
      icon: "lucide:check-square",
      active: false,
      description: "View and manage your tasks",
      items: [
        { title: "My Tasks", link: "#", icon: "lucide:user", count: 12 },
        { title: "Assigned to me", link: "#", icon: "lucide:user-check", count: 8 },
        { title: "Completed", link: "#", icon: "lucide:check-circle-2", count: 45 },
        { title: "Overdue", link: "#", icon: "lucide:alert-circle", count: 3 },
      ],
    },
    {
      title: "Team",
      icon: "lucide:users",
      active: false,
      description: "Collaborate with your team members",
      items: [
        { title: "All Members", link: "#", icon: "lucide:users", count: 32 },
        { title: "Departments", link: "#", icon: "lucide:building-2" },
        { title: "Invitations", link: "#", icon: "lucide:mail", count: 2 },
        { title: "Activity", link: "#", icon: "lucide:activity" },
      ],
    },
    {
      title: "Messages",
      icon: "lucide:message-square",
      active: false,
      description: "Team communication and messages",
      items: [
        { title: "Inbox", link: "#", icon: "lucide:inbox", count: 5 },
        { title: "Sent", link: "#", icon: "lucide:send" },
        { title: "Drafts", link: "#", icon: "lucide:file-edit", count: 2 },
        { title: "Archived", link: "#", icon: "lucide:archive" },
      ],
    },
  ];

  const setActiveSection = (item: any) => {
    mainNav.forEach((nav) => (nav.active = false));
    item.active = true;
    activeSection.value = item;
  };

  // Set first item as active by default
  onMounted(() => {
    setActiveSection(mainNav[0]);
  });
</script>
