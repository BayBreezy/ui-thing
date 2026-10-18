<template>
  <!--
    Audit log table
    Features: Table of events with time, actor, action, target, IP address and result, sortable by time with aria-sort, badges for failed events, a page size footer with previous and next and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Audit log</h1>
        <p class="text-muted-foreground text-sm">Every change made in your workspace.</p>
      </div>
      <UiButton variant="outline" size="sm" @click="newest = !newest"
        ><Icon name="lucide:arrow-up-down" class="size-4" />{{
          newest ? "Newest first" : "Oldest first"
        }}</UiButton
      >
    </div>

    <div class="mt-6 rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead :aria-sort="newest ? 'descending' : 'ascending'">Time</UiTableHead>
            <UiTableHead>Actor</UiTableHead>
            <UiTableHead>Action</UiTableHead>
            <UiTableHead class="hidden md:table-cell">Target</UiTableHead>
            <UiTableHead class="hidden lg:table-cell">IP address</UiTableHead>
            <UiTableHead>Result</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="event in rows" :key="event.id">
            <UiTableCell class="text-muted-foreground whitespace-nowrap">{{
              stamp(event.at)
            }}</UiTableCell>
            <UiTableCell>
              <div class="flex items-center gap-2">
                <UiAvatar
                  :src="`https://i.pravatar.cc/80?img=${event.avatar}`"
                  :fallback="event.actor.slice(0, 1)"
                  class="size-6"
                />
                <span class="whitespace-nowrap">{{ event.actor }}</span>
              </div>
            </UiTableCell>
            <UiTableCell
              ><code class="bg-muted rounded px-1.5 py-0.5 text-xs">{{
                event.action
              }}</code></UiTableCell
            >
            <UiTableCell class="hidden md:table-cell">{{ event.target }}</UiTableCell>
            <UiTableCell class="text-muted-foreground hidden font-mono text-xs lg:table-cell">{{
              event.ip
            }}</UiTableCell>
            <UiTableCell>
              <UiBadge variant="soft" shape="pill" :color="event.ok ? 'green' : 'red'">{{
                event.ok ? "Success" : "Failed"
              }}</UiBadge>
            </UiTableCell>
          </UiTableRow>
          <UiTableRow v-if="!rows.length">
            <UiTableCell colspan="6" class="text-muted-foreground py-10 text-center"
              >No events recorded.</UiTableCell
            >
          </UiTableRow>
        </UiTableBody>
      </UiTable>
      <div class="flex items-center justify-between gap-3 border-t px-4 py-3 text-sm">
        <p class="text-muted-foreground" aria-live="polite">
          {{ from }} to {{ to }} of {{ events.length }}
        </p>
        <div class="flex gap-2">
          <UiButton variant="outline" size="sm" :disabled="page === 1" @click="page--"
            >Previous</UiButton
          >
          <UiButton variant="outline" size="sm" :disabled="page >= pages" @click="page++"
            >Next</UiButton
          >
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Event = {
    id: string;
    at: string;
    actor: string;
    avatar: number;
    action: string;
    target: string;
    ip: string;
    ok: boolean;
  };

  const props = withDefaults(
    defineProps<{
      events?: Event[];
      perPage?: number;
    }>(),
    {
      perPage: 6,
      events: () => [
        {
          id: "e01",
          at: "2026-10-18T10:02",
          actor: "Maya Patel",
          avatar: 32,
          action: "project.create",
          target: "Homepage redesign",
          ip: "203.0.113.24",
          ok: true,
        },
        {
          id: "e02",
          at: "2026-10-18T09:47",
          actor: "Leo Fischer",
          avatar: 12,
          action: "apikey.create",
          target: "Production key",
          ip: "198.51.100.7",
          ok: true,
        },
        {
          id: "e03",
          at: "2026-10-18T09:30",
          actor: "Unknown",
          avatar: 33,
          action: "auth.login",
          target: "tom@example.com",
          ip: "192.0.2.88",
          ok: false,
        },
        {
          id: "e04",
          at: "2026-10-18T08:55",
          actor: "Sofia Alvarez",
          avatar: 45,
          action: "member.invite",
          target: "ines@example.com",
          ip: "203.0.113.51",
          ok: true,
        },
        {
          id: "e05",
          at: "2026-10-17T17:12",
          actor: "Noah Kim",
          avatar: 15,
          action: "settings.update",
          target: "Billing email",
          ip: "198.51.100.19",
          ok: true,
        },
        {
          id: "e06",
          at: "2026-10-17T15:40",
          actor: "Priya Nair",
          avatar: 44,
          action: "export.run",
          target: "Customers.csv",
          ip: "203.0.113.77",
          ok: true,
        },
        {
          id: "e07",
          at: "2026-10-17T11:05",
          actor: "Leo Fischer",
          avatar: 12,
          action: "project.delete",
          target: "Old prototype",
          ip: "198.51.100.7",
          ok: true,
        },
        {
          id: "e08",
          at: "2026-10-16T16:20",
          actor: "Maya Patel",
          avatar: 32,
          action: "role.update",
          target: "Tom Becker to Editor",
          ip: "203.0.113.24",
          ok: false,
        },
        {
          id: "e09",
          at: "2026-10-16T10:00",
          actor: "Tom Becker",
          avatar: 33,
          action: "auth.login",
          target: "tom@example.com",
          ip: "192.0.2.14",
          ok: true,
        },
        {
          id: "e10",
          at: "2026-10-15T14:31",
          actor: "Sofia Alvarez",
          avatar: 45,
          action: "member.remove",
          target: "old.intern@example.com",
          ip: "203.0.113.51",
          ok: true,
        },
        {
          id: "e11",
          at: "2026-10-15T09:12",
          actor: "Noah Kim",
          avatar: 15,
          action: "webhook.update",
          target: "Billing webhook",
          ip: "198.51.100.19",
          ok: true,
        },
        {
          id: "e12",
          at: "2026-10-14T13:45",
          actor: "Ines Costa",
          avatar: 47,
          action: "doc.publish",
          target: "Launch checklist",
          ip: "203.0.113.90",
          ok: true,
        },
      ],
    }
  );

  const newest = ref(true);
  const page = ref(1);

  const sorted = computed(() =>
    [...props.events].sort((a, b) =>
      newest.value ? b.at.localeCompare(a.at) : a.at.localeCompare(b.at)
    )
  );
  const pages = computed(() => Math.max(1, Math.ceil(sorted.value.length / props.perPage)));
  const rows = computed(() =>
    sorted.value.slice((page.value - 1) * props.perPage, page.value * props.perPage)
  );
  const from = computed(() => (rows.value.length ? (page.value - 1) * props.perPage + 1 : 0));
  const to = computed(() => (page.value - 1) * props.perPage + rows.value.length);

  watch(newest, () => (page.value = 1));

  const stamp = (iso: string) =>
    new Date(`${iso}:00Z`).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    });
</script>
