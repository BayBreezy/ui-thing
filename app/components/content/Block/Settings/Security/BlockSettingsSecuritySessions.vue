<template>
  <!--
    Active sessions and signed-in devices
    Features: Current session highlighted, device icon, location and last active time, revoke one session or all others
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
      <UiCardAction>
        <UiButton variant="outline" size="sm" :disabled="sessions.length < 2" @click="revokeOthers">
          Sign out all others
        </UiButton>
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent class="divide-y p-0">
      <div v-for="session in sessions" :key="session.id" class="flex items-center gap-4 px-6 py-4">
        <div class="bg-muted flex size-10 shrink-0 items-center justify-center rounded-md">
          <Icon :name="session.icon" class="size-5" />
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <p class="truncate text-sm font-medium">{{ session.device }}</p>
            <UiBadge v-if="session.current" variant="success">This device</UiBadge>
          </div>
          <p class="text-muted-foreground text-sm">
            {{ session.location }} · {{ session.lastActive }}
          </p>
        </div>
        <UiButton v-if="!session.current" variant="ghost" size="sm" @click="revoke(session.id)">
          Revoke
        </UiButton>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  type Session = {
    id: number;
    device: string;
    icon: string;
    location: string;
    lastActive: string;
    current?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Active sessions",
      description: "Devices that are currently signed in to your account.",
    }
  );

  const sessions = ref<Session[]>([
    {
      id: 1,
      device: "MacBook Pro · Chrome",
      icon: "lucide:laptop",
      location: "Melbourne, AU",
      lastActive: "Active now",
      current: true,
    },
    {
      id: 2,
      device: "iPhone 15 · Safari",
      icon: "lucide:smartphone",
      location: "Melbourne, AU",
      lastActive: "2 hours ago",
    },
    {
      id: 3,
      device: "Windows PC · Edge",
      icon: "lucide:monitor",
      location: "Sydney, AU",
      lastActive: "3 days ago",
    },
  ]);

  function revoke(id: number) {
    sessions.value = sessions.value.filter((session) => session.id !== id);
    useSonner.success("Session revoked");
  }

  function revokeOthers() {
    sessions.value = sessions.value.filter((session) => session.current);
    useSonner.success("Signed out of all other devices");
  }
</script>
