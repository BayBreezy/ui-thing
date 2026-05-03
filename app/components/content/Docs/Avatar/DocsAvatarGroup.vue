<template>
  <div class="flex flex-col items-center justify-center gap-10">
    <div class="flex -space-x-1">
      <UiAvatar v-for="u in users" :key="u.name" class="ring-background size-8 ring-2">
        <UiAvatarImage :src="u.avatar" :alt="u.name" />
        <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
      </UiAvatar>
    </div>
    <div class="flex -space-x-1">
      <UiAvatar v-for="u in users" :key="u.name" class="ring-background size-8 ring-2">
        <UiAvatarImage :src="u.avatar" :alt="u.name" />
        <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
      </UiAvatar>
      <UiButton
        v-tippy="{ content: 'Add user' }"
        variant="secondary"
        class="bg-secondary text-muted-foreground ring-background hover:bg-secondary hover:text-foreground z-10 flex size-8 items-center justify-center rounded-full text-xs ring-2"
        size="icon"
      >
        +3
      </UiButton>
    </div>
    <div class="flex -space-x-3">
      <UiAvatar v-for="u in users" :key="u.name" class="ring-background size-12 ring-2">
        <UiAvatarImage :src="u.avatar" :alt="u.name" />
        <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
      </UiAvatar>
    </div>
    <div class="flex -space-x-2">
      <UiAvatar v-for="u in users" :key="u.name" class="ring-background size-20 ring-2">
        <UiAvatarImage :src="u.avatar" :alt="u.name" />
        <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
      </UiAvatar>
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
