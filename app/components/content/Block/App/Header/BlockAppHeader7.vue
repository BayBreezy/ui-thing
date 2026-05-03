<template>
  <UiContainer class="px-4 py-5 md:px-6">
    <div class="flex flex-col gap-5">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <slot name="title">
              <h1 v-if="props.title" class="text-2xl font-bold" v-html="props.title" />
            </slot>
            <slot name="status">
              <UiBadge v-if="props.status" :variant="props.statusVariant">
                <div class="bg-primary-foreground size-2 rounded-full" />
                {{ props.status }}
              </UiBadge>
            </slot>
          </div>
          <slot name="description">
            <p
              v-if="props.description"
              class="text-muted-foreground text-sm"
              v-html="props.description"
            />
          </slot>
          <slot name="meta">
            <div class="flex flex-wrap items-center gap-3 text-xs">
              <div class="flex items-center gap-1.5">
                <UiAvatar :src="props.ownerAvatar" size="xs" />
                <span class="text-muted-foreground">{{ props.owner }}</span>
              </div>
              <UiSeparator orientation="vertical" class="h-3" />
              <div class="text-muted-foreground flex items-center gap-1.5">
                <Icon name="lucide:users" class="size-3.5" />
                <span>{{ props.members }} members</span>
              </div>
              <UiSeparator orientation="vertical" class="h-3" />
              <div class="text-muted-foreground flex items-center gap-1.5">
                <Icon name="lucide:calendar" class="size-3.5" />
                <span>Due {{ props.dueDate }}</span>
              </div>
            </div>
          </slot>
        </div>
        <div class="flex flex-wrap gap-2">
          <slot>
            <UiButton variant="outline" size="sm">
              <Icon name="lucide:star" class="size-4" />
            </UiButton>
            <UiButton variant="outline" size="sm">
              <Icon name="lucide:share-2" class="size-4" />
              Share
            </UiButton>
            <UiButton size="sm">
              <Icon name="lucide:settings" class="size-4" />
              Manage
            </UiButton>
          </slot>
        </div>
      </div>
      <UiDivider />
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      status?: string;
      statusVariant?: "default" | "secondary" | "destructive" | "success" | "outline";
      owner?: string;
      ownerAvatar?: string;
      members?: number;
      dueDate?: string;
    }>(),
    {
      title: "Website Redesign Project",
      description:
        "Complete overhaul of the company website with modern design principles and improved user experience.",
      status: "In Progress",
      statusVariant: "default",
      owner: "John Smith",
      ownerAvatar: "https://randomuser.me/api/portraits/med/men/45.jpg",
      members: 8,
      dueDate: "Dec 15, 2027",
    }
  );
</script>
