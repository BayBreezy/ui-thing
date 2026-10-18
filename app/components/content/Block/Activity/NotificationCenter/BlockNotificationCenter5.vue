<template>
  <!--
    Notifications with tabs
    Features: All, unread and mentions tabs with counts, a message for each empty tab, mention highlight, mark as read on click and a settings link
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-xl gap-0 py-0">
      <div class="flex items-center justify-between px-5 pt-4">
        <h1 class="font-semibold">Notifications</h1>
        <UiButton
          variant="ghost"
          size="icon-sm"
          aria-label="Notification settings"
          @click="useSonner.info('Open notification settings here')"
          ><Icon name="lucide:settings" class="size-4"
        /></UiButton>
      </div>
      <UiTabs v-model="tab" class="px-5 pt-3">
        <UiTabsList class="w-full">
          <UiTabsTrigger v-for="item in tabs" :key="item.value" :value="item.value" class="flex-1"
            >{{ item.label }}
            <span
              class="bg-muted text-muted-foreground ml-1.5 rounded-full px-1.5 text-xs tabular-nums"
              >{{ count(item.value) }}</span
            ></UiTabsTrigger
          >
        </UiTabsList>
      </UiTabs>
      <ul v-if="visible.length" class="mt-3 divide-y border-t" aria-live="polite">
        <li v-for="item in visible" :key="item.id">
          <button
            type="button"
            class="hover:bg-accent/50 focus-visible:bg-accent/50 flex w-full items-start gap-3 px-5 py-3.5 text-left outline-none"
            @click="item.read = true"
          >
            <UiAvatar
              :src="`https://i.pravatar.cc/80?img=${item.avatar}`"
              :fallback="item.actor.slice(0, 1)"
              class="size-9"
            />
            <span class="min-w-0 flex-1">
              <span
                class="block text-sm leading-snug"
                :class="item.read ? 'text-muted-foreground' : ''"
              >
                <span class="text-foreground font-medium">{{ item.actor }}</span>
                {{ item.text }}
              </span>
              <span
                v-if="item.mention"
                class="bg-muted mt-1.5 block rounded-md px-2.5 py-1.5 text-sm"
                >{{ item.mention }}</span
              >
              <span class="text-muted-foreground mt-1 block text-xs">{{ item.time }}</span>
            </span>
            <span
              v-if="!item.read"
              class="bg-primary mt-2 size-2 shrink-0 rounded-full"
              aria-label="Unread"
            />
          </button>
        </li>
      </ul>
      <div
        v-else
        class="text-muted-foreground border-t px-5 py-12 text-center text-sm"
        aria-live="polite"
      >
        <Icon :name="emptyIcon" class="mx-auto mb-2 size-6" />
        {{ emptyText }}
      </div>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Notification = {
    id: string;
    actor: string;
    avatar: number;
    text: string;
    mention?: string;
    time: string;
    read: boolean;
  };

  const props = withDefaults(
    defineProps<{
      notifications?: Notification[];
    }>(),
    {
      notifications: () => [
        {
          id: "t1",
          actor: "Leo Fischer",
          avatar: 12,
          text: "mentioned you in API rate limits",
          mention: "@alex can you confirm the limit for the free plan?",
          time: "9:40 AM",
          read: false,
        },
        {
          id: "t2",
          actor: "Maya Patel",
          avatar: 32,
          text: "commented on Homepage redesign",
          time: "10:05 AM",
          read: false,
        },
        {
          id: "t3",
          actor: "Priya Nair",
          avatar: 44,
          text: "mentioned you in Invoice rounding",
          mention: "@alex this matches what finance asked for.",
          time: "Yesterday",
          read: true,
        },
        {
          id: "t4",
          actor: "Noah Kim",
          avatar: 15,
          text: "approved Release 2.4",
          time: "Yesterday",
          read: true,
        },
        {
          id: "t5",
          actor: "Sofia Alvarez",
          avatar: 45,
          text: "shared Q4 planning with you",
          time: "Mon",
          read: true,
        },
      ],
    }
  );

  const tabs = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "mentions", label: "Mentions" },
  ];

  const items = ref<Notification[]>(props.notifications.map((item) => ({ ...item })));
  const tab = ref("all");

  const matches = (item: Notification, value: string) =>
    value === "all" || (value === "unread" ? !item.read : !!item.mention);
  const count = (value: string) => items.value.filter((item) => matches(item, value)).length;
  const visible = computed(() => items.value.filter((item) => matches(item, tab.value)));

  const emptyText = computed(() =>
    tab.value === "unread" ? "You have read everything." : "Nobody has mentioned you yet."
  );
  const emptyIcon = computed(() =>
    tab.value === "unread" ? "lucide:check-check" : "lucide:at-sign"
  );
</script>
