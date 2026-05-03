<template>
  <UiContainer class="px-4 py-5 md:px-6">
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-4">
          <slot name="avatar">
            <UiAvatar v-if="props.avatar" :src="props.avatar" size="lg" />
          </slot>
          <div class="flex flex-col gap-2">
            <slot name="title">
              <h1 v-if="props.title" class="text-xl leading-none font-bold" v-html="props.title" />
            </slot>
            <slot name="stats">
              <div class="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                <div class="flex items-center gap-1.5">
                  <Icon name="lucide:calendar" class="size-3.5" />
                  <span>{{ props.joined }}</span>
                </div>
                <UiSeparator orientation="vertical" class="h-3" />
                <div class="flex items-center gap-1.5">
                  <Icon name="lucide:mail" class="size-3.5" />
                  <span>{{ props.email }}</span>
                </div>
                <UiSeparator orientation="vertical" class="h-3" />
                <div class="flex items-center gap-1.5">
                  <Icon name="lucide:map-pin" class="size-3.5" />
                  <span>{{ props.location }}</span>
                </div>
              </div>
            </slot>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <slot>
            <UiButton variant="outline" size="sm" class="w-full sm:w-auto">
              <Icon name="lucide:mail" class="size-4" />
              Message
            </UiButton>
            <UiButton size="sm" class="w-full sm:w-auto">
              <Icon name="lucide:user-plus" class="size-4" />
              Follow
            </UiButton>
          </slot>
        </div>
      </div>
      <slot name="tabs">
        <UiTabs :default-value="props.tabs[1]">
          <TabsList class="flex gap-1 border-b">
            <TabsTrigger
              v-for="tab in props.tabs"
              :key="tab"
              :value="tab"
              class="hover:bg-muted/50 data-[state=active]:bg-muted rounded-md rounded-b-none px-2 py-1.5 text-sm font-medium"
              size="sm"
            >
              {{ tab }}
            </TabsTrigger>
          </TabsList>
        </UiTabs>
      </slot>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      avatar?: string;
      joined?: string;
      email?: string;
      location?: string;
      tabs?: string[];
    }>(),
    {
      title: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/med/women/32.jpg",
      joined: "Joined Mar 2024",
      email: "sarah.j@company.com",
      location: "San Francisco, CA",
      tabs: () => ["Activity", "Profile", "Projects", "Settings"],
    }
  );
</script>
