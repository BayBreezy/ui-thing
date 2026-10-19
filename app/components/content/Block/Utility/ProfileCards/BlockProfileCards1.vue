<template>
  <!--
    User profile card
    Features: Gradient banner with overlapping avatar, name, handle and bio, followers, following and posts stats, follow toggle that updates the count, message button
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-sm gap-0 overflow-hidden py-0">
      <div class="from-primary/25 via-primary/10 h-24 bg-linear-to-br to-transparent" />
      <div class="px-6 pb-6">
        <UiAvatar class="ring-card -mt-10 size-20 ring-4">
          <UiAvatarImage :src="user.avatar" :alt="user.name" />
          <UiAvatarFallback>{{ user.name.slice(0, 1) }}</UiAvatarFallback>
        </UiAvatar>

        <div class="mt-3">
          <h2 class="flex items-center gap-1.5 text-xl font-bold">
            {{ user.name }}
            <Icon
              v-if="user.verified"
              name="lucide:badge-check"
              class="text-primary size-5"
              aria-label="Verified"
            />
          </h2>
          <p class="text-muted-foreground text-sm">@{{ user.handle }} · {{ user.role }}</p>
        </div>
        <p class="mt-3 text-sm leading-relaxed">{{ user.bio }}</p>

        <dl class="mt-5 grid grid-cols-3 divide-x rounded-lg border text-center">
          <div v-for="stat in stats" :key="stat.label" class="py-3">
            <dd class="text-lg font-semibold tabular-nums">{{ stat.value }}</dd>
            <dt class="text-muted-foreground text-xs">{{ stat.label }}</dt>
          </div>
        </dl>

        <div class="mt-5 flex gap-2">
          <UiButton
            class="flex-1"
            :variant="following ? 'outline' : 'default'"
            :aria-pressed="following"
            @click="following = !following"
          >
            <Icon :name="following ? 'lucide:user-check' : 'lucide:user-plus'" class="size-4" />
            {{ following ? "Following" : "Follow" }}
          </UiButton>
          <UiButton variant="outline" size="icon" aria-label="Send message">
            <Icon name="lucide:mail" class="size-4" />
          </UiButton>
        </div>
      </div>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type User = {
    name: string;
    handle: string;
    role: string;
    bio: string;
    avatar: string;
    verified: boolean;
    followers: number;
    following: number;
    posts: number;
  };

  const props = withDefaults(
    defineProps<{
      user?: User;
    }>(),
    {
      user: () => ({
        name: "Maya Chen",
        handle: "mayachen",
        role: "Product designer",
        bio: "Designing calm software at Fernwood. Writing about design systems, accessibility and the craft of small details.",
        avatar: "https://i.pravatar.cc/160?img=47",
        verified: true,
        followers: 12840,
        following: 312,
        posts: 248,
      }),
    }
  );

  const following = ref(false);

  const compact = (value: number) =>
    new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);

  const stats = computed(() => [
    { label: "Followers", value: compact(props.user.followers + (following.value ? 1 : 0)) },
    { label: "Following", value: compact(props.user.following) },
    { label: "Posts", value: compact(props.user.posts) },
  ]);
</script>
