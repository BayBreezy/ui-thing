<template>
  <!--
    User header with an online status, stats and segmented tabs
    Features: Avatar with a status dot, contact details with icons, message and follow actions, pill tabs with a sliding indicator, entrance animation
  -->
  <UiContainer class="px-4 pt-6 md:px-8">
    <Motion
      class="flex flex-col gap-5"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ type: 'spring', stiffness: 180, damping: 22 }"
    >
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-4">
          <slot name="avatar">
            <div class="relative shrink-0">
              <UiAvatar :src="props.avatar" :fallback="props.initials" class="size-16" />
              <span
                class="ring-background absolute right-0 bottom-0 size-4 rounded-full bg-green-500 ring-2"
                aria-label="Online"
              />
            </div>
          </slot>
          <div class="min-w-0">
            <slot name="title">
              <h1 class="text-2xl font-bold tracking-tight">{{ props.title }}</h1>
            </slot>
            <slot name="description">
              <ul
                class="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm"
              >
                <li v-for="item in props.meta" :key="item.label" class="flex items-center gap-1.5">
                  <Icon :name="item.icon" class="size-4" />
                  {{ item.label }}
                </li>
              </ul>
            </slot>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <slot>
            <UiButton variant="outline">
              <Icon name="lucide:mail" class="size-4" />
              Message
            </UiButton>
            <UiButton>
              <Icon name="lucide:user-plus" class="size-4" />
              Follow
            </UiButton>
          </slot>
        </div>
      </div>

      <slot name="tabs">
        <UiTabs v-model="tab">
          <UiScrollArea orientation="horizontal">
            <UiTabsList class="relative">
              <UiTabsTrigger v-for="item in props.tabs" :key="item" :value="item" class="px-4">
                {{ item }}
              </UiTabsTrigger>
              <UiTabsIndicator class="[&>div]:bg-background [&>div]:shadow-sm" />
            </UiTabsList>
          </UiScrollArea>
        </UiTabs>
      </slot>
    </Motion>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      avatar?: string;
      initials?: string;
      meta?: { icon: string; label: string }[];
      tabs?: string[];
    }>(),
    {
      title: "Priya Nair",
      avatar: "https://i.pravatar.cc/200?img=45",
      initials: "PN",
      meta: () => [
        { icon: "lucide:calendar", label: "Joined Mar 2024" },
        { icon: "lucide:mail", label: "priya@uithing.com" },
        { icon: "lucide:map-pin", label: "Bengaluru, IN" },
      ],
      tabs: () => ["Activity", "Profile", "Projects", "Settings"],
    }
  );

  const tab = ref(props.tabs[0]);
</script>
