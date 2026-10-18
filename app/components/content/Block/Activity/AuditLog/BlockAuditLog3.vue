<template>
  <!--
    Audit log with a detail drawer
    Features: A compact event table where every row opens a side drawer, the drawer shows who, when, where and what changed with before and after values, a copy event ID button and previous and next buttons to walk through events
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-2xl font-bold tracking-tight">Audit log</h1>
    <ul class="mt-6 divide-y rounded-xl border">
      <li v-for="event in events" :key="event.id">
        <button
          type="button"
          class="hover:bg-accent/50 focus-visible:bg-accent/50 flex w-full items-center gap-3 px-4 py-3 text-left outline-none"
          :aria-label="`View details for ${event.action} by ${event.actor}`"
          @click="show(event.id)"
        >
          <Icon
            :name="event.ok ? 'lucide:circle-check' : 'lucide:circle-x'"
            class="size-4 shrink-0"
            :class="event.ok ? 'text-green-500' : 'text-red-500'"
          />
          <span class="min-w-0 flex-1">
            <span class="block truncate text-sm font-medium">{{ event.action }}</span>
            <span class="text-muted-foreground block truncate text-xs"
              >{{ event.actor }} · {{ event.target }}</span
            >
          </span>
          <span class="text-muted-foreground hidden text-xs sm:block">{{ stamp(event.at) }}</span>
          <Icon name="lucide:chevron-right" class="text-muted-foreground size-4 shrink-0" />
        </button>
      </li>
    </ul>

    <UiSheet v-model:open="isOpen">
      <UiSheetContent side="right" class="w-full sm:max-w-md">
        <template v-if="current">
          <UiSheetHeader>
            <UiSheetTitle>{{ current.action }}</UiSheetTitle>
            <UiSheetDescription>{{ stamp(current.at) }} UTC</UiSheetDescription>
          </UiSheetHeader>
          <div class="space-y-6 overflow-y-auto px-4">
            <div class="flex items-center gap-3">
              <UiAvatar
                :src="`https://i.pravatar.cc/80?img=${current.avatar}`"
                :fallback="current.actor.slice(0, 1)"
                class="size-10"
              />
              <div>
                <p class="text-sm font-medium">{{ current.actor }}</p>
                <p class="text-muted-foreground text-xs">{{ current.email }}</p>
              </div>
              <UiBadge
                class="ml-auto"
                variant="soft"
                shape="pill"
                :color="current.ok ? 'green' : 'red'"
                >{{ current.ok ? "Success" : "Failed" }}</UiBadge
              >
            </div>
            <dl class="grid grid-cols-[6rem_1fr] gap-x-3 gap-y-2 text-sm">
              <dt class="text-muted-foreground">Target</dt>
              <dd>{{ current.target }}</dd>
              <dt class="text-muted-foreground">IP address</dt>
              <dd class="font-mono text-xs leading-5">{{ current.ip }}</dd>
              <dt class="text-muted-foreground">Location</dt>
              <dd>{{ current.location }}</dd>
              <dt class="text-muted-foreground">User agent</dt>
              <dd class="break-words">{{ current.agent }}</dd>
              <dt class="text-muted-foreground">Event ID</dt>
              <dd class="flex items-center gap-1">
                <code class="bg-muted rounded px-1.5 py-0.5 text-xs">{{ current.id }}</code>
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  class="size-6"
                  aria-label="Copy event ID"
                  @click="copy(current.id)"
                  ><Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-3.5"
                /></UiButton>
              </dd>
            </dl>
            <div v-if="current.changes.length">
              <h3 class="mb-2 text-sm font-semibold">Changes</h3>
              <ul class="divide-y rounded-lg border text-sm">
                <li
                  v-for="change in current.changes"
                  :key="change.field"
                  class="grid gap-1 px-3 py-2"
                >
                  <span class="text-muted-foreground text-xs">{{ change.field }}</span>
                  <span class="text-red-700 line-through dark:text-red-400">{{
                    change.before
                  }}</span>
                  <span class="text-green-700 dark:text-green-400">{{ change.after }}</span>
                </li>
              </ul>
            </div>
            <p v-else class="text-muted-foreground text-sm">
              This event did not change any fields.
            </p>
          </div>
          <UiSheetFooter class="flex-row justify-between">
            <UiButton variant="outline" size="sm" :disabled="index <= 0" @click="step(-1)"
              ><Icon name="lucide:chevron-left" class="size-4" />Newer</UiButton
            >
            <UiButton
              variant="outline"
              size="sm"
              :disabled="index >= events.length - 1"
              @click="step(1)"
              >Older<Icon name="lucide:chevron-right" class="size-4"
            /></UiButton>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Event = {
    id: string;
    at: string;
    actor: string;
    avatar: number;
    email: string;
    action: string;
    target: string;
    ip: string;
    location: string;
    agent: string;
    ok: boolean;
    changes: { field: string; before: string; after: string }[];
  };

  const props = withDefaults(
    defineProps<{
      events?: Event[];
    }>(),
    {
      events: () => [
        {
          id: "evt_8f2a",
          at: "2026-10-18T10:02",
          actor: "Maya Patel",
          avatar: 32,
          email: "maya@example.com",
          action: "settings.update",
          target: "Billing email",
          ip: "203.0.113.24",
          location: "New York, US",
          agent: "Chrome 141 on macOS",
          ok: true,
          changes: [
            {
              field: "billing_email",
              before: "billing@old.example.com",
              after: "finance@example.com",
            },
          ],
        },
        {
          id: "evt_71c9",
          at: "2026-10-18T09:47",
          actor: "Leo Fischer",
          avatar: 12,
          email: "leo@example.com",
          action: "role.update",
          target: "Tom Becker",
          ip: "198.51.100.7",
          location: "Berlin, DE",
          agent: "Firefox 133 on Linux",
          ok: true,
          changes: [
            { field: "role", before: "Viewer", after: "Editor" },
            { field: "can_export", before: "false", after: "true" },
          ],
        },
        {
          id: "evt_5b03",
          at: "2026-10-18T09:30",
          actor: "Unknown",
          avatar: 33,
          email: "not signed in",
          action: "auth.login",
          target: "tom@example.com",
          ip: "192.0.2.88",
          location: "Lagos, NG",
          agent: "curl 8.4",
          ok: false,
          changes: [],
        },
        {
          id: "evt_2d7e",
          at: "2026-10-17T17:12",
          actor: "Sofia Alvarez",
          avatar: 45,
          email: "sofia@example.com",
          action: "apikey.create",
          target: "Production key",
          ip: "203.0.113.51",
          location: "Madrid, ES",
          agent: "Safari 18 on macOS",
          ok: true,
          changes: [{ field: "scopes", before: "none", after: "read, write" }],
        },
      ],
    }
  );

  const isOpen = ref(false);
  const currentId = ref(props.events[0]?.id ?? "");
  const index = computed(() => props.events.findIndex((event) => event.id === currentId.value));
  const current = computed(() => props.events[index.value]);

  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  function show(id: string) {
    currentId.value = id;
    isOpen.value = true;
  }

  function step(direction: number) {
    const next = props.events[index.value + direction];
    if (next) currentId.value = next.id;
  }

  const stamp = (iso: string) =>
    new Date(`${iso}:00Z`).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    });
</script>
