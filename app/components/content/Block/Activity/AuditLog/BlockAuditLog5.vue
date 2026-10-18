<template>
  <!--
    Security events
    Features: Summary tiles for open, high severity and resolved events, a banner for unreviewed critical events, severity badges, review and dismiss actions that move events to resolved and an undo for the last action
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-2xl font-bold tracking-tight">Security events</h1>

      <div class="mt-6 grid gap-3 sm:grid-cols-3">
        <div v-for="tile in tiles" :key="tile.label" class="rounded-xl border p-4">
          <p class="text-muted-foreground text-xs">{{ tile.label }}</p>
          <p class="mt-1 text-2xl font-bold tabular-nums">{{ tile.value }}</p>
        </div>
      </div>

      <UiAlert
        v-if="critical"
        class="mt-4"
        icon="lucide:shield-alert"
        :title="`${critical} high severity ${critical === 1 ? 'event needs' : 'events need'} review`"
        description="Check these first. They may mean someone else has access to an account."
      />

      <ul class="mt-4 space-y-3" aria-live="polite">
        <li v-for="event in open" :key="event.id" class="rounded-xl border p-4">
          <div class="flex items-start gap-3">
            <span
              class="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full"
              :class="tones[event.severity]"
            >
              <Icon :name="event.icon" class="size-4" />
            </span>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <p class="text-sm font-medium">{{ event.title }}</p>
                <UiBadge
                  variant="soft"
                  shape="pill"
                  :color="badge[event.severity]"
                  class="capitalize"
                  >{{ event.severity }}</UiBadge
                >
              </div>
              <p class="text-muted-foreground mt-1 text-sm">{{ event.detail }}</p>
              <p class="text-muted-foreground mt-1 text-xs">{{ event.when }}</p>
              <div class="mt-3 flex gap-2">
                <UiButton size="sm" @click="resolve(event.id, 'Reviewed')">Mark reviewed</UiButton>
                <UiButton variant="outline" size="sm" @click="resolve(event.id, 'Dismissed')"
                  >Dismiss</UiButton
                >
              </div>
            </div>
          </div>
        </li>
        <li
          v-if="!open.length"
          class="text-muted-foreground rounded-xl border border-dashed py-12 text-center text-sm"
        >
          <Icon name="lucide:shield-check" class="mx-auto mb-2 size-6" />
          Nothing needs your attention.
        </li>
      </ul>

      <div
        v-if="last"
        class="bg-muted/60 mt-4 flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-sm"
        role="status"
      >
        <span>{{ last.how }} "{{ last.title }}".</span>
        <UiButton variant="link" size="sm" class="h-auto p-0" @click="undo">Undo</UiButton>
      </div>

      <section v-if="done.length" class="mt-8">
        <h2 class="text-sm font-semibold">Resolved ({{ done.length }})</h2>
        <ul class="text-muted-foreground mt-2 divide-y rounded-xl border text-sm">
          <li v-for="event in done" :key="event.id" class="flex items-center gap-2 px-4 py-2.5">
            <Icon name="lucide:check" class="size-4 shrink-0" />
            <span class="flex-1 truncate">{{ event.title }}</span>
            <span class="text-xs">{{ event.how }}</span>
          </li>
        </ul>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Severity = "high" | "medium" | "low";
  type Event = {
    id: string;
    icon: string;
    title: string;
    detail: string;
    when: string;
    severity: Severity;
    how?: string;
  };

  const props = withDefaults(
    defineProps<{
      events?: Event[];
    }>(),
    {
      events: () => [
        {
          id: "s1",
          icon: "lucide:user-x",
          title: "7 failed sign ins for tom@example.com",
          detail: "From 192.0.2.88 in Lagos, NG within 4 minutes.",
          when: "Today, 9:30 AM",
          severity: "high",
        },
        {
          id: "s2",
          icon: "lucide:key-round",
          title: "New API key with write access",
          detail: "Production key created by Leo Fischer.",
          when: "Today, 9:47 AM",
          severity: "medium",
        },
        {
          id: "s3",
          icon: "lucide:globe",
          title: "Sign in from a new country",
          detail: "Sofia Alvarez signed in from Madrid, ES for the first time.",
          when: "Yesterday, 5:12 PM",
          severity: "medium",
        },
        {
          id: "s4",
          icon: "lucide:shield-off",
          title: "Two factor turned off",
          detail: "Noah Kim disabled two factor authentication.",
          when: "Yesterday, 11:00 AM",
          severity: "high",
        },
        {
          id: "s5",
          icon: "lucide:download",
          title: "Large export of customer data",
          detail: "48,210 rows exported by Priya Nair.",
          when: "Mon, 3:40 PM",
          severity: "low",
        },
      ],
    }
  );

  const tones: Record<Severity, string> = {
    high: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    low: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
  };
  const badge: Record<Severity, string> = { high: "red", medium: "amber", low: "blue" };

  const items = ref<Event[]>(props.events.map((event) => ({ ...event })));
  const last = ref<{ id: string; title: string; how: string } | null>(null);

  const open = computed(() => items.value.filter((event) => !event.how));
  const done = computed(() => items.value.filter((event) => event.how));
  const critical = computed(() => open.value.filter((event) => event.severity === "high").length);
  const tiles = computed(() => [
    { label: "Open", value: open.value.length },
    { label: "High severity", value: critical.value },
    { label: "Resolved", value: done.value.length },
  ]);

  function resolve(id: string, how: string) {
    const event = items.value.find((item) => item.id === id);
    if (!event) return;
    event.how = how;
    last.value = { id, title: event.title, how };
  }

  function undo() {
    const event = items.value.find((item) => item.id === last.value?.id);
    if (event) event.how = undefined;
    last.value = null;
  }
</script>
