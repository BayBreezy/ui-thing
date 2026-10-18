<template>
  <!--
    Compact rating strip with an avatar stack
    Features: Overlapping reader avatars, a five star rating and a customer count in one tidy line, meant to sit under a hero call to action
  -->
  <UiContainer class="py-10">
    <Motion
      :initial="{ opacity: 0, y: 10 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :in-view-options="{ once: true }"
      :transition="{ duration: 0.5 }"
      class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
    >
      <UiAvatarGroup>
        <UiAvatar v-for="person in props.people" :key="person.name" class="size-10">
          <UiAvatarImage :src="person.avatar" :alt="person.name" />
          <UiAvatarFallback>{{ person.name[0] }}</UiAvatarFallback>
        </UiAvatar>
        <span
          class="bg-muted text-muted-foreground ring-background z-0 flex size-10 items-center justify-center rounded-full text-xs font-semibold ring-2"
        >
          +{{ props.more }}
        </span>
      </UiAvatarGroup>
      <div class="text-center sm:text-left">
        <div class="flex items-center justify-center gap-2 sm:justify-start">
          <UiRating
            :model-value="props.rating"
            size="sm"
            icon="mdi:star"
            filled-icon-class-name="text-amber-400"
          />
          <span class="text-sm font-semibold">{{ props.rating }}</span>
        </div>
        <p class="text-muted-foreground text-sm">{{ props.text }}</p>
      </div>
    </Motion>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      rating?: number;
      text?: string;
      more?: string;
      people?: { name: string; avatar: string }[];
    }>(),
    {
      rating: 4.9,
      text: "Loved by 12,000+ makers and teams",
      more: "12k",
      people: () => [
        { name: "Maya", avatar: "https://i.pravatar.cc/80?img=47" },
        { name: "Liam", avatar: "https://i.pravatar.cc/80?img=12" },
        { name: "Priya", avatar: "https://i.pravatar.cc/80?img=45" },
        { name: "Sam", avatar: "https://i.pravatar.cc/80?img=32" },
        { name: "Noah", avatar: "https://i.pravatar.cc/80?img=15" },
      ],
    }
  );
</script>
