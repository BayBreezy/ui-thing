<template>
  <!--
    Public profile header
    Features: Cover image with overlapping avatar, verified badge, location, website and join date, follow and message actions, stats row, tabs for posts, about and photos
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl overflow-hidden rounded-xl border">
      <img :src="profile.cover" alt="" class="h-36 w-full object-cover sm:h-48" loading="lazy" />

      <div class="px-5 pb-6 sm:px-8">
        <div class="-mt-12 flex flex-wrap items-end justify-between gap-3">
          <UiAvatar class="ring-background size-24 ring-4">
            <UiAvatarImage :src="profile.avatar" :alt="profile.name" />
            <UiAvatarFallback>{{ profile.name.slice(0, 1) }}</UiAvatarFallback>
          </UiAvatar>
          <div class="flex gap-2">
            <UiButton :variant="following ? 'outline' : 'default'" @click="following = !following">
              <Icon :name="following ? 'lucide:user-check' : 'lucide:user-plus'" class="size-4" />
              {{ following ? "Following" : "Follow" }}
            </UiButton>
            <UiButton variant="outline" size="icon" aria-label="Send message">
              <Icon name="lucide:mail" class="size-4" />
            </UiButton>
            <UiButton
              variant="outline"
              size="icon"
              aria-label="Copy profile link"
              @click="copy(profile.url)"
            >
              <Icon :name="copied ? 'lucide:check' : 'lucide:link'" class="size-4" />
            </UiButton>
          </div>
        </div>

        <h1 class="mt-4 flex items-center gap-2 text-2xl font-bold">
          {{ profile.name }}
          <UiBadge variant="soft" color="primary" size="sm">Pro</UiBadge>
        </h1>
        <p class="text-muted-foreground">@{{ profile.handle }}</p>
        <p class="mt-3 max-w-xl text-sm leading-relaxed">{{ profile.bio }}</p>

        <ul class="text-muted-foreground mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          <li class="flex items-center gap-1.5">
            <Icon name="lucide:map-pin" class="size-4" />{{ profile.location }}
          </li>
          <li class="flex items-center gap-1.5">
            <Icon name="lucide:link" class="size-4" />{{ profile.website }}
          </li>
          <li class="flex items-center gap-1.5">
            <Icon name="lucide:calendar" class="size-4" />Joined {{ profile.joined }}
          </li>
        </ul>

        <p class="mt-4 flex gap-5 text-sm">
          <span
            ><span class="font-semibold tabular-nums">{{
              (profile.followers + (following ? 1 : 0)).toLocaleString("en-US")
            }}</span>
            <span class="text-muted-foreground"> followers</span></span
          >
          <span
            ><span class="font-semibold tabular-nums">{{ profile.following }}</span>
            <span class="text-muted-foreground"> following</span></span
          >
        </p>

        <UiTabs default-value="posts" class="mt-6">
          <UiTabsList class="grid w-full grid-cols-3">
            <UiTabsTrigger value="posts">Posts</UiTabsTrigger>
            <UiTabsTrigger value="about">About</UiTabsTrigger>
            <UiTabsTrigger value="photos">Photos</UiTabsTrigger>
          </UiTabsList>
          <UiTabsContent value="posts" class="mt-4">
            <ul class="divide-y rounded-lg border">
              <li v-for="post in profile.posts" :key="post.title" class="p-4">
                <p class="font-medium">{{ post.title }}</p>
                <p class="text-muted-foreground mt-0.5 text-xs">
                  {{ post.date }} · {{ post.reads.toLocaleString("en-US") }} reads
                </p>
              </li>
            </ul>
          </UiTabsContent>
          <UiTabsContent value="about" class="mt-4">
            <dl class="grid gap-3 text-sm sm:grid-cols-2">
              <div v-for="item in profile.about" :key="item.label" class="rounded-lg border p-3">
                <dt class="text-muted-foreground text-xs">{{ item.label }}</dt>
                <dd class="mt-0.5 font-medium">{{ item.value }}</dd>
              </div>
            </dl>
          </UiTabsContent>
          <UiTabsContent value="photos" class="mt-4">
            <ul class="grid grid-cols-3 gap-2">
              <li v-for="(photo, index) in profile.photos" :key="photo">
                <img
                  :src="photo"
                  :alt="`Photo ${index + 1} by ${profile.name}`"
                  class="aspect-square w-full rounded-lg object-cover"
                  loading="lazy"
                />
              </li>
            </ul>
          </UiTabsContent>
        </UiTabs>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Profile = {
    name: string;
    handle: string;
    bio: string;
    avatar: string;
    cover: string;
    location: string;
    website: string;
    joined: string;
    url: string;
    followers: number;
    following: number;
    posts: { title: string; date: string; reads: number }[];
    about: { label: string; value: string }[];
    photos: string[];
  };

  withDefaults(
    defineProps<{
      profile?: Profile;
    }>(),
    {
      profile: () => ({
        name: "Maya Chen",
        handle: "mayachen",
        bio: "Product designer at Fernwood. I write about design systems, accessibility and the craft of small details.",
        avatar: "https://i.pravatar.cc/200?img=47",
        cover:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
        location: "Lisbon, Portugal",
        website: "mayachen.example.com",
        joined: "March 2021",
        url: "https://example.com/mayachen",
        followers: 12840,
        following: 312,
        posts: [
          { title: "What I learned redesigning a settings page", date: "Oct 9", reads: 4200 },
          { title: "Spacing scales that survive real content", date: "Sep 21", reads: 3100 },
          { title: "A short guide to focus states", date: "Aug 30", reads: 5800 },
        ],
        about: [
          { label: "Currently", value: "Head of Design, Fernwood" },
          { label: "Previously", value: "Tilework, Paperboat" },
          { label: "Speaks", value: "English, Portuguese, Mandarin" },
          { label: "Open to", value: "Mentoring and talks" },
        ],
        photos: [
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80",
        ],
      }),
    }
  );

  const following = ref(false);
  const { copy, copied } = useClipboard({ copiedDuring: 1500 });
</script>
