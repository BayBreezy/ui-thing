<template>
  <!--
    Two tier mail style sidebar with an icon rail and a list panel
    Features: Icon rail that switches the section, second panel with a searchable conversation list, unread filter switch, selected state, collapses on mobile
  -->
  <UiSidebarProvider class="min-h-[34rem] [--sidebar-width:22rem]!">
    <UiSidebar
      collapsible="icon"
      class="overflow-hidden *:data-[sidebar=sidebar]:flex-row *:data-[sidebar=sidebar]:bg-(--sidebar)"
    >
      <!-- Icon rail -->
      <UiSidebar collapsible="none" class="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
        <UiSidebarHeader>
          <UiSidebarMenu>
            <UiSidebarMenuItem>
              <UiSidebarMenuButton size="lg" as-child class="md:h-8 md:p-0">
                <NuxtLink to="#">
                  <div
                    class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                  >
                    <Icon name="lucide:send" class="size-4" />
                  </div>
                </NuxtLink>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarHeader>
        <UiSidebarContent>
          <UiSidebarGroup>
            <UiSidebarGroupContent class="px-1.5 md:px-0">
              <UiSidebarMenu>
                <UiSidebarMenuItem v-for="item in folders" :key="item.title">
                  <UiSidebarMenuButton
                    :tooltip="item.title"
                    class="px-2.5 md:px-2"
                    :is-active="active.title === item.title"
                    @click="active = item"
                  >
                    <Icon :name="item.icon" />
                    <span>{{ item.title }}</span>
                  </UiSidebarMenuButton>
                  <UiSidebarMenuBadge v-if="item.unread" class="md:hidden">
                    {{ item.unread }}
                  </UiSidebarMenuBadge>
                </UiSidebarMenuItem>
              </UiSidebarMenu>
            </UiSidebarGroupContent>
          </UiSidebarGroup>
        </UiSidebarContent>
        <UiSidebarFooter>
          <UiAvatar src="https://i.pravatar.cc/80?img=47" fallback="MC" class="size-8 rounded-lg" />
        </UiSidebarFooter>
      </UiSidebar>

      <!-- Conversation list -->
      <UiSidebar collapsible="none" class="hidden flex-1 md:flex">
        <UiSidebarHeader class="gap-3.5 border-b p-4">
          <div class="flex w-full items-center justify-between">
            <div class="text-foreground text-base font-semibold">{{ active.title }}</div>
            <label class="flex items-center gap-2 text-sm">
              <span>Unread</span>
              <UiSwitch v-model="unreadOnly" class="shadow-none" />
            </label>
          </div>
          <div class="relative">
            <Icon
              name="lucide:search"
              class="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 opacity-50"
            />
            <UiSidebarInput v-model="query" placeholder="Type to search…" class="pl-8" />
          </div>
        </UiSidebarHeader>
        <UiSidebarContent>
          <UiSidebarGroup class="px-0">
            <UiSidebarGroupContent>
              <button
                v-for="mail in filtered"
                :key="mail.id"
                type="button"
                class="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full flex-col items-start gap-2 border-b p-4 text-left text-sm leading-tight whitespace-nowrap last:border-b-0"
                :class="selected === mail.id && 'bg-sidebar-accent'"
                @click="selected = mail.id"
              >
                <div class="flex w-full items-center gap-2">
                  <span
                    v-if="mail.unread"
                    class="bg-primary size-2 shrink-0 rounded-full"
                    aria-label="Unread"
                  />
                  <span class="font-medium" :class="!mail.unread && 'text-muted-foreground'">
                    {{ mail.name }}
                  </span>
                  <span class="text-muted-foreground ml-auto text-xs">{{ mail.date }}</span>
                </div>
                <span class="font-medium">{{ mail.subject }}</span>
                <span
                  class="text-muted-foreground line-clamp-2 w-[260px] text-xs whitespace-break-spaces"
                >
                  {{ mail.teaser }}
                </span>
              </button>
              <p v-if="!filtered.length" class="text-muted-foreground p-6 text-center text-sm">
                No messages match.
              </p>
            </UiSidebarGroupContent>
          </UiSidebarGroup>
        </UiSidebarContent>
      </UiSidebar>
    </UiSidebar>

    <UiSidebarInset>
      <header
        class="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b px-4"
      >
        <UiSidebarTrigger class="-ml-1" />
        <UiSeparator orientation="vertical" class="mr-2 h-4" />
        <span class="text-muted-foreground text-sm">{{ active.title }}</span>
        <Icon name="lucide:chevron-right" class="text-muted-foreground size-3.5" />
        <span class="text-sm font-medium">
          {{ current?.subject ?? "Select a message" }}
        </span>
      </header>
      <div v-if="current" class="flex flex-1 flex-col gap-4 p-6">
        <div class="flex items-center gap-3">
          <UiAvatar :fallback="current.name[0]" class="size-10" />
          <div>
            <p class="text-sm font-semibold">{{ current.name }}</p>
            <p class="text-muted-foreground text-xs">{{ current.date }}</p>
          </div>
        </div>
        <h2 class="text-xl font-bold tracking-tight">{{ current.subject }}</h2>
        <p class="text-muted-foreground max-w-xl text-sm">{{ current.teaser }}</p>
      </div>
      <div v-else class="text-muted-foreground flex flex-1 items-center justify-center text-sm">
        Choose a message from the list.
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  const folders = [
    { title: "Inbox", icon: "lucide:inbox", unread: 3 },
    { title: "Drafts", icon: "lucide:file", unread: 0 },
    { title: "Sent", icon: "lucide:send", unread: 0 },
    { title: "Junk", icon: "lucide:archive-x", unread: 1 },
    { title: "Trash", icon: "lucide:trash-2", unread: 0 },
  ];
  const active = ref(folders[0]!);

  const mails = [
    {
      id: 1,
      name: "Priya Nair",
      subject: "Design review on Friday",
      date: "09:34 AM",
      unread: true,
      teaser:
        "Can we move the review to the afternoon? I'd like to include the latest prototype so everyone can click through it.",
    },
    {
      id: 2,
      name: "Liam Carter",
      subject: "Weekly sync notes",
      date: "Yesterday",
      unread: true,
      teaser:
        "Here is a short summary of what we agreed on, along with the open questions we still need to close.",
    },
    {
      id: 3,
      name: "Sam Okafor",
      subject: "Invoice for October",
      date: "Tuesday",
      unread: false,
      teaser:
        "Attached is the invoice for last month. Let me know if the PO number needs to change before it goes out.",
    },
    {
      id: 4,
      name: "Jordan Lee",
      subject: "Welcome to the team",
      date: "Last week",
      unread: false,
      teaser:
        "We're so glad you're joining. Your onboarding plan for the first two weeks is linked below.",
    },
  ];

  const query = ref("");
  const unreadOnly = ref(false);
  const selected = ref<number>();

  const filtered = computed(() =>
    mails.filter(
      (mail) =>
        (!unreadOnly.value || mail.unread) &&
        `${mail.name} ${mail.subject} ${mail.teaser}`
          .toLowerCase()
          .includes(query.value.toLowerCase())
    )
  );
  const current = computed(() => mails.find((mail) => mail.id === selected.value));
</script>
