<template>
  <aside class="h-screen w-[300px] border-r">
    <UiScrollArea class="size-full">
      <div class="flex h-screen flex-col">
        <div class="border-b p-4">
          <NuxtLink to="#" class="flex items-center gap-3">
            <UiAvatar src="/icon.png" alt="Company Logo" class="size-8 rounded object-contain" />
            <div>
              <p class="font-bold">{{ COMPANY_NAME }}</p>
              <p class="text-muted-foreground text-xs">Admin Dashboard</p>
            </div>
          </NuxtLink>
        </div>

        <div class="flex-1 p-4">
          <div class="dark:bg-primary/5 relative mb-4 flex flex-col gap-2 rounded-lg border p-3">
            <div class="mb-2 flex items-center gap-2">
              <Icon name="lucide:zap" class="text-primary size-3.5" />
              <span class="text-sm font-medium">Quick Actions</span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <UiButton size="sm" variant="outline" class="h-auto py-2">
                <Icon name="lucide:plus" class="size-4" />
                <span class="text-xs">New</span>
              </UiButton>
              <UiButton size="sm" variant="outline" class="h-auto py-2">
                <Icon name="lucide:upload" class="size-4" />
                <span class="text-xs">Upload</span>
              </UiButton>
            </div>
            <UiBorderBeam :duration="15" />
          </div>

          <nav class="flex flex-col gap-6">
            <div v-for="(section, index) in sections" :key="index">
              <div class="mb-2 px-2">
                <span class="text-muted-foreground/70 text-xs tracking-wider uppercase">{{
                  section.title
                }}</span>
              </div>
              <div class="flex flex-col gap-0.5">
                <template v-for="(item, i) in section.items" :key="i">
                  <UiButton
                    v-if="!('children' in item)"
                    :to="item.link"
                    size="sm"
                    variant="ghost"
                    class="justify-start gap-3 px-2"
                  >
                    <Icon v-if="item.icon" :name="item.icon" class="text-muted-foreground size-4" />
                    <span>{{ item.title }}</span>
                    <UiBadge
                      v-if="item.badge"
                      :variant="(item.badgeVariant as any) || 'secondary'"
                      class="ml-auto h-5 px-1.5 text-xs"
                    >
                      {{ item.badge }}
                    </UiBadge>
                  </UiButton>
                  <UiCollapsible v-else>
                    <UiCollapsibleTrigger as-child>
                      <UiButton
                        size="sm"
                        variant="ghost"
                        class="group w-full justify-start gap-3 px-2"
                      >
                        <Icon
                          v-if="item.icon"
                          :name="item.icon"
                          class="text-muted-foreground size-4"
                        />
                        <span>{{ item.title }}</span>
                        <Icon
                          name="lucide:chevron-down"
                          class="text-muted-foreground ml-auto size-4 transition group-data-[state=open]:rotate-180"
                        />
                      </UiButton>
                    </UiCollapsibleTrigger>
                    <UiCollapsibleContent class="flex flex-col gap-0.5 pr-2 pl-6">
                      <UiButton
                        v-for="(child, ci) in item.children"
                        :key="ci"
                        :to="child.link"
                        size="sm"
                        variant="ghost"
                        class="justify-start gap-3 px-2"
                      >
                        <span>{{ child.title }}</span>
                      </UiButton>
                    </UiCollapsibleContent>
                  </UiCollapsible>
                </template>
              </div>
            </div>
          </nav>
        </div>

        <div class="border-t p-4">
          <div class="mb-3 flex items-center gap-3">
            <UiAvatar :src="user.avatar" class="size-10" />
            <div class="flex-1">
              <p class="text-sm font-semibold">{{ user.username }}</p>
              <p class="text-muted-foreground text-xs">{{ user.email }}</p>
            </div>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiButton size="icon-sm" variant="ghost">
                  <Icon name="lucide:more-vertical" class="text-muted-foreground size-4" />
                </UiButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent align="end">
                <UiDropdownMenuItem>
                  <Icon name="lucide:user" class="size-4" />
                  Profile
                </UiDropdownMenuItem>
                <UiDropdownMenuItem>
                  <Icon name="lucide:settings" class="size-4" />
                  Settings
                </UiDropdownMenuItem>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem variant="destructive">
                  <Icon name="lucide:log-out" class="size-4" />
                  Sign out
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </div>
          <UiProgress :model-value="storageUsed" class="h-1.5" />
          <p class="text-muted-foreground mt-2 text-xs">{{ storageUsed }}% storage used</p>
        </div>
      </div>
    </UiScrollArea>
  </aside>
</template>

<script lang="ts" setup>
  type Child = { title: string; link: string };
  type Item = {
    title: string;
    icon?: string;
    link?: string;
    badge?: string;
    badgeVariant?: string;
    children?: Child[];
  };
  type Section = { title: string; items: Item[] };

  const storageUsed = 68;

  const user = {
    avatar: "https://randomuser.me/api/portraits/med/men/75.jpg",
    username: "Alex Morgan",
    email: "alex@company.com",
  };

  const sections: Section[] = [
    {
      title: "Main",
      items: [
        { title: "Dashboard", icon: "lucide:home", link: "#" },
        {
          title: "Analytics",
          icon: "lucide:bar-chart-2",
          link: "#",
          badge: "New",
          badgeVariant: "default",
        },
        { title: "Reports", icon: "lucide:file-text", link: "#" },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "Users",
          icon: "lucide:users",
          children: [
            { title: "All Users", link: "#" },
            { title: "Roles", link: "#" },
            { title: "Permissions", link: "#" },
          ],
        },
        { title: "Projects", icon: "lucide:folder", link: "#", badge: "12" },
        { title: "Tasks", icon: "lucide:check-circle", link: "#", badge: "5" },
      ],
    },
    {
      title: "Support",
      items: [
        { title: "Documentation", icon: "lucide:book-open", link: "#" },
        { title: "Help Center", icon: "lucide:help-circle", link: "#" },
      ],
    },
  ];
</script>
