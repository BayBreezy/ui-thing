<template>
  <!--
    Filterable audit log
    Features: Search across actor, action and target, selects for actor, action type and time range, removable chips for the active filters, a result count and a reset button with an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-2xl font-bold tracking-tight">Audit log</h1>

    <div class="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
      <div class="relative">
        <Icon
          name="lucide:search"
          class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <UiInput
          v-model="query"
          class="pl-9"
          placeholder="Search events"
          aria-label="Search events"
        />
      </div>
      <UiSelect v-model="actor">
        <UiSelectTrigger class="md:w-40" aria-label="Actor"><UiSelectValue /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="all">All actors</UiSelectItem>
          <UiSelectItem v-for="name in actors" :key="name" :value="name">{{ name }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
      <UiSelect v-model="kind">
        <UiSelectTrigger class="md:w-40" aria-label="Action type"
          ><UiSelectValue
        /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="all">All actions</UiSelectItem>
          <UiSelectItem v-for="name in kinds" :key="name" :value="name" class="capitalize">{{
            name
          }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
      <UiSelect v-model="range">
        <UiSelectTrigger class="md:w-40" aria-label="Time range"><UiSelectValue /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="1">Last 24 hours</UiSelectItem>
          <UiSelectItem value="7">Last 7 days</UiSelectItem>
          <UiSelectItem value="30">Last 30 days</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="mt-3 flex flex-wrap items-center gap-2 text-sm" aria-live="polite">
      <span class="text-muted-foreground"
        >{{ filtered.length }} {{ filtered.length === 1 ? "event" : "events" }}</span
      >
      <UiBadge v-for="chip in chips" :key="chip.label" variant="soft" shape="pill" class="gap-1">
        {{ chip.label }}
        <button type="button" :aria-label="`Remove filter ${chip.label}`" @click="chip.clear()">
          <Icon name="lucide:x" class="size-3" />
        </button>
      </UiBadge>
      <UiButton v-if="chips.length" variant="ghost" size="sm" class="h-7" @click="reset"
        >Reset</UiButton
      >
    </div>

    <ul v-if="filtered.length" class="mt-4 divide-y rounded-xl border">
      <li v-for="event in filtered" :key="event.id" class="flex items-center gap-3 px-4 py-3">
        <UiAvatar
          :src="`https://i.pravatar.cc/80?img=${event.avatar}`"
          :fallback="event.actor.slice(0, 1)"
          class="size-8"
        />
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm">
            <span class="font-medium">{{ event.actor }}</span>
            <code class="bg-muted mx-1.5 rounded px-1.5 py-0.5 text-xs">{{ event.action }}</code>
            {{ event.target }}
          </p>
          <p class="text-muted-foreground text-xs">{{ stamp(event.at) }}</p>
        </div>
      </li>
    </ul>
    <div
      v-else
      class="mt-4 rounded-xl border border-dashed px-6 py-12 text-center"
      aria-live="polite"
    >
      <Icon name="lucide:search-x" class="text-muted-foreground mx-auto size-6" />
      <p class="mt-2 text-sm font-medium">No events match your filters</p>
      <UiButton variant="link" size="sm" @click="reset">Reset filters</UiButton>
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
  };

  const props = withDefaults(
    defineProps<{
      /** The current moment as `YYYY-MM-DDTHH:mm`. */
      now?: string;
      events?: Event[];
    }>(),
    {
      now: "2026-10-18T10:20",
      events: () => [
        {
          id: "f1",
          at: "2026-10-18T10:02",
          actor: "Maya Patel",
          avatar: 32,
          action: "project.create",
          target: "Homepage redesign",
        },
        {
          id: "f2",
          at: "2026-10-18T09:47",
          actor: "Leo Fischer",
          avatar: 12,
          action: "apikey.create",
          target: "Production key",
        },
        {
          id: "f3",
          at: "2026-10-18T08:55",
          actor: "Sofia Alvarez",
          avatar: 45,
          action: "member.invite",
          target: "ines@example.com",
        },
        {
          id: "f4",
          at: "2026-10-17T17:12",
          actor: "Noah Kim",
          avatar: 15,
          action: "settings.update",
          target: "Billing email",
        },
        {
          id: "f5",
          at: "2026-10-17T11:05",
          actor: "Leo Fischer",
          avatar: 12,
          action: "project.delete",
          target: "Old prototype",
        },
        {
          id: "f6",
          at: "2026-10-14T13:45",
          actor: "Maya Patel",
          avatar: 32,
          action: "doc.publish",
          target: "Launch checklist",
        },
        {
          id: "f7",
          at: "2026-10-09T09:00",
          actor: "Priya Nair",
          avatar: 44,
          action: "member.remove",
          target: "old.intern@example.com",
        },
        {
          id: "f8",
          at: "2026-09-30T15:30",
          actor: "Noah Kim",
          avatar: 15,
          action: "apikey.revoke",
          target: "Staging key",
        },
      ],
    }
  );

  const query = ref("");
  const actor = ref("all");
  const kind = ref("all");
  const range = ref("7");

  const actors = computed(() => [...new Set(props.events.map((event) => event.actor))].sort());
  const kinds = computed(() =>
    [...new Set(props.events.map((event) => event.action.split(".")[0]!))].sort()
  );

  const filtered = computed(() => {
    const cutoff = new Date(`${props.now}:00Z`).getTime() - Number(range.value) * 86_400_000;
    const text = query.value.trim().toLowerCase();
    return props.events
      .filter((event) => new Date(`${event.at}:00Z`).getTime() >= cutoff)
      .filter((event) => actor.value === "all" || event.actor === actor.value)
      .filter((event) => kind.value === "all" || event.action.startsWith(`${kind.value}.`))
      .filter(
        (event) =>
          !text || `${event.actor} ${event.action} ${event.target}`.toLowerCase().includes(text)
      )
      .sort((a, b) => b.at.localeCompare(a.at));
  });

  const chips = computed(() => {
    const list: { label: string; clear: () => void }[] = [];
    if (query.value.trim())
      list.push({ label: `"${query.value.trim()}"`, clear: () => (query.value = "") });
    if (actor.value !== "all")
      list.push({ label: actor.value, clear: () => (actor.value = "all") });
    if (kind.value !== "all") list.push({ label: kind.value, clear: () => (kind.value = "all") });
    return list;
  });

  function reset() {
    query.value = "";
    actor.value = "all";
    kind.value = "all";
    range.value = "7";
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
