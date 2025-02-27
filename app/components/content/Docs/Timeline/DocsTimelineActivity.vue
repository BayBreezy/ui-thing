<template>
  <div class="flex justify-center">
    <div class="space-y-3">
      <div class="text-xs font-medium text-muted-foreground">Activity</div>
      <UiTimeline>
        <UiTimelineItem
          v-for="item in items"
          :key="item.id"
          :step="item.id"
          class="!m-0 flex-row items-center gap-3 !py-2.5"
        >
          <Icon :name="getActionIcon(item.action)" class="size-4 text-muted-foreground/80" />
          <UiAvatar :src="item.image" :alt="item.user" class="size-6" />
          <UiTimelineContent class="flex items-center gap-2 text-foreground">
            <a class="font-medium hover:underline" href="#">
              {{ item.user }}
            </a>
            <span class="font-normal">
              {{ getActionText(item.action) }}
              <a class="hover:underline" href="#">
                {{ useTimeAgo(item.date).value }}
              </a>
            </span>
          </UiTimelineContent>
        </UiTimelineItem>
      </UiTimeline>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const items: { id: number; user: string; image: string; action: ActionType; date: Date }[] = [
    {
      id: 1,
      user: "Matt",
      image: "https://randomuser.me/api/portraits/med/men/75.jpg",
      action: "post",
      date: new Date(Date.now() - 59000), // 59 seconds ago
    },
    {
      id: 2,
      user: "Matt",
      image: "https://randomuser.me/api/portraits/med/men/75.jpg",
      action: "reply",
      date: new Date(Date.now() - 180000), // 3 minutes ago
    },
    {
      id: 3,
      user: "Matt",
      image: "https://randomuser.me/api/portraits/med/men/75.jpg",
      action: "edit",
      date: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
      id: 4,
      user: "Matt",
      image: "https://randomuser.me/api/portraits/med/men/75.jpg",
      action: "create",
      date: new Date(Date.now() - 600000), // 10 minutes ago
    },
  ];

  type ActionType = "post" | "reply" | "edit" | "create";

  function getActionIcon(action: ActionType): string {
    const icons: Record<ActionType, string> = {
      post: "lucide:book-open",
      reply: "lucide:message-circle",
      edit: "lucide:pencil",
      create: "lucide:plus",
    };
    return icons[action];
  }

  function getActionText(action: ActionType): string {
    const texts: Record<ActionType, string> = {
      post: "wrote a new post",
      reply: "replied to a comment",
      edit: "edited a post",
      create: "created a new project",
    };
    return texts[action];
  }
</script>
