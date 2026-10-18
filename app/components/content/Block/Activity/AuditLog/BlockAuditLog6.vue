<template>
  <!--
    Login history and sessions
    Features: A list of sign ins with device, browser, place, IP address and time, a badge on the current session, a flagged sign in with a not me action, sign out for a single session and a sign out of all other sessions with a confirmation
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Login history</h1>
          <p class="text-muted-foreground text-sm">
            Where your account has been signed in recently.
          </p>
        </div>
        <UiAlertDialog>
          <UiAlertDialogTrigger as-child>
            <UiButton variant="outline" size="sm" :disabled="!others"
              >Sign out of other sessions</UiButton
            >
          </UiAlertDialogTrigger>
          <UiAlertDialogContent>
            <UiAlertDialogHeader>
              <UiAlertDialogTitle
                >Sign out of {{ others }} other
                {{ others === 1 ? "session" : "sessions" }}?</UiAlertDialogTitle
              >
              <UiAlertDialogDescription>
                You stay signed in here. The other devices will need to sign in again.
              </UiAlertDialogDescription>
            </UiAlertDialogHeader>
            <UiAlertDialogFooter>
              <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
              <UiAlertDialogAction @click="signOutOthers">Sign out</UiAlertDialogAction>
            </UiAlertDialogFooter>
          </UiAlertDialogContent>
        </UiAlertDialog>
      </div>

      <ul class="mt-6 divide-y rounded-xl border" aria-live="polite">
        <li
          v-for="session in sessions"
          :key="session.id"
          class="flex items-center gap-4 px-4 py-4"
          :class="session.flagged ? 'bg-red-50 dark:bg-red-500/10' : ''"
        >
          <span class="bg-muted grid size-10 shrink-0 place-items-center rounded-lg"
            ><Icon :name="session.icon" class="size-5"
          /></span>
          <div class="min-w-0 flex-1">
            <p class="flex flex-wrap items-center gap-2 text-sm font-medium">
              {{ session.device }}
              <UiBadge v-if="session.current" variant="soft" color="green" shape="pill"
                >This device</UiBadge
              >
              <UiBadge v-if="session.flagged" variant="soft" color="red" shape="pill"
                >Unusual</UiBadge
              >
            </p>
            <p class="text-muted-foreground truncate text-sm">
              {{ session.place }} · {{ session.ip }}
            </p>
            <p class="text-muted-foreground text-xs">
              {{ session.current ? "Active now" : session.when }}
            </p>
          </div>
          <UiButton v-if="session.flagged" variant="destructive" size="sm" @click="notMe(session)"
            >Not me</UiButton
          >
          <UiButton
            v-else-if="!session.current"
            variant="ghost"
            size="sm"
            :aria-label="`Sign out ${session.device}`"
            @click="remove(session.id)"
            >Sign out</UiButton
          >
        </li>
        <li v-if="!sessions.length" class="text-muted-foreground px-4 py-10 text-center text-sm">
          No sessions.
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Session = {
    id: string;
    icon: string;
    device: string;
    place: string;
    ip: string;
    when: string;
    current?: boolean;
    flagged?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      sessions?: Session[];
    }>(),
    {
      sessions: () => [
        {
          id: "l1",
          icon: "lucide:laptop",
          device: "Chrome on macOS",
          place: "New York, US",
          ip: "203.0.113.24",
          when: "Now",
          current: true,
        },
        {
          id: "l2",
          icon: "lucide:smartphone",
          device: "Safari on iPhone",
          place: "New York, US",
          ip: "203.0.113.25",
          when: "Today, 8:12 AM",
        },
        {
          id: "l3",
          icon: "lucide:monitor",
          device: "Firefox on Windows",
          place: "Lagos, NG",
          ip: "192.0.2.88",
          when: "Today, 9:30 AM",
          flagged: true,
        },
        {
          id: "l4",
          icon: "lucide:tablet",
          device: "Safari on iPad",
          place: "Boston, US",
          ip: "198.51.100.40",
          when: "Oct 14, 6:45 PM",
        },
      ],
    }
  );

  const sessions = ref<Session[]>(props.sessions.map((session) => ({ ...session })));
  const others = computed(() => sessions.value.filter((session) => !session.current).length);

  function remove(id: string) {
    sessions.value = sessions.value.filter((session) => session.id !== id);
    useSonner.success("Session signed out");
  }

  function notMe(session: Session) {
    sessions.value = sessions.value.filter((item) => item.id !== session.id);
    useSonner.success("Session signed out", {
      description: "We recommend changing your password.",
    });
  }

  function signOutOthers() {
    sessions.value = sessions.value.filter((session) => session.current);
    useSonner.success("Signed out of other sessions");
  }
</script>
