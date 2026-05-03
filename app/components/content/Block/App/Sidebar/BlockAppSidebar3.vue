<template>
  <DefineNavItem v-slot="{ item: n }">
    <UiButton
      :to="n.link"
      :size="isExpanded ? 'default' : 'icon'"
      variant="ghost"
      class="relative w-full shrink-0 justify-start gap-3 overflow-hidden p-3"
    >
      <Icon v-if="n.icon" :name="n.icon" class="text-muted-foreground size-5 shrink-0" />
      <span
        class="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        {{ n.title }}
      </span>
    </UiButton>
  </DefineNavItem>

  <aside
    class="group flex h-screen w-16 flex-col border-r py-4 transition-all duration-300 ease-in-out hover:w-[240px]"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <div class="mb-8 flex items-center overflow-hidden px-3">
      <NuxtLink to="#" class="flex items-center gap-3">
        <UiAvatar
          src="/icon.png"
          alt="Company Logo"
          class="size-8 shrink-0 rounded object-contain"
        />
        <span
          class="text-lg font-bold whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          {{ COMPANY_NAME }}
        </span>
      </NuxtLink>
    </div>

    <UiScrollArea class="size-full">
      <nav class="flex flex-col gap-2 px-2">
        <template v-for="(n, i) in navigation" :key="i">
          <NavItem :item="n" />
        </template>
      </nav>

      <UiDivider class="my-4" />

      <nav class="flex flex-col gap-2 px-2">
        <template v-for="(n, i) in bottomNavigation" :key="i">
          <NavItem :item="n" />
        </template>
      </nav>
    </UiScrollArea>

    <div class="mt-auto px-2">
      <UiButton variant="ghost" class="relative w-full justify-start gap-3 overflow-hidden pl-2">
        <UiAvatar :src="user.avatar" class="size-8 shrink-0" />
        <span
          class="text-sm font-semibold whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          {{ user.username }}
        </span>
      </UiButton>
    </div>
  </aside>
</template>

<script lang="ts" setup>
  const isExpanded = ref(false);

  const [DefineNavItem, NavItem] = createReusableTemplate<{
    item: {
      title: string;
      icon?: string;
      link: string;
    };
  }>();

  const user = {
    avatar: "https://randomuser.me/api/portraits/med/men/2.jpg",
    username: "Jane Doe",
  };

  const navigation = [
    { title: "Home", icon: "lucide:home", link: "#" },
    { title: "Dashboard", icon: "lucide:bar-chart-3", link: "#" },
    { title: "Projects", icon: "lucide:folder-dot", link: "#" },
    { title: "Tasks", icon: "lucide:list-checks", link: "#" },
    { title: "Calendar", icon: "lucide:calendar", link: "#" },
    { title: "Messages", icon: "lucide:mail", link: "#" },
    { title: "Team", icon: "lucide:users", link: "#" },
  ];

  const bottomNavigation = [
    { title: "Settings", icon: "lucide:settings", link: "#" },
    { title: "Help", icon: "lucide:help-circle", link: "#" },
  ];
</script>
