<template>
  <!--
    Profile header with a gradient cover and an overlapping avatar
    Features: Gradient cover with blurred shapes, avatar that overlaps the cover, verified badge, stats row, follow button that toggles, message and more actions, staggered entrance
  -->
  <div>
    <slot name="cover">
      <div
        class="relative h-36 overflow-hidden bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 md:h-48"
      >
        <div class="absolute -top-16 -right-10 size-64 rounded-full bg-white/25 blur-3xl" />
        <div class="absolute -bottom-24 left-1/4 size-72 rounded-full bg-white/20 blur-3xl" />
        <UiButton
          size="sm"
          variant="secondary"
          class="absolute top-4 right-4 gap-1.5 opacity-90"
          @click="useSonner.info('Open your cover picker here')"
        >
          <Icon name="lucide:image" class="size-4" />
          Edit cover
        </UiButton>
      </div>
    </slot>

    <UiContainer class="px-4 md:px-8">
      <Motion
        class="-mt-12 flex flex-col gap-5 md:-mt-14 md:flex-row md:items-end md:justify-between"
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 160, damping: 22 }"
      >
        <div class="flex flex-col gap-4 md:flex-row md:items-end">
          <slot name="avatar">
            <UiAvatar
              :src="props.avatar"
              :fallback="props.initials"
              class="ring-background size-24 shrink-0 ring-4 md:size-28"
            />
          </slot>
          <div class="pb-1">
            <slot name="title">
              <div class="flex items-center gap-2">
                <h1 class="text-2xl font-bold tracking-tight">{{ props.title }}</h1>
                <Icon
                  v-if="props.verified"
                  name="lucide:badge-check"
                  class="text-primary size-5"
                  aria-label="Verified"
                />
              </div>
            </slot>
            <slot name="description">
              <p class="text-muted-foreground text-sm">{{ props.description }}</p>
            </slot>
          </div>
        </div>

        <div class="flex items-center gap-2 pb-1">
          <slot>
            <UiButton :variant="following ? 'outline' : 'default'" @click="toggleFollow">
              <Icon :name="following ? 'lucide:user-check' : 'lucide:user-plus'" class="size-4" />
              {{ following ? "Following" : "Follow" }}
            </UiButton>
            <UiButton variant="outline">
              <Icon name="lucide:mail" class="size-4" />
              Message
            </UiButton>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiButton variant="outline" size="icon" aria-label="More actions">
                  <Icon name="lucide:ellipsis" class="size-4" />
                </UiButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent align="end">
                <UiDropdownMenuItem icon="lucide:link" title="Copy profile link" />
                <UiDropdownMenuItem icon="lucide:flag" title="Report" />
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem variant="destructive" icon="lucide:ban" title="Block" />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </slot>
        </div>
      </Motion>

      <Motion
        class="mt-6 flex gap-8 border-b pb-5"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.15, duration: 0.4 }"
      >
        <div v-for="stat in props.stats" :key="stat.label">
          <p class="text-lg leading-none font-bold tabular-nums">{{ stat.value }}</p>
          <p class="text-muted-foreground mt-1 text-xs">{{ stat.label }}</p>
        </div>
      </Motion>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      avatar?: string;
      initials?: string;
      verified?: boolean;
      stats?: { label: string; value: string }[];
    }>(),
    {
      title: "Maya Chen",
      description: "Product designer at Northwind · @mayachen",
      avatar: "https://i.pravatar.cc/200?img=47",
      initials: "MC",
      verified: true,
      stats: () => [
        { label: "Followers", value: "12.4k" },
        { label: "Following", value: "318" },
        { label: "Projects", value: "46" },
      ],
    }
  );

  const following = ref(false);

  function toggleFollow() {
    following.value = !following.value;
    useSonner(following.value ? `You're following ${props.title}` : "Unfollowed");
  }
</script>
