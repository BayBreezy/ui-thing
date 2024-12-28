<template>
  <div class="flex items-center justify-center gap-10">
    <div
      class="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5"
    >
      <div class="flex -space-x-1">
        <UiAvatar v-for="u in users" :key="u.name" class="size-5 ring-1 ring-background">
          <UiAvatarImage :src="u.avatar" :alt="u.name" />
          <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
        </UiAvatar>
      </div>
      <p class="px-2 text-xs text-muted-foreground">
        Trusted by <strong class="font-medium text-foreground">60K+</strong> developers.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const users = [
    {
      name: "Kelly King",
      avatar: "https://i.pravatar.cc/150?img=1",
      initials: "KK",
    },
    {
      name: "Ryan Author",
      avatar: "https://i.pravatar.cc/150?img=2",
      initials: "RA",
    },
    {
      name: "Megan Author",
      avatar: "https://i.pravatar.cc/150?img=3",
      initials: "MA",
    },
    {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=4",
      initials: "JD",
    },
  ];
</script>
