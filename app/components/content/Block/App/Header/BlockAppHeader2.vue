<template>
  <!--
    Team page header with an avatar stack
    Features: Icon tile, title with member count, overlapping member avatars with an overflow count, invite and add actions, hover lift on the avatars
  -->
  <UiContainer class="px-4 py-6 md:px-8">
    <Motion
      class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ type: 'spring', stiffness: 180, damping: 22 }"
    >
      <div class="flex items-center gap-4">
        <slot name="avatar">
          <span
            class="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-xl"
          >
            <Icon :name="props.icon" class="size-6" />
          </span>
        </slot>
        <div>
          <slot name="title">
            <h1 class="flex items-center gap-2 text-xl font-bold tracking-tight">
              {{ props.title }}
              <UiBadge variant="secondary"
                >{{ props.members.length + props.extra }} members</UiBadge
              >
            </h1>
          </slot>
          <slot name="description">
            <p class="text-muted-foreground text-sm">{{ props.description }}</p>
          </slot>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <div class="flex -space-x-2">
          <UiAvatar
            v-for="member in props.members"
            :key="member.name"
            :src="member.avatar"
            :fallback="member.name[0]"
            :title="member.name"
            class="ring-background size-9 ring-2 transition-transform hover:z-10 hover:-translate-y-1"
          />
          <span
            v-if="props.extra"
            class="bg-muted ring-background flex size-9 items-center justify-center rounded-full text-xs font-medium ring-2"
          >
            +{{ props.extra }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <slot>
            <UiButton variant="outline">
              <Icon name="lucide:link" class="size-4" />
              Invite link
            </UiButton>
            <UiButton>
              <Icon name="lucide:user-plus" class="size-4" />
              Add member
            </UiButton>
          </slot>
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
      icon?: string;
      members?: { name: string; avatar: string }[];
      extra?: number;
    }>(),
    {
      title: "Design team",
      description: "Everyone who works on product design and research.",
      icon: "lucide:users",
      members: () => [
        { name: "Maya Chen", avatar: "https://i.pravatar.cc/80?img=47" },
        { name: "Liam Carter", avatar: "https://i.pravatar.cc/80?img=12" },
        { name: "Priya Nair", avatar: "https://i.pravatar.cc/80?img=45" },
        { name: "Sam Okafor", avatar: "https://i.pravatar.cc/80?img=32" },
      ],
      extra: 6,
    }
  );
</script>
