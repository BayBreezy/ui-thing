<template>
  <!--
    Application navbar with workspace switcher, search and account menu
    Features: Workspace dropdown, primary tabs with an active state, search field with a keyboard shortcut, notifications popover with an unread badge, user menu
  -->
  <header class="bg-background sticky top-0 z-20 border-b">
    <div class="flex h-14 items-center gap-3 px-4 lg:px-6">
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="ghost" class="gap-2 px-2">
            <span
              class="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md"
            >
              <Icon :name="workspace.icon" class="size-4" />
            </span>
            <span class="hidden font-semibold sm:inline">{{ workspace.name }}</span>
            <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="start" class="w-56">
          <UiDropdownMenuLabel class="text-muted-foreground text-xs"
            >Workspaces</UiDropdownMenuLabel
          >
          <UiDropdownMenuItem
            v-for="item in workspaces"
            :key="item.name"
            class="gap-2"
            @select="workspace = item"
          >
            <Icon :name="item.icon" class="size-4" />
            {{ item.name }}
            <Icon v-if="item.name === workspace.name" name="lucide:check" class="ml-auto size-4" />
          </UiDropdownMenuItem>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem icon="lucide:plus" title="New workspace" />
        </UiDropdownMenuContent>
      </UiDropdownMenu>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Main">
        <button
          v-for="tab in tabs"
          :key="tab"
          type="button"
          class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
          :class="
            active === tab
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          "
          :aria-current="active === tab ? 'page' : undefined"
          @click="active = tab"
        >
          {{ tab }}
        </button>
      </nav>

      <div class="relative ml-auto hidden w-full max-w-xs sm:block">
        <Icon
          name="lucide:search"
          class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <UiInput placeholder="Search" aria-label="Search" class="h-9 pr-12 pl-9" />
        <UiKbd class="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">⌘K</UiKbd>
      </div>

      <div class="ml-auto flex items-center gap-1 sm:ml-0">
        <UiPopover>
          <UiPopoverTrigger as-child>
            <UiButton variant="ghost" size="icon" class="relative" aria-label="Notifications">
              <Icon name="lucide:bell" class="size-5" />
              <span
                v-if="unread"
                class="bg-primary text-primary-foreground absolute top-1 right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-semibold"
              >
                {{ unread }}
              </span>
            </UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent align="end" class="w-80 p-0">
            <div class="flex items-center justify-between border-b px-4 py-3">
              <p class="text-sm font-semibold">Notifications</p>
              <UiButton variant="link" size="xs" :disabled="!unread" @click="unread = 0"
                >Mark all read</UiButton
              >
            </div>
            <ul class="divide-y">
              <li v-for="(item, i) in notifications" :key="item.text" class="flex gap-3 px-4 py-3">
                <UiAvatar :src="item.avatar" :fallback="item.name[0]" class="size-8" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm">
                    <span class="font-medium">{{ item.name }}</span> {{ item.text }}
                  </p>
                  <p class="text-muted-foreground text-xs">{{ item.time }}</p>
                </div>
                <span
                  v-if="i < unread"
                  class="bg-primary mt-1.5 size-2 rounded-full"
                  aria-label="Unread"
                />
              </li>
            </ul>
          </UiPopoverContent>
        </UiPopover>

        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <button type="button" class="ml-1 rounded-full" aria-label="Account menu">
              <UiAvatar src="https://i.pravatar.cc/80?img=47" fallback="MC" class="size-8" />
            </button>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="end" class="w-56">
            <UiDropdownMenuLabel>
              <p class="text-sm font-semibold">Maya Chen</p>
              <p class="text-muted-foreground text-xs font-normal">maya@uithing.com</p>
            </UiDropdownMenuLabel>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem icon="lucide:user" title="Profile" />
            <UiDropdownMenuItem icon="lucide:settings" title="Settings" />
            <UiDropdownMenuItem icon="lucide:credit-card" title="Billing" />
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem icon="lucide:log-out" title="Log out" />
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
  const workspaces = [
    { name: "Acme Inc.", icon: "lucide:building-2" },
    { name: "Northwind", icon: "lucide:compass" },
    { name: "Side project", icon: "lucide:rocket" },
  ];
  const workspace = ref(workspaces[0]!);

  const tabs = ["Overview", "Projects", "Reports", "Team"];
  const active = ref("Overview");

  const unread = ref(2);
  const notifications = [
    {
      name: "Priya",
      text: "commented on Design review",
      time: "2 minutes ago",
      avatar: "https://i.pravatar.cc/60?img=45",
    },
    {
      name: "Liam",
      text: "merged Billing page",
      time: "1 hour ago",
      avatar: "https://i.pravatar.cc/60?img=12",
    },
    {
      name: "Sam",
      text: "invited you to Q4 planning",
      time: "Yesterday",
      avatar: "https://i.pravatar.cc/60?img=32",
    },
  ];
</script>
