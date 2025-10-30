<template>
  <div class="relative min-h-screen">
    <Motion
      v-if="!isExpanded"
      :initial="{ opacity: 0, scale: 0 }"
      :animate="{ opacity: 1, scale: 1, transition: { delay: 0.2 } }"
      class="absolute top-4 left-3"
    >
      <!-- absolute button that is displayed when sidebar is collapsed -->
      <UiButton size="icon-sm" variant="outline" @click="isExpanded = !isExpanded">
        <Icon name="lucide:panel-left-close" class="size-4 text-muted-foreground" />
      </UiButton>
    </Motion>

    <aside
      class="relative flex h-screen w-[280px] flex-col overflow-y-auto border-r bg-muted/30 transition-transform duration-300 ease-in-out"
      :class="[isExpanded ? 'translate-x-0' : '-translate-x-full']"
    >
      <div class="flex items-center justify-between border-b p-4">
        <NuxtLink to="#" class="flex items-center gap-2">
          <UiAvatar src="/icon.png" alt="Company Logo" class="size-7 rounded object-contain" />
          <span class="font-bold">{{ COMPANY_NAME }}</span>
        </NuxtLink>
        <UiButton size="icon-sm" variant="ghost" @click="isExpanded = !isExpanded">
          <Icon name="lucide:panel-left-close" class="size-4 text-muted-foreground" />
        </UiButton>
      </div>

      <UiScrollArea>
        <div class="p-4">
          <div class="mb-4">
            <UiVeeInput v-model="search" placeholder="Search..." icon="lucide:search" size="sm" />
          </div>

          <div class="mb-6">
            <div class="mb-2 flex items-center justify-between px-2">
              <span class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >Main Menu</span
              >
              <UiBadge variant="secondary" class="h-5 px-1.5 text-xs">{{
                navigation.length
              }}</UiBadge>
            </div>
            <nav class="flex flex-col gap-0.5">
              <Motion
                v-for="(n, i) in navigation"
                :key="i"
                :initial="{ opacity: 0, x: -10 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ delay: i * 0.05, type: 'spring', stiffness: 200, damping: 25 }"
              >
                <UiButton
                  :to="n.link"
                  size="sm"
                  variant="ghost"
                  class="w-full justify-start gap-3 px-2"
                >
                  <Icon v-if="n.icon" :name="n.icon" class="size-4 text-muted-foreground" />
                  <span>{{ n.title }}</span>
                  <UiBadge v-if="n.badge" variant="secondary" class="ml-auto h-5 px-1.5 text-xs">
                    {{ n.badge }}
                  </UiBadge>
                </UiButton>
              </Motion>
            </nav>
          </div>

          <div class="mb-6">
            <div class="mb-2 flex items-center justify-between px-2">
              <span class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >Workspaces</span
              >
              <UiButton size="icon-sm" variant="ghost">
                <Icon name="lucide:plus" class="size-3 text-muted-foreground" />
              </UiButton>
            </div>
            <nav class="flex flex-col gap-0.5">
              <Motion
                v-for="(w, i) in workspaces"
                :key="i"
                :initial="{ opacity: 0, x: -10 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 25 }"
              >
                <UiButton
                  :to="w.link"
                  size="sm"
                  variant="ghost"
                  class="w-full justify-start gap-3 px-2"
                >
                  <div class="size-5 shrink-0 rounded" :style="{ backgroundColor: w.color }" />
                  <span>{{ w.title }}</span>
                </UiButton>
              </Motion>
            </nav>
          </div>

          <div>
            <div class="mb-2 px-2">
              <span class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >Settings</span
              >
            </div>
            <nav class="flex flex-col gap-0.5">
              <Motion
                v-for="(s, i) in settings"
                :key="i"
                :initial="{ opacity: 0, x: -10 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 25 }"
              >
                <UiButton
                  :to="s.link"
                  size="sm"
                  variant="ghost"
                  class="w-full justify-start gap-3 px-2"
                >
                  <Icon v-if="s.icon" :name="s.icon" class="size-4 text-muted-foreground" />
                  <span>{{ s.title }}</span>
                </UiButton>
              </Motion>
            </nav>
          </div>
        </div>
      </UiScrollArea>

      <div class="mt-auto shrink-0 border-t p-4">
        <div class="flex items-center gap-3">
          <UiAvatar :src="user.avatar" class="size-9" />
          <div class="flex-1 overflow-hidden">
            <p class="truncate text-sm font-semibold">{{ user.username }}</p>
            <p class="truncate text-xs text-muted-foreground">{{ user.role }}</p>
          </div>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton size="icon-sm" variant="ghost">
                <Icon name="lucide:more-horizontal" class="size-4 text-muted-foreground" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" side="right">
              <UiDropdownMenuItem title="Profile" icon="lucide:user" />
              <UiDropdownMenuItem title="Settings" icon="lucide:settings" />
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem title="Logout" icon="lucide:log-out" variant="destructive" />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
  const search = ref<string>("");
  const isExpanded = ref<boolean>(true);

  const user = {
    avatar: "https://randomuser.me/api/portraits/med/women/44.jpg",
    username: "Emily Davis",
    role: "Product Manager",
  };

  const navigation = [
    { title: "Overview", icon: "lucide:layout-dashboard", link: "#", badge: "3" },
    { title: "Inbox", icon: "lucide:inbox", link: "#", badge: "12" },
    { title: "Projects", icon: "lucide:folder", link: "#" },
    { title: "Tasks", icon: "lucide:check-square", link: "#", badge: "5" },
    { title: "Calendar", icon: "lucide:calendar", link: "#" },
    { title: "Documents", icon: "lucide:file-text", link: "#" },
  ];

  const workspaces = [
    { title: "Design Team", link: "#", color: "#8b5cf6" },
    { title: "Marketing", link: "#", color: "#ec4899" },
    { title: "Development", link: "#", color: "#3b82f6" },
  ];

  const settings = [
    { title: "Preferences", icon: "lucide:settings", link: "#" },
    { title: "Help & Support", icon: "lucide:help-circle", link: "#" },
  ];
</script>
