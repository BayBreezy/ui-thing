<template>
  <!--
    Project header with status, progress and team
    Features: Status badge with a colored dot, progress bar with percentage, owner and member avatars, due date with time remaining, star toggle and share actions
  -->
  <UiContainer class="px-4 py-6 md:px-8">
    <Motion
      class="flex flex-col gap-5"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ type: 'spring', stiffness: 180, damping: 22 }"
    >
      <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div class="space-y-2">
          <div class="flex flex-wrap items-center gap-3">
            <slot name="title">
              <h1 class="text-2xl font-bold tracking-tight">{{ props.title }}</h1>
            </slot>
            <UiBadge variant="outline" class="gap-1.5">
              <span class="size-1.5 rounded-full" :class="statusDot" />
              {{ props.status }}
            </UiBadge>
          </div>
          <slot name="description">
            <p class="text-muted-foreground max-w-2xl text-sm">{{ props.description }}</p>
          </slot>
        </div>

        <div class="flex items-center gap-2">
          <slot>
            <UiButton
              variant="outline"
              size="icon"
              :aria-label="starred ? 'Remove from favourites' : 'Add to favourites'"
              :aria-pressed="starred"
              @click="starred = !starred"
            >
              <Icon
                name="lucide:star"
                class="size-4 transition-colors"
                :class="starred && 'fill-amber-400 text-amber-400'"
              />
            </UiButton>
            <UiButton variant="outline">
              <Icon name="lucide:share-2" class="size-4" />
              Share
            </UiButton>
            <UiButton>
              <Icon name="lucide:settings-2" class="size-4" />
              Manage
            </UiButton>
          </slot>
        </div>
      </div>

      <div
        class="bg-card flex flex-col gap-4 rounded-xl border p-4 md:flex-row md:items-center md:gap-8"
      >
        <div class="min-w-0 flex-1">
          <div class="mb-2 flex items-center justify-between text-sm">
            <span class="font-medium">Progress</span>
            <span class="text-muted-foreground tabular-nums">{{ props.progress }}%</span>
          </div>
          <UiProgress :model-value="props.progress" class="h-2" />
        </div>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <div class="flex items-center gap-2">
            <UiAvatar :src="props.owner.avatar" :fallback="props.owner.name[0]" class="size-6" />
            <span>{{ props.owner.name }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex -space-x-1.5">
              <UiAvatar
                v-for="member in props.members"
                :key="member"
                :src="member"
                class="ring-background size-6 ring-2"
              />
            </div>
            <span class="text-muted-foreground">{{ props.members.length + 4 }} members</span>
          </div>
          <div class="text-muted-foreground flex items-center gap-2">
            <Icon name="lucide:calendar" class="size-4" />
            Due {{ props.due }}
          </div>
        </div>
      </div>
    </Motion>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      status?: "In progress" | "On hold" | "Completed";
      progress?: number;
      due?: string;
      owner?: { name: string; avatar: string };
      members?: string[];
    }>(),
    {
      title: "Website redesign",
      description:
        "A full overhaul of the marketing site with a new design system, faster pages and better accessibility.",
      status: "In progress",
      progress: 68,
      due: "Dec 15",
      owner: () => ({ name: "Liam Carter", avatar: "https://i.pravatar.cc/60?img=12" }),
      members: () => [
        "https://i.pravatar.cc/60?img=47",
        "https://i.pravatar.cc/60?img=45",
        "https://i.pravatar.cc/60?img=32",
      ],
    }
  );

  const starred = ref(false);

  const statusDot = computed(
    () =>
      ({
        "In progress": "bg-blue-500",
        "On hold": "bg-amber-500",
        Completed: "bg-green-500",
      })[props.status]
  );
</script>
