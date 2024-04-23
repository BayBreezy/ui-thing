<template>
  <aside class="flex h-screen">
    <UiScrollArea class="z-10 h-full w-[300px] border-r">
      <div class="flex h-screen flex-col pt-7">
        <NuxtLink to="#" class="flex w-full items-center gap-3 px-5">
          <UiAvatar src="/icon.png" alt="Company Logo" class="size-7 rounded object-contain" />
          <span class="text-xl font-bold">{{ COMPANY_NAME }}</span>
        </NuxtLink>
        <div class="my-6 px-5">
          <UiVeeInput v-model="search" placeholder="Search..." icon="lucide:search" />
        </div>
        <div class="flex h-full grow flex-col px-5 pb-8">
          <div class="mb-10 flex flex-col gap-10">
            <nav class="flex flex-col gap-1">
              <template v-for="(n, i) in topNav" :key="i">
                <UiButton
                  size="default"
                  :to="n.link"
                  variant="ghost"
                  class="justify-start gap-4 px-3"
                  @click="setMiniBarItems(n.items)"
                >
                  <Icon v-if="n.icon" :name="n.icon" class="size-4 text-muted-foreground" />
                  <span>{{ n.title }}</span>
                  <Icon
                    v-if="n.items"
                    name="lucide:chevron-right"
                    class="ml-auto size-4 text-muted-foreground/80"
                  />
                </UiButton>
              </template>
            </nav>
            <nav class="mt-auto flex flex-col gap-1">
              <template v-for="(n, i) in bottomNav" :key="i">
                <UiButton
                  :to="n.link"
                  size="default"
                  variant="ghost"
                  class="justify-start gap-4 px-3"
                  @click="setMiniBarItems(n.items)"
                >
                  <Icon v-if="n.icon" :name="n.icon" class="size-4 text-muted-foreground" />
                  <span>{{ n.title }}</span>
                  <Icon
                    v-if="n.items"
                    name="lucide:chevron-right"
                    class="ml-auto size-4 text-muted-foreground/80"
                  />
                </UiButton>
              </template>
            </nav>
          </div>
          <div class="mt-auto rounded-lg bg-muted/50 p-4 text-sm">
            <div class="flex items-center justify-between">
              <p class="font-semibold">Used space</p>
              <UiButton class="size-6" size="icon-sm" variant="ghost">
                <Icon name="lucide:x" class="size-4 text-muted-foreground" />
              </UiButton>
            </div>
            <p class="mt-3 text-muted-foreground">
              Your team has used 80% of your available space. Need more?
            </p>
            <UiProgress class="my-4 h-2" :model-value="80" />

            <div class="flex items-center gap-1">
              <UiButton class="px-2" variant="ghost" size="sm">Dismiss</UiButton>
              <UiButton class="px-2 text-sky-500 hover:text-sky-600" variant="ghost" size="sm"
                >Upgrade plan</UiButton
              >
            </div>
          </div>
          <UiDivider class="my-6" />
          <div class="flex items-center gap-3 pb-8">
            <div class="flex items-center gap-3">
              <UiAvatar :src="user.avatar" class="size-10" />
              <div>
                <p class="text-sm font-semibold" v-html="user.username" />
                <p class="text-sm text-muted-foreground" v-html="user.email" />
              </div>
            </div>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton class="ml-auto shrink-0" size="icon-sm" variant="ghost">
                  <Icon name="lucide:log-out" class="size-4 text-muted-foreground" />
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent side="right" align="center">Logout</UiTooltipContent>
            </UiTooltip>
          </div>
        </div>
      </div>
    </UiScrollArea>
    <TransitionSlide ref="sideBarRef" :offset="[-30, 0]">
      <UiScrollArea v-if="showMiniSidebar" class="h-full w-[250px] border-r px-5 py-4">
        <nav class="flex flex-col gap-1">
          <template v-for="(n, i) in miniSidebarItems" :key="i">
            <UiButton :to="n.link" size="default" variant="ghost" class="justify-start gap-4 px-3">
              <Icon v-if="n.icon" :name="n.icon" class="size-4 text-muted-foreground" />
              <span>{{ n.title }}</span>
            </UiButton>
          </template>
        </nav>
      </UiScrollArea>
    </TransitionSlide>
  </aside>
</template>

<script lang="ts" setup>
  const search = ref<string>("");
  const showMiniSidebar = ref<boolean>(false);
  const miniSidebarItems = ref<Array<any>>();
  const sideBarRef = ref<any>();

  onClickOutside(sideBarRef, () => {
    showMiniSidebar.value = false;
    miniSidebarItems.value = [];
  });

  const user = {
    avatar: "https://randomuser.me/api/portraits/med/men/2.jpg",
    username: "Jane Doe",
    email: "muzcad@he.tg",
  };

  const topNav = [
    { title: "Home", icon: "lucide:home", link: "#" },
    {
      title: "Dashboard",
      icon: "lucide:bar-chart-3",
      items: [
        { title: "Overview", link: "#", icon: "lucide:activity" },
        { title: "Notifications", link: "#", icon: "lucide:bell" },
        { title: "Analytics", link: "#", icon: "lucide:pie-chart" },
        { title: "Reports", link: "#", icon: "lucide:file-text" },
      ],
    },
    { title: "Projects", icon: "lucide:folder-dot", link: "#" },
    { title: "Tasks", icon: "lucide:list-checks", link: "#" },
    { title: "Users", icon: "lucide:users", link: "#" },
  ];
  const bottomNav = [
    { title: "Support", icon: "lucide:life-buoy", link: "#" },
    {
      title: "Settings",
      icon: "lucide:settings-2",
      items: [
        { title: "Profile", link: "#", icon: "lucide:user" },
        { title: "Account", link: "#", icon: "lucide:settings" },
        { title: "Security", link: "#", icon: "lucide:shield" },
        { title: "Billing", link: "#", icon: "lucide:credit-card" },
      ],
    },
  ];

  const setMiniBarItems = (items?: any) => {
    if (!items) return (showMiniSidebar.value = false);
    miniSidebarItems.value = items;
    showMiniSidebar.value = true;
  };
</script>
