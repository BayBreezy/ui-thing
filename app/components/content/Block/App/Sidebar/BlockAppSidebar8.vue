<template>
  <!--
    Chat conversations sidebar
    Features: New message button, search, pinned and recent groups, online presence dots, unread badges that clear when opened, selected conversation shown in the chat pane
  -->
  <UiSidebarProvider class="[--sidebar-width:20rem]!">
    <UiSidebar class="*:data-[sidebar=sidebar]:bg-(--sidebar)">
      <UiSidebarHeader class="gap-3">
        <div class="flex items-center justify-between px-1">
          <h2 class="text-lg font-bold tracking-tight">Messages</h2>
          <UiButton size="icon-sm" aria-label="New message">
            <Icon name="lucide:square-pen" class="size-4" />
          </UiButton>
        </div>
        <div class="relative">
          <Icon
            name="lucide:search"
            class="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 opacity-50"
          />
          <UiSidebarInput v-model="query" placeholder="Search conversations" class="pl-8" />
        </div>
      </UiSidebarHeader>

      <UiSidebarContent>
        <UiSidebarGroup v-for="group in grouped" :key="group.label">
          <UiSidebarGroupLabel :label="group.label" />
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="chat in group.items" :key="chat.id">
              <UiSidebarMenuButton
                class="h-auto items-start py-2.5"
                :is-active="selected === chat.id"
                @click="open(chat)"
              >
                <div class="relative shrink-0">
                  <UiAvatar :src="chat.avatar" :fallback="chat.name[0]" class="size-9" />
                  <span
                    v-if="chat.online"
                    class="ring-sidebar absolute right-0 bottom-0 size-2.5 rounded-full bg-green-500 ring-2"
                    aria-label="Online"
                  />
                </div>
                <div class="grid min-w-0 flex-1 gap-0.5 leading-tight">
                  <div class="flex items-center justify-between gap-2">
                    <span class="truncate text-sm font-medium">{{ chat.name }}</span>
                    <span class="text-muted-foreground shrink-0 text-xs">{{ chat.time }}</span>
                  </div>
                  <div class="flex items-center justify-between gap-2">
                    <span
                      class="truncate text-xs"
                      :class="chat.unread ? 'text-foreground font-medium' : 'text-muted-foreground'"
                    >
                      {{ chat.last }}
                    </span>
                    <span
                      v-if="chat.unread"
                      class="bg-primary text-primary-foreground flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                    >
                      {{ chat.unread }}
                    </span>
                  </div>
                </div>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroup>
        <p v-if="!grouped.length" class="text-muted-foreground p-6 text-center text-sm">
          No conversations found.
        </p>
      </UiSidebarContent>
    </UiSidebar>

    <UiSidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <UiSidebarTrigger class="-ml-1" />
        <template v-if="current">
          <UiAvatar :src="current.avatar" :fallback="current.name[0]" class="size-8" />
          <div class="leading-tight">
            <p class="text-sm font-semibold">{{ current.name }}</p>
            <p class="text-muted-foreground text-xs">{{ current.online ? "Online" : "Offline" }}</p>
          </div>
        </template>
        <span v-else class="text-sm font-medium">Messages</span>
      </header>
      <div v-if="current" class="flex flex-1 flex-col justify-end gap-3 p-4">
        <div class="bg-muted max-w-sm rounded-2xl rounded-bl-sm px-4 py-2 text-sm">
          {{ current.last }}
        </div>
        <div
          class="bg-primary text-primary-foreground ml-auto max-w-sm rounded-2xl rounded-br-sm px-4 py-2 text-sm"
        >
          Sounds good, thanks!
        </div>
      </div>
      <div v-else class="text-muted-foreground flex flex-1 items-center justify-center text-sm">
        Select a conversation to start chatting.
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  type Chat = {
    id: number;
    name: string;
    avatar: string;
    last: string;
    time: string;
    unread: number;
    online: boolean;
    pinned?: boolean;
  };

  const chats = reactive<Chat[]>([
    {
      id: 1,
      name: "Design team",
      avatar: "",
      last: "Priya: The new mockups are ready",
      time: "9:41",
      unread: 3,
      online: true,
      pinned: true,
    },
    {
      id: 2,
      name: "Liam Carter",
      avatar: "https://i.pravatar.cc/80?img=12",
      last: "Can you review my PR today?",
      time: "9:12",
      unread: 1,
      online: true,
      pinned: true,
    },
    {
      id: 3,
      name: "Priya Nair",
      avatar: "https://i.pravatar.cc/80?img=45",
      last: "Thanks, that helps a lot",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 4,
      name: "Sam Okafor",
      avatar: "https://i.pravatar.cc/80?img=32",
      last: "Lunch on Thursday?",
      time: "Yesterday",
      unread: 0,
      online: true,
    },
    {
      id: 5,
      name: "Jordan Lee",
      avatar: "https://i.pravatar.cc/80?img=15",
      last: "Invoice attached",
      time: "Tuesday",
      unread: 0,
      online: false,
    },
  ]);

  const query = ref("");
  const selected = ref<number>();

  const grouped = computed(() => {
    const q = query.value.toLowerCase();
    const matches = chats.filter((chat) => `${chat.name} ${chat.last}`.toLowerCase().includes(q));
    return [
      { label: "Pinned", items: matches.filter((chat) => chat.pinned) },
      { label: "Recent", items: matches.filter((chat) => !chat.pinned) },
    ].filter((group) => group.items.length);
  });

  const current = computed(() => chats.find((chat) => chat.id === selected.value));

  function open(chat: Chat) {
    selected.value = chat.id;
    chat.unread = 0;
  }
</script>
