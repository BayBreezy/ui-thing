<template>
  <div class="grid grid-cols-2 place-items-center gap-y-20">
    <div class="flex items-center justify-center">
      <UiPopover>
        <UiPopoverTrigger as-child>
          <UiButton variant="outline" size="icon" aria-label="Filters">
            <Icon name="lucide:list-filter" class="size-4" aria-hidden="true" />
          </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-44 p-3">
          <div class="space-y-3">
            <div class="text-muted-foreground text-xs font-medium">Filters</div>
            <UiGradientDivider />
            <form>
              <UiCheckboxGroup
                v-model="selectedFilters"
                orientation="vertical"
                class="flex flex-col gap-3"
              >
                <div v-for="(item, i) in filters" :key="i">
                  <div class="flex items-center gap-3">
                    <UiCheckbox :id="item.id" :value="item.id" />
                    <UiLabel :for="item.id" class="font-normal">{{ item.label }}</UiLabel>
                  </div>
                </div>
              </UiCheckboxGroup>
              <UiGradientDivider class="my-3" />
              <div class="flex justify-between gap-2">
                <UiPopoverClose as-child>
                  <UiButton size="sm" variant="outline" class="h-7 px-2"> Clear </UiButton>
                </UiPopoverClose>
                <UiPopoverClose as-child>
                  <UiButton size="sm" class="h-7 px-2">Apply</UiButton>
                </UiPopoverClose>
              </div>
            </form>
          </div>
        </UiPopoverContent>
      </UiPopover>
    </div>

    <div class="flex items-center justify-center">
      <UiPopover>
        <UiPopoverTrigger as="div">
          <UiChip
            v-if="unreadCount"
            size="3xl"
            :text="unreadCount > 99 ? '99+' : unreadCount.toString()"
          >
            <UiButton
              size="icon"
              variant="outline"
              class="relative"
              aria-label="Open notifications"
            >
              <Icon name="lucide:bell" class="size-4" aria-hidden="true" />
            </UiButton>
          </UiChip>
          <UiButton
            v-else
            size="icon"
            variant="outline"
            class="relative"
            aria-label="Open notifications"
          >
            <Icon name="lucide:bell" class="size-4" aria-hidden="true" />
          </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-80 p-1">
          <div class="flex items-baseline justify-between gap-4 px-3 py-2">
            <div class="text-sm font-semibold">Notifications</div>
            <button
              v-if="unreadCount > 0"
              class="text-xs font-medium hover:underline"
              @click="handleMarkAllAsRead"
            >
              Mark all as read
            </button>
          </div>
          <UiGradientDivider
            role="separator"
            aria-orientation="horizontal"
            class="bg-border -mx-1 my-1 h-px"
          />
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors"
          >
            <div class="relative flex items-start pe-3">
              <div class="flex-1 space-y-1">
                <button
                  class="text-foreground/80 text-left after:absolute after:inset-0"
                  @click="() => handleNotificationClick(notification.id)"
                >
                  <span class="text-foreground font-medium hover:underline">
                    {{ notification.user }}
                  </span>
                  {{ notification.action }}
                  <span class="text-foreground font-medium hover:underline">
                    {{ notification.target }}
                  </span>
                  .
                </button>
                <div class="text-muted-foreground text-xs">
                  {{ notification.timestamp }}
                </div>
              </div>
              <div v-if="notification.unread" class="absolute end-0 self-center">
                <span class="sr-only">Unread</span>
                <svg
                  width="6"
                  height="6"
                  fill="currentColor"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="3" cy="3" r="3" />
                </svg>
              </div>
            </div>
          </div>
        </UiPopoverContent>
      </UiPopover>
    </div>

    <div class="flex items-center justify-center">
      <UiPopover>
        <UiPopoverTrigger as-child>
          <UiButton variant="outline">Tooltip-like popover</UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="max-w-[280px] py-3 shadow-none" side="top">
          <div class="space-y-3">
            <div class="space-y-1">
              <p class="text-[13px] font-medium">Popover with button</p>
              <p class="text-muted-foreground text-xs">
                I am a popover that would like to look like a tooltip. I can't be a tooltip because
                of the interactive element inside me.
              </p>
            </div>
            <UiPopoverClose as-child>
              <UiButton size="sm" class="h-7 px-2">Know more</UiButton>
            </UiPopoverClose>
          </div>
        </UiPopoverContent>
      </UiPopover>
    </div>

    <div class="flex items-center justify-center">
      <UiPopover>
        <UiPopoverTrigger as-child>
          <UiButton variant="outline">Tooltip-like with steps</UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="max-w-[280px] py-3 shadow-none" side="top">
          <div class="space-y-3">
            <div class="space-y-1">
              <p class="text-[13px] font-medium">
                {{ tips[currentTip]?.title }}
              </p>
              <p class="text-muted-foreground text-xs">
                {{ tips[currentTip]?.description }}
              </p>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-muted-foreground text-xs">
                {{ currentTip + 1 }}/{{ tips.length }}
              </span>
              <button class="text-xs font-medium hover:underline" @click="handleNavigation">
                {{ currentTip === tips.length - 1 ? "Start over" : "Next" }}
              </button>
            </div>
          </div>
        </UiPopoverContent>
      </UiPopover>
    </div>

    <div class="flex items-center justify-center">
      <UiPopover>
        <UiPopoverTrigger as-child>
          <UiButton variant="outline">Tooltip-like with nav</UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="max-w-[280px] py-3 shadow-none" side="top">
          <div class="space-y-3">
            <div class="space-y-1">
              <p class="text-[13px] font-medium">
                {{ tips2[currentTip2]?.title }}
              </p>
              <p class="text-muted-foreground text-xs">
                {{ tips2[currentTip2]?.description }}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground text-xs">
                {{ currentTip2 + 1 }}/{{ tips2.length }}
              </span>
              <div class="flex gap-0.5">
                <UiButton
                  size="icon"
                  variant="ghost"
                  class="size-6"
                  :disabled="isFirstTip"
                  aria-label="Previous tip"
                  @click="handlePrev"
                >
                  <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
                </UiButton>
                <UiButton
                  size="icon"
                  variant="ghost"
                  class="size-6"
                  :disabled="isLastTip"
                  aria-label="Next tip"
                  @click="handleNext"
                >
                  <Icon name="lucide:arrow-right" class="size-4" aria-hidden="true" />
                </UiButton>
              </div>
            </div>
          </div>
        </UiPopoverContent>
      </UiPopover>
    </div>

    <div class="flex items-center justify-center">
      <UiPopover>
        <UiPopoverTrigger as-child>
          <UiButton variant="outline">Share</UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-72">
          <div class="flex flex-col gap-3 text-center">
            <div class="text-sm font-medium">Share code</div>
            <div class="flex flex-wrap justify-center gap-2">
              <UiButton size="icon" variant="outline" aria-label="Embed">
                <Icon name="ri:code-fill" size="16" aria-hidden="true" />
              </UiButton>
              <UiButton size="icon" variant="outline" aria-label="Share on Twitter">
                <Icon name="ri:twitter-x-fill" size="16" aria-hidden="true" />
              </UiButton>
              <UiButton size="icon" variant="outline" aria-label="Share on Facebook">
                <Icon name="ri:facebook-fill" size="16" aria-hidden="true" />
              </UiButton>
              <UiButton size="icon" variant="outline" aria-label="Share via email">
                <Icon name="ri:mail-line" size="16" aria-hidden="true" />
              </UiButton>
            </div>
            <div class="space-y-2">
              <UiVeeInput
                readonly
                class="peer pe-9"
                placeholder="Code"
                :model-value="code"
                type="url"
              >
                <template #trailingIcon>
                  <button
                    v-tippy="copied ? 'Copied!' : 'Copy to clipboard'"
                    type="button"
                    :disabled="copied"
                    aria-label="Copy code"
                    class="border-l-input text-muted-foreground/80 ring-offset-background hover:bg-muted/50 hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:ring-ring/30 absolute inset-y-0 end-0 z-10 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    @click="copy(code)"
                  >
                    <Icon
                      :name="copied ? 'lucide:check' : 'lucide:copy'"
                      class="size-4"
                      :class="[copied ? 'text-emerald-500' : '']"
                    />
                  </button>
                </template>
              </UiVeeInput>
            </div>
          </div>
        </UiPopoverContent>
      </UiPopover>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();

  const filters = ref([
    { id: `${id}-1`, label: "Real Time" },
    { id: `${id}-2`, label: "Top Channels" },
    { id: `${id}-3`, label: "Last Orders" },
    { id: `${id}-4`, label: "Total Spent" },
  ]);
  const selectedFilters = ref<string[]>([]);

  interface Notification {
    id: number;
    user: string;
    action: string;
    target: string;
    timestamp: string;
    unread: boolean;
  }

  const initialNotifications: Notification[] = [
    {
      id: 1,
      user: "Chris Tompson",
      action: "requested review on",
      target: "PR #42: Feature implementation",
      timestamp: "15 minutes ago",
      unread: true,
    },
    {
      id: 2,
      user: "Emma Davis",
      action: "shared",
      target: "New component library",
      timestamp: "45 minutes ago",
      unread: true,
    },
    {
      id: 3,
      user: "James Wilson",
      action: "assigned you to",
      target: "API integration task",
      timestamp: "4 hours ago",
      unread: false,
    },
    {
      id: 4,
      user: "Alex Morgan",
      action: "replied to your comment in",
      target: "Authentication flow",
      timestamp: "12 hours ago",
      unread: false,
    },
    {
      id: 5,
      user: "Sarah Chen",
      action: "commented on",
      target: "Dashboard redesign",
      timestamp: "2 days ago",
      unread: false,
    },
    {
      id: 6,
      user: "Miky Derya",
      action: "mentioned you in",
      target: "Origin UI open graph image",
      timestamp: "2 weeks ago",
      unread: false,
    },
  ];

  const notifications = ref<Notification[]>(initialNotifications);
  const unreadCount = computed(() => notifications.value.filter((n) => n.unread).length);

  const handleMarkAllAsRead = () => {
    notifications.value = notifications.value.map((notification) => ({
      ...notification,
      unread: false,
    }));
  };

  const handleNotificationClick = (id: number) => {
    notifications.value = notifications.value.map((notification) =>
      notification.id === id ? { ...notification, unread: false } : notification
    );
  };

  const tips = [
    {
      title: "Welcome to Dashboard",
      description:
        "This is your new workspace. Here you'll find all your projects, recent activities, settings, and more.",
    },
    {
      title: "Quick Actions",
      description:
        "Use the toolbar above to create new projects, invite team members, or access settings.",
    },
    {
      title: "Need Help?",
      description:
        "Click the support icon in the top right corner to access our help center and documentation.",
    },
  ];

  const currentTip = ref(0);

  const handleNavigation = () => {
    if (currentTip.value === tips.length - 1) {
      currentTip.value = 0;
    } else {
      currentTip.value++;
    }
  };

  //

  const tips2 = [
    {
      title: "Welcome to Dashboard",
      description:
        "This is your new workspace. Here you'll find all your projects, recent activities, settings, and more.",
    },
    {
      title: "Quick Actions",
      description:
        "Use the toolbar above to create new projects, invite team members, or access settings.",
    },
    {
      title: "Need Help?",
      description:
        "Click the support icon in the top right corner to access our help center and documentation.",
    },
    {
      title: "Keyboard Shortcuts",
      description:
        "Press ⌘K to open the command palette. Use arrow keys to navigate and Enter to select an action.",
    },
    {
      title: "Stay Updated",
      description:
        "Enable notifications to receive updates about your projects, team activity, and important deadlines.",
    },
  ];

  const currentTip2 = ref(0);

  const handleNext = () => {
    if (currentTip2.value < tips2.length - 1) {
      currentTip2.value++;
    }
  };

  const handlePrev = () => {
    if (currentTip2.value > 0) {
      currentTip2.value--;
    }
  };

  const isFirstTip = computed(() => currentTip2.value === 0);
  const isLastTip = computed(() => currentTip2.value === tips2.length - 1);

  //
  const code = ref("https://ui-thing.com/Avx8HD");

  const { copy, copied } = useClipboard();
</script>
